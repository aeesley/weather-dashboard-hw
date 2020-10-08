function searchWeather(name) {

    // VARIABLES TO USE FOR BOTH QUERY URLS
    var APIKey = "e79e860f1526eb9cc2572046fff7a30c"; // currently Alex's API key
    var userInput = $("#city-input").val();
    // START OF THE FIRST QUERY URL USED FOR CURRENT WEATHER
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ userInput+"&appid=" + APIKey;

    $.ajax({ // Ajax function to access query
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);

        // VARIABLES TO CALL & POPULATE CURRENT WEATHER
        var cityName = $("<div>").text(response.name); // creating the variable for city name
        var tempK = response.main.temp;
        var tempC = (tempK - 273.15)*1.80+32;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;

        // ADDING CURRENT WEATHER DATA TO WEATHER DASHBOARD HTML
        $("#city-name").empty(); // emptying div
        $("#city-name").append(cityName); // appending the under inputted city name, and the corresponding main weather data value
        $("#temp").append("Temperature: " + tempC.toFixed(2) + " °F");
        $("#humidity").append("Humidity: " + humidity + " %");
        $("#wind-speed").append("Wind Speed: " + windSpeed + " MPH");

    });
    // START OF THE SECOND QUERY URL USED FOR THE 5 DAY FORECAST
    var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q="+userInput+"&appid=" + APIKey;

    $.ajax({
        url: queryURLForecast,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        // FIRST VARIABLES AND DATA APPENDING FOR 1/5 DAY FORECAST
        var forecastDate = JSON.stringify(response.list[0].dt_txt);
        // var forecastIcon = JSON.stringify(response.list[0].dt_txt);
        var forecastTempK = response.list[0].main.temp;
        var forecastTempC = (forecastTempK - 273.15)*1.80+32;
        // var forecastTemp = response.list[0].main.temp;
        var forecastHum = response.list[0].main.humidity;

        $("#forecast1").append(forecastDate);
        $("#forecasttemp1").append("Temp: " + forecastTempC.toFixed(2) + " °F");
        $("#forecasthum1").append("Humidity: " + forecastHum + "%");

        // VARIABLES AND APPENDS FOR 2/5 DAY FORECAST
        var forecastDate = JSON.stringify(response.list[1].dt_txt);
        // var forecastIcon = JSON.stringify(response.list[0].dt_txt);
        var forecastTempK = response.list[1].main.temp;
        var forecastTempC = (forecastTempK - 273.15)*1.80+32;
        var forecastHum = response.list[1].main.humidity;

        $("#forecast2").append(forecastDate);
        $("#forecasttemp2").append("Temp: " + forecastTempC.toFixed(2) + " °F");
        $("#forecasthum2").append("Humidity: " + forecastHum + "%");

        // VARIABLES AND APPENDS FOR 3/5 DAY FORECAST
        var forecastDate = JSON.stringify(response.list[2].dt_txt);
        // var forecastIcon = JSON.stringify(response.list[0].dt_txt);
        var forecastTempK = response.list[2].main.temp;
        var forecastTempC = (forecastTempK - 273.15)*1.80+32;
        var forecastHum = response.list[2].main.humidity;

        $("#forecast3").append(forecastDate);
        $("#forecasttemp3").append("Temp: " + forecastTempC.toFixed(2) + " °F");
        $("#forecasthum3").append("Humidity: " + forecastHum + "%");

        // VARIABLES AND APPENDS FOR 4/5 DAY FORECAST
        var forecastDate = JSON.stringify(response.list[3].dt_txt);
        // var forecastIcon = JSON.stringify(response.list[0].dt_txt);
        var forecastTempK = response.list[3].main.temp;
        var forecastTempC = (forecastTempK - 273.15)*1.80+32;
        var forecastHum = response.list[3].main.humidity;

        $("#forecast4").append(forecastDate);
        $("#forecasttemp4").append("Temp: " + forecastTempC.toFixed(2) + " °F");
        $("#forecasthum4").append("Humidity: " + forecastHum + "%");

        // VARIABLES AND APPENDS FOR 5/5 DAY FORECAST
        var forecastDate = JSON.stringify(response.list[4].dt_txt);
        // var forecastIcon = JSON.stringify(response.list[0].dt_txt);
        var forecastTempK = response.list[4].main.temp;
        var forecastTempC = (forecastTempK - 273.15)*1.80+32;
        var forecastHum = response.list[4].main.humidity;

        $("#forecast5").append(forecastDate);
        $("#forecasttemp5").append("Temp: " + forecastTempC.toFixed(2) + " °F");
        $("#forecasthum5").append("Humidity: " + forecastHum + "%");

    })

}
// ON CLICK FUNCTION THAT MAKES THE CURRENT WEATHER POPULATE
$("#select-city").on("click", function(event) { // creating the on click event to take in the user input city value
    event.preventDefault();
    var inputCity = $("#city-input").val().trim();

    searchWeather(inputCity);
});