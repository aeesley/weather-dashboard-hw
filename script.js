console.log(moment)

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
        console.log(response);
        //Emptying all divs so when I do another search without refreshing data doesn't compound
        $("#city-name").empty();
        $("#uv-index-results").empty();
        $(".forecast").empty();
        // $(".forecast-date").empty();
        // $(".forecast-icon").empty();
        // $(".forecast-temp").empty();
        // $(".forecast-hum").empty();

        // VARIABLES TO CALL & POPULATE CURRENT WEATHER
        var cityName = $("<div>").text(response.name); // creating the variable for city name
        var weatherIcon = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
        iconEl = $("<img>").attr("src", iconURL);
        var tempK = response.main.temp;
        var tempC = (tempK - 273.15)*1.80+32;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;



        // ADDING CURRENT WEATHER DATA TO WEATHER DASHBOARD HTML
        $("#city-name").empty(); // emptying div
        $("#city-name").append(cityName); // appending the under inputted city name, and the corresponding main weather data value
        $(cityName).addClass("city-name-style");
        $(cityName).append(iconEl);
        $("#city-name").append("<p>" + "Temperature: " + tempC.toFixed(2) + " °F");
        $("#city-name").append("<p>" + "Humidity: " + humidity + " %");
        $("#city-name").append("<p>" + "Wind Speed: " + windSpeed + " MPH");

        // UV INDEX PULL PART
        // Referenced this project to troubleshoot UV index pulling issues: https://github.com/cmelby/WeatherDashboard

        lat = response.coord.lat;
        lon = response.coord.lon;
        console.log(lat);

        var queryURLUVIndex = "https://api.openweathermap.org/data/2.5/uvi?&appid=e79e860f1526eb9cc2572046fff7a30c&lat=" + lat  + "&lon=" + lon;


            $.ajax({
                url:queryURLUVIndex,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                var uvresults = response.value;
                console.log(uvresults);

                $("#uv-index-results").append("<p>" + "UV Index: " + uvresults);

                // TRYING TO SWITCH BACKGROUND COLOR BASED ON UV VALUE
                function uvBackground(uvColor) {
    
                    switch (
                        uvColor
                    ) {
                        case (1 < uvresults < 2):
                            $("#uv-index-results").css("background-color", "green");
                        case (3 < uvresults < 5):
                            $("#uv-index-results").attr("background-color", "yellow");
                        case (6 < uvresults < 7):
                            $("#uv-index-results").css("background-color", "orange");
                        case (8 < uvresults < 10):
                            $("#uv-index-results").css("background-color", "red");
                        case (10 < uvresults):
                            $("#uv-index-results").css("background-color", "purple");
                    }
                }
                uvBackground ();
            });




    });
    // START OF THE SECOND QUERY URL USED FOR THE 5 DAY FORECAST
    var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q="+userInput+"&appid=" + APIKey;

    $.ajax({
        url: queryURLForecast,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        // FIRST VARIABLES AND DATA APPENDING FOR 1/5 DAY FORECAST
        var rawDate = JSON.stringify(response.list[1].dt_txt);
        var splitForecastDate = rawDate.split(" ");
        var forecastDate = moment(splitForecastDate[0]).format("MM/DD/YYYY");

        var forecastWeatherIcon = response.list[1].weather[0].icon;
        console.log(forecastWeatherIcon);
        var forecastIconURL = "http://openweathermap.org/img/w/" + forecastWeatherIcon + ".png";
        console.log(forecastIconURL);
        forecastIconEl = $("<img>").attr("src", forecastIconURL);

        var forecastTempK = response.list[1].main.temp;
        var forecastTempC = (forecastTempK - 273.15)*1.80+32;
        var forecastHum = response.list[1].main.humidity;

        $("#forecast-day-1").append(forecastDate);
        $("#forecast-day-1").append(forecastIconEl);
        $("#forecast-day-1").append("<p>" + "Temp: " + forecastTempC.toFixed(2) + " °F");
        $("#forecast-day-1").append("<p>" + "Humidity: " + forecastHum + "%");

        // VARIABLES AND APPENDS FOR 2/5 DAY FORECAST
        var rawDate = JSON.stringify(response.list[2].dt_txt);
        var splitForecastDate = rawDate.split(" ");
        var forecastDate = moment(splitForecastDate[0]).format("MM/DD/YYYY");

        var forecastWeatherIcon = response.list[2].weather[0].icon;
        var forecastIconURL = "http://openweathermap.org/img/w/" + forecastWeatherIcon + ".png";
        forecastIconEl = $("<img>").attr("src", forecastIconURL);

        var forecastTempK = response.list[2].main.temp;
        var forecastTempC = (forecastTempK - 273.15)*1.80+32;
        var forecastHum = response.list[2].main.humidity;

        $("#forecast-day-2").append(forecastDate);
        $("#forecast-day-2").append(forecastIconEl);
        $("#forecast-day-2").append("<p>" + "Temp: " + forecastTempC.toFixed(2) + " °F");
        $("#forecast-day-2").append("<p>" + "Humidity: " + forecastHum + "%");

        // VARIABLES AND APPENDS FOR 3/5 DAY FORECAST
        var rawDate = JSON.stringify(response.list[3].dt_txt);
        var splitForecastDate = rawDate.split(" ");
        var forecastDate = moment(splitForecastDate[0]).format("MM/DD/YYYY");

        var forecastWeatherIcon = response.list[3].weather[0].icon;
        var forecastIconURL = "http://openweathermap.org/img/w/" + forecastWeatherIcon + ".png";
        forecastIconEl = $("<img>").attr("src", forecastIconURL);

        var forecastTempK = response.list[3].main.temp;
        var forecastTempC = (forecastTempK - 273.15)*1.80+32;
        var forecastHum = response.list[3].main.humidity;

        $("#forecast-day-3").append(forecastDate);
        $("#forecast-day-3").append(forecastIconEl);
        $("#forecast-day-3").append("<p>" + "Temp: " + forecastTempC.toFixed(2) + " °F");
        $("#forecast-day-3").append("<p>" + "Humidity: " + forecastHum + "%");

        // VARIABLES AND APPENDS FOR 4/5 DAY FORECAST
        var rawDate = JSON.stringify(response.list[4].dt_txt);
        var splitForecastDate = rawDate.split(" ");
        var forecastDate = moment(splitForecastDate[0]).format("MM/DD/YYYY");

        var forecastWeatherIcon = response.list[4].weather[0].icon;
        var forecastIconURL = "http://openweathermap.org/img/w/" + forecastWeatherIcon + ".png";
        forecastIconEl = $("<img>").attr("src", forecastIconURL);

        var forecastTempK = response.list[4].main.temp;
        var forecastTempC = (forecastTempK - 273.15)*1.80+32;
        var forecastHum = response.list[4].main.humidity;

        $("#forecast-day-4").append(forecastDate);
        $("#forecast-day-4").append(forecastIconEl);
        $("#forecast-day-4").append("<p>" + "Temp: " + forecastTempC.toFixed(2) + " °F");
        $("#forecast-day-4").append("<p>" + "Humidity: " + forecastHum + "%");

        // VARIABLES AND APPENDS FOR 5/5 DAY FORECAST
        var rawDate = JSON.stringify(response.list[5].dt_txt);
        var splitForecastDate = rawDate.split(" ");
        var forecastDate = moment(splitForecastDate[0]).format("MM/DD/YYYY");

        var forecastWeatherIcon = response.list[5].weather[0].icon;
        var forecastIconURL = "http://openweathermap.org/img/w/" + forecastWeatherIcon + ".png";
        forecastIconEl = $("<img>").attr("src", forecastIconURL);

        var forecastTempK = response.list[5].main.temp;
        var forecastTempC = (forecastTempK - 273.15)*1.80+32;
        var forecastHum = response.list[5].main.humidity;

        $("#forecast-day-5").append(forecastDate);
        $("#forecast-day-5").append(forecastIconEl);
        $("#forecast-day-5").append("<p>" + "Temp: " + forecastTempC.toFixed(2) + " °F");
        $("#forecast-day-5").append("<p>" + "Humidity: " + forecastHum + "%");

    })

    localStorage.setItem("userAnswer", userInput);
    var storedUserAnswer = localStorage.getItem("userAnswer");
    $("#past-searches").append("<p>" + storedUserAnswer);


}
// ON CLICK FUNCTION THAT MAKES THE CURRENT WEATHER POPULATE
$("#select-city").on("click", function(event) { // creating the on click event to take in the user input city value
    event.preventDefault();

    var inputCity = $("#city-input").val().trim();

    searchWeather(inputCity);
});