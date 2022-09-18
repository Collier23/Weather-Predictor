// use openweathermap.org API to get weather data for a city for the next 5 days
// and display it in a table

// API key for openweathermap.org
const API_KEY = "YOUR_API_KEY";

// get the city name from the input field
const city = document.getElementById("city").value;

// need on click event to get city name from input field and the city-buttons
// and then call the getWeather function
// Then display the weather data in a table

// get the weather data from openweathermap.org
function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        });
    }

// display the weather data in a table
function displayWeather(data) {
    // get the table body
    const tbody = document.getElementById("weather-table-body");
    // clear the table body
    tbody.innerHTML = "";
    // loop over the weather data
    for (let i = 0; i < data.list.length; i++) {
        // get the date and time from the data
        const dateTime = data.list[i].dt_txt;
        // get the date and time components
        const date = dateTime.split(" ")[0];
        const time = dateTime.split(" ")[1];
        // get the temperature from the data
        const temp = data.list[i].main.temp;
        // get the weather description from the data
        const description = data.list[i].weather[0].description;
        // create a new row in the table
        const row = tbody.insertRow();
        // create the date cell
        const dateCell = row.insertCell();
        dateCell.innerHTML = date;
        // create the time cell
        const timeCell = row.insertCell();
        timeCell.innerHTML = time;
        // create the temperature cell
        const tempCell = row.insertCell();
        tempCell.innerHTML = temp;
        // create the description cell
        const descriptionCell = row.insertCell();
        descriptionCell.innerHTML = description;
    }
}
    

