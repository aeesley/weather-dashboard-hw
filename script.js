function searchWeather(name) {
    
    var APIKey = "e79e860f1526eb9cc2572046fff7a30c"; // currently Alex's API key
    var userInput = $("#city-input").val();
    // building URL we need to access API
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ userInput+"&appid=" + APIKey;

    $.ajax({ // Ajax function to access query
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        var cityName = $("<div>").text(response.name); // creating the variable for city name
        var tempK = response.main.temp;
        var tempC = (tempK - 273.15)*1.80+32;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;



        $("#city-name").empty(); // emptying div
        $("#city-name").append(cityName); // appending the under inputted city name, and the corresponding main weather data value
        $("#temp").append("Temperature: " + tempC.toFixed(2) + " °F");
        $("#humidity").append("Humidity: " + humidity + " %");
        $("#wind-speed").append("Wind Speed: " + windSpeed + " MPH");

    });

    var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q="+userInput+"&appid=" + APIKey;

    $.ajax({
        url: queryURLForecast,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    })
}

$("#select-city").on("click", function(event) { // creating the on click event to take in the user input city value
    event.preventDefault();
    var inputCity = $("#city-input").val().trim();

    searchWeather(inputCity);
});