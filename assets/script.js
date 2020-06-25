$(document).ready(function () {
    var cities = JSON.parse(localStorage.getItem("city"))
    if (cities) {
        for (var i = 0; i < cities.length; i++) {
            console.log(cities[i])
            var newCity = $('<button type="city" class="btnCity" value="city"/>');
            newCity.text(cities[i]);
            $(".btn-group").append(newCity);

        }
    }

    //function for getting current weather
    function getWeather(city) {

//this url links in the first api
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7a61aeca48fc673374ccf53ae205e4f4";

        //AJAX request
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json"

            //after we get data
        }).then(function (response) {
            //traverse to correct info and set to a matching variable name
            var lat = response.coord.lat
            var lon = response.coord.lon
            var temp = response.main.temp
            var humidity = response.main.humidity
            var speed = response.wind.speed


//set the text inside these classes to the ata that we traversed to in the previous variables
            $(".city").text(city);
            $(".temperature").text(temp);
            $(".humidity").text(humidity);
            $(".windSpeed").text(speed);

            //call uvindex parameter placeholders are lat lon because uv index api has to pass the lat and long coming from getWeather
            getUVIndex(lat, lon);
//call fiveDayIndex pass city through
            fiveDayIndex(city);
            
        })
    }
    
    //uv index function
    function getUVIndex(lat, lon) {

//url for uv api
        var queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=7a61aeca48fc673374ccf53ae205e4f4&lat=${lat}&lon=${lon}`;


        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json"

            //after data is retrievedset uvindex text to the response we traversed to holding th data for uv index
        }).then(function (response) {
            var uvIndex = response.value
            $(".uvIndex").text(uvIndex);

        })

    }



//function for 5 day weather forecast
    function fiveDayIndex(city) {
        //five day url
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=7a61aeca48fc673374ccf53ae205e4f4";

        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json"

            //after data is retrieved 
        }).then(function (response) {
    //grab first 5 elements from the data
            var fiveDay = response.list.slice(0, 5)
            //create a loopp to get info for all 5 objects
            for (var i = 0; i < fiveDay.length; i++) {
                //create a new div
                var row = $("<div>");
                //create a new p tag
                var temp = $("<p>");
                //traverse to icon 
                var iconCode = fiveDay[i].weather[0].icon
                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
//change temp to the correct piece of data we traversed to holding the temperatures
                temp.text(fiveDay[i].main.temp);
                //create a new image tag for the icon
                var icon = $("<img>").attr("src", iconUrl);
                //append icon to the div for each day
                row.append(temp, icon);
                $(".row").append(row);
            }

        })

    }
//click function for search bar
    $(".newCity").on('click', function (event) {
//create variable for user input
        var input = $(".input").val()
        //local stoarage
        var cities = localStorage.getItem("city")
        console.log(cities)
    // if there is something in local storage set the cities input by the user into the array of cities
        if (cities) {
            var parsedArr = JSON.parse(cities)
            parsedArr.push(input)
            localStorage.setItem("city", JSON.stringify(parsedArr))

            //if there is not create an empty array
        } else {
            var arr = []
            arr.push(input)
            localStorage.setItem("city", JSON.stringify(arr))
        }

   //create and append new buttons for each user input and set the text to the input
        var newCity = $('<button type="city" class="btnCity" value="city"/>');
        newCity.text(input);
        $(".btn-group").append(newCity);



    });

//when clicking on each city button run the get weather funtion for that city
    $(".btn-group").on("click", ".btnCity", function (event) {
        event.preventDefault();

        var city = $(this).text()
        // console.log(city)
        getWeather(city);
        

    })


})