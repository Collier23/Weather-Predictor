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

