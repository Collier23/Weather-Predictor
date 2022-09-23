// input storage from the user
// pull the id from input group
let city = $("#searchTerm").val()

// const variable to store api key
const apiKey = "&appid=419a6f585c25a4bb328b301f9ff349f4";
// date variable using Date to turn date/time into a string.
let date = new Date();

$("#searchTerm").keypress(function(event) {
    // key code 13 is enter
    if (event.keycode === 13) {
        event.preventDefault();
        $('#searchTerm').click();
    }
});

$("#searchTerm").on("click", function() {
    //use css to show the forcast header
    $('#forcastH5').addClass('');

    // get value from the input tag store in city
    city = $("#searchTerm").val();

    //clear the input box
    $("#searchTerm").val("");

    //api url with city input and api key
    
    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    //ajax call
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {

        console.log(response)
        console.log(response.name)
        console.log(response.main.humidity)
        console.log(response.wind.speed)
        console.log(response.weather[0].icon)

        getCurrentConditions(response);
        getCurrentForecast(response);

        // need a list
        generateList();
    })
});

function generateList() {
    let listItems = $("<li>").addClass("list-group-item").text(city);
    //append items to the list
    $(".list").append(listItems);
}
