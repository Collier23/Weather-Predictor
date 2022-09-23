// Todays date
let currentDay = moment().format("L");
// Day of the week
let weekDay = moment().format("dddd");

// populate city search history
var cities = JSON.parse(localStorage.getItem("cities")) || [];
var cityList = $("#city-list");
var value = localStorage.getItem("cities");
var pvalue = JSON.parse(value);


if(value == null) {
    $(".forecastHeader").hide(); 
    // hides 5 day forecast HTML
}

if(pvalue != null) {
    for(var i=0; i <pvalue.length;i++) {
        cityList.prepend('<p class="city-values'> + pvalue[i] + '</p>');

        $(".city-values").hover(function() {
            $(this).css("background-color", "lightgray");
        }, function() {
            $(this).css("background-color", "white");
        });
    }
}

if (pvalue != null) {
    //function to display weather of last searched city
    buildCard(pvalue[pvalue.length - 1]);
}

// click on previously searched cities to display weather
document.addEventListener("click", function(event) {

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
        success: function(response) {
            let lat = response["coord"]["lat"];
            let lon = response["coord"]["lon"];
            var uvIndexURL =  "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=1f612d8ce7686dee99196825b894d777&lat=" + lat + "&lon=" + lon + "&cnt=4";
        }