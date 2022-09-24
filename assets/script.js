// Todays date
let currentDay = moment().format("L");
// Day of the week
let weekDay = moment().format("dddd");

// populate city search history
var cities = JSON.parse(localStorage.getItem("cities")) || [];
var cityList = $("#city-list");
var value = localStorage.getItem("cities");
var pvalue = JSON.parse(value);


if (value == null) {
    $(".forecastHeader").hide();
    // hides 5 day forecast HTML
}

if (pvalue != null) {
    for (var i = 0; i < pvalue.length; i++) {
        cityList.prepend('<p class="city-values' > + pvalue[i] + '</p>');

        $(".city-values").hover(function () {
            $(this).css("background-color", "lightgray");
        }, function () {
            $(this).css("background-color", "white");
        });
    }
}

if (pvalue != null) {
    //function to display weather of last searched city
    buildCard(pvalue[pvalue.length - 1]);
}

// click on previously searched cities to display weather
document.addEventListener("click", function (event) {

    if (event.target.matches(".city-values")) {
        deleteCity();
        buildCard(event.target.innerHTML);
    }
}, false);

// Function to create main card and forecast cards
function buildCard(city) {
    $(".forecastHeader").show();
    // shows 5 day forecast HTML
    var card1 = $("<div/>");
    card1.addClass("card");
    var cardbody1 = $("<div/>");
    cardbody1.addClass("card-body");
    var cardtitle1 = $("<h5/>").text(city.charAt(0).toUpperCase() + city.slice(1) + " " + "(" + weekDay + " " + currentDay + ")");
    cardtitle1.addClass("card-title");
    var conditionList = $("<ul/>");
    conditionList.addClass("list-group list-group-flush");

    $("mainWeather").append(card1);
    card1.append(cardbody1, conditionList);
    cardbody1.append(cardtitle1);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=9f8b1b5b1b1b1b1b1b1b1b1b1b1b1b1b&units=imperial";

    // UV index
    $.ajax({
        url: queryURL,
        method: "GET",
        success: function (response) {
            let lat = response["coord"]["lat"];
            let lon = response["coord"]["lon"];
            var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=1f612d8ce7686dee99196825b894d777&lat=" + lat + "&lon=" + lon + "&cnt=4";

            $.ajax({
                url: uvIndexURL,
                method: "GET",
            }).then(function (result) {
                console.log(result);


                // Populate weather icon, temperature, humidity, wind speed, and UV index
                $ajax({
                    url: "https://api.openweathermap.org/data/2.5/forecast",
                    method: "GET",
                    data: {
                        q: city,
                        appid: "5034b94cc960888f1f3bec4170780656",
                        units: "imperial",
                        cnt: "5"
                    },
                    success: function (data) {
                        $.each(data.list, function (index, val) {
                            m = moment().add(index, "days").format("L");
                            w = moment().add(index, "days").format("dddd");
                            var colDiv = $("<div/>");
                            colDiv.addClass("col-md-2");
                            var cardDiv = $("<div/>");
                            cardDiv.addClass("card text-white bg-info mb-3");
                            $(cardDiv).css("width", "10rem");
                            var headerDiv = $("<div/>").text(w + " " + m);
                            headerDiv.addClass("card-header");
                            $(headerDiv).css("font-weight", "bold");
                            var cardBody = $("<div/>");
                            cardBody.addClass("card-body");
                            var img = $("<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>")
                            var tempForecast = $("<p/>").text("Temp: " + val.main.temp + " °F");
                            var humidityForecast = $("<p/>").text("Humidity: " + val.main.humidity + "%");

                            $("#forecast").append(colDiv);
                            colDiv.append(cardDiv);
                            cardDiv.append(headerDiv);
                            cardDiv.append(cardBody);
                            cardBody.append(img, tempForecast, humidityForecast);
                        })
                    }
                })
            })
        }
    });



            // Function to delete previous city 
            function deleteCity() {
                $(".mainWeather > .card").remove();
                $(".forecast5").children("div").remove();
            }

            // Click event to search for city, generate weather cards, and save city to local storage
            $("#search").click(function (e) {
                e.preventDefault();

                var city = $("#city-search").val();
                var cityBox;
                var cityNodes = cityList.children("p");
                cityNodes.each(function () {
                    if (city != $(this).text()) {
                        cityBox = $("<p/>").text(city);
                    } else {
                        console.log("False");
                    }
                })

                cityList.prepend(cityBox);
                cities.push(city);
                localStorage.setItem("cities", JSON.stringify(cities));

                deleteCity();

                buildCard(city);

            });

    