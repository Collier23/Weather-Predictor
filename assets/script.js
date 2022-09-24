// Today's Date
let currentDay = moment().format("L"); 
// Day of the week
let weekday = moment().format('dddd'); 

//populate cities previously searched for
var cities = JSON.parse(localStorage.getItem("city")) || [];
var cityList = $("#city-list");
var value = localStorage.getItem("city");
var pvalue = JSON.parse(value);

// Hides 5 day forecast until city is searched
if(value == null) {
    $(".forecastHeader").hide(); 
}

if(pvalue != null) {
    for(var i=0; i <pvalue.length;i++) {
        // Adds cities from local storage to list
        cityList.prepend('<p class="city-values">' + pvalue[i] +'<p/>'); 
    
        $(".city-values").hover(function(){
            $(this).css("background-color", "#1bd7de");
            }, function(){
            $(this).css("background-color", "white");
          });

    };
};

// Calls buildCard function when search button is clicked
if (pvalue != null) {
    buildCard(pvalue[pvalue.length - 1]); 
};

// Click on previously searched cities to display their weather
document.addEventListener('click', function (event) {

    if (event.target.matches(".city-values")) {
        deleteCity();
        buildCard(event.target.textContent);
    }
}, false);

// Function to create main weather card and 5 day forecast card
function buildCard(city) {
    // Displays "5 Day Forecast" html
    $(".forecastHeader").show(); 
    var card1 = $("<div/>");
    card1.addClass("card");
    var cardbody1 = $("<div/>");
    cardbody1.addClass("card-body");
    var cardtitle1 = $("<h5/>").text(city.charAt(0).toUpperCase() + city.slice(1) + " " + "(" + weekday + " " + currentDay + ")");
    cardtitle1.addClass("card-title");
    var conditionList = $("<ul/>");
    conditionList.addClass("list-group list-group-flush");

    $(".mainWeather").prepend(card1);
    card1.append(cardbody1, conditionList);
    cardbody1.append(cardtitle1); 

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=775f213dfab0fee9670d3eb1a19750f0&units=imperial";

// Get UV index
$.ajax ( {
    url: queryURL,
    method: "GET",
    success: function(response) {
        let lat = response["coord"]["lat"];
        let lon = response["coord"]["lon"];
        var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=1f612d8ce7686dee99196825b894d777&lat=" + lat + "&lon=" + lon + "&cnt=4";

        $.ajax ( {
            url: uvIndexURL,
            method: "GET",
        }).then(function(result) {
            console.log(result);
        
// Populate weather icon, temp, humidity, wind speed and UV index  
    var mainImg = $("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
    mainImg.appendTo(cardtitle1); 
    var stats = ["Temperature: " + response["main"]["temp"] + "°F", "Humidity: " + response["main"]["humidity"] + "%", "Windspeed: " + response["wind"]["speed"] + " MPH", "UV Index: " + result["0"]["value"]];
    $.each(stats, function(i) {
        var li = $("<li/>")
            .addClass("list-group-item")
            .appendTo(conditionList);
        var aaa = $('<a/>')
            .text(stats[i])
            .appendTo(li);
    })
    })
    }
})
// Create 5 day weather forecast
$.ajax( {
    url: "https://api.openweathermap.org/data/2.5/forecast",
    method: "GET",
    data: {
        q: city,
        appid: "5034b94cc960888f1f3bec4170780656",
        units: "imperial",
        cnt: "5"
      },
      success: function(data) {
        $.each(data.list, function(index, val) {
            m = moment().add(1 + index, "days").format("L"); 
            w = moment().add(1 + index, "days").format('dddd');
            var colDiv = $("<div/>");
            colDiv.addClass("col-sm-2");
            var cardDiv = $("<div/>");
            cardDiv.addClass("card text-white bg-info mb-3");
            $(cardDiv).css("width", "10rem");
            var headerDiv = $("<div/>").text(w + " " + m);
            headerDiv.addClass("card-header");
            $(headerDiv).css("font-weight", "bold");
            var cardBody = $("<div/>");
            cardBody.addClass("card-body");
            var img = $("<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>")
            var tempForecast = $("<p>").text("Temp: " + val.main.temp + "°F");
            var humidityForecast = $("<p>").text("Humidity: " + val.main.humidity + "%");
            
            $(".forecast5").append(colDiv);
            colDiv.append(cardDiv);
            cardDiv.append(headerDiv);
            cardDiv.append(cardBody);
            cardBody.append(img, tempForecast, humidityForecast);
            
        })
      }
})  
};

// Deletes previous code from buildCard function
function deleteCity() {
    $(".mainWeather > .card").remove();
    $(".forecast5").children("div").remove();
}

// Click event when user searches for a city. Generates current weather and 5-day forecast.
$("#search").click(function(e) {
    e.preventDefault();

    // User input city
    var city = $("#city-search").val(); 
    var cityBox;
    var cityNodes = cityList.children("p");
    cityNodes.each(function() {
        if(city != $(this).text()) {
             cityBox = $("<p>").text(city);
        } else {
            console.log("False");
        }
    })
    cityList.prepend(cityBox);
    cities.push(city);
    localStorage.setItem("city", JSON.stringify(cities));

deleteCity();

buildCard(city);

});

// Dynamically create 5 city buttons
function createCityButtons() {
    var cityButtons = $("<button/>");
    cityButtons.addClass("btn btn-outline-secondary city-values");
    cityButtons.text(city);
    $(".cityList").append(cityButtons);
}

// Click event for previously searched cities
$(".cityList").on("click", ".city-values", function() {
    deleteCity();
    buildCard($(this).text());
})


