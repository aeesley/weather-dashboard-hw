console.log(moment)

var APIKey = "e79e860f1526eb9cc2572046fff7a30c"; 

function uvBackground(uvNum) {
    console.log('We ar in the background uv function!!!')
    $("#uv-index-results").text(uvNum)
    
    switch (
        true
    ) {
        case (1 < uvNum && uvNum < 2):
            $("#uv-index-results").css("background-color", "green");
            break;
        case (3 < uvNum && uvNum < 5):
            $("#uv-index-results").css("background-color", "yellow");
            break;
        case (6 < uvNum && uvNum < 7):
            $("#uv-index-results").css("background-color", "orange");
            break;
        case (8 < uvNum && uvNum < 10):
            $("#uv-index-results").css("background-color", "red");
            break;
        case (10 < uvNum):
            $("#uv-index-results").css("background-color", "purple");
            break;
    }
}

function smackUvIndex(lat, lon){
    var queryURLUVIndex = "https://api.openweathermap.org/data/2.5/uvi?&appid=e79e860f1526eb9cc2572046fff7a30c&lat=" + lat  + "&lon=" + lon;

    $.ajax({
        url:queryURLUVIndex,
        method: "GET"
    }).then(function (response) {
        console.log('UV responseeee', response);
        // TRYING TO SWITCH BACKGROUND COLOR BASED ON UV VALUE
        uvBackground(response.value)
    });
}

function get5day(userInput){
    var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q="+userInput+"&appid=" + APIKey;

    $.ajax({
        url: queryURLForecast,
        method: "GET"
    }).then(function(response) {
        console.log('responsde from 5 day!!!!!!',response);

        for(var i =0; i< response.list.length; i++) {
            // 1 make a piece of html w jquery
            var dayContainer = $('<div>')
            var rawDate = response.list[i].dt_txt;
            var splitForecastDate = rawDate.split(" ");
            console.log('this is our split dat!!!', splitForecastDate)

            if(splitForecastDate[1] === '09:00:00') {
                var forecastDate = moment(splitForecastDate[0]).format("MM/DD/YYYY");
                //2 dress it up how u want
                dayContainer.addClass('col-2 forecast')
                var forecastWeatherIcon = response.list[i].weather[0].icon;
                console.log(forecastWeatherIcon);
                var forecastIconURL = "http://openweathermap.org/img/w/" + forecastWeatherIcon + ".png";
                console.log(forecastIconURL);
                forecastIconEl = $("<img>").attr("src", forecastIconURL);
    
                var forecastTempK = response.list[i].main.temp;
                var forecastTempC = (forecastTempK - 273.15)*1.80+32;
                var forecastHum = response.list[i].main.humidity;
                var day = i + 1
    
                //3 append that sucker to the page!!
                $("#forecast-day-" + day).append(forecastDate);
                $("#forecast-day-" + day).append(forecastIconEl);
                $("#forecast-day-" + day).append("<p>" + "Temp: " + forecastTempC.toFixed(2) + " °F");
                $("#forecast-day-" + day).append("<p>" + "Humidity: " + forecastHum + "%")
    
                dayContainer.append(
                    forecastDate,
                    forecastIconEl,
                    "<p>" + "Temp: " + forecastTempC.toFixed(2) + " °F", 
                    "<p>" + "Humidity: " + forecastHum + "%"
                )
                $('.day-rows').append(dayContainer)
            } 
        }
    })

}


function searchWeather(name) {
    // VARIABLES TO USE FOR BOTH QUERY URLS
    // currently Alex's API key
    var userInput = name
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
        $(".day-rows").empty();

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

        smackUvIndex(lat, lon)
        get5day(userInput)

    });
    // START OF THE SECOND QUERY URL USED FOR THE 5 DAY FORECAST
 
    // Saving and appending past searches under the user input area
    localStorage.setItem("userAnswer", userInput);
    var storedUserAnswer = localStorage.getItem("userAnswer");
    $("#past-searches").append("<p class='history'>" + storedUserAnswer + "</p>");


}
// ON CLICK FUNCTION THAT MAKES THE CURRENT WEATHER POPULATE
$("#select-city").on("click", function(event) { // creating the on click event to take in the user input city value
    event.preventDefault();

    var inputCity = $("#city-input").val().trim();

    searchWeather(inputCity);
});

$(document).on('click', '.history', function() {
    var inputCity = $(this).text().trim();

    console.log('history on lcicke!!!', inputCity)

    searchWeather(inputCity);
})