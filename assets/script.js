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
    function getWeather(city) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7a61aeca48fc673374ccf53ae205e4f4";

        //AJAX request
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json"

        }).then(function (response) {
            var lat = response.coord.lat
            var lon = response.coord.lon
            var temp = response.main.temp
            var humidity = response.main.humidity
            var speed = response.wind.speed



            $(".city").text(city);

            $(".temperature").text(temp);
            $(".humidity").text(humidity);
            $(".windSpeed").text(speed);

            getUVIndex(lat, lon);
            fiveDayIndex(city);
        })
    }
    // getWeather(city);

    function getUVIndex(lat, lon) {


        var queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=7a61aeca48fc673374ccf53ae205e4f4&lat=${lat}&lon=${lon}`;


        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json"
        }).then(function (response) {
            var uvIndex = response.value
            $(".uvIndex").text(uvIndex);

        })

    }




    function fiveDayIndex(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=7a61aeca48fc673374ccf53ae205e4f4";

        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json"

        }).then(function (response) {
            console.log(response)
            var fiveDay = response.list.slice(0, 5)
            for (var i = 0; i < fiveDay.length; i++) {
                var row = $("<div>");
                var temp = $("<p>");
                var iconCode = fiveDay[i].weather[0].icon
                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

                temp.text(fiveDay[i].main.temp);
                var icon = $("<img>").attr("src", iconUrl);
                row.append(temp, icon);
                $(".row").append(row);
            }

        })

    }

    $(".newCity").on('click', function (event) {

        var input = $(".input").val()
        //local stoarage
        var cities = localStorage.getItem("city")
        console.log(cities)
        if (cities) {
            var parsedArr = JSON.parse(cities)
            parsedArr.push(input)
            localStorage.setItem("city", JSON.stringify(parsedArr))
        } else {
            var arr = []
            arr.push(input)
            localStorage.setItem("city", JSON.stringify(arr))
        }

        console.log(input);
        var newCity = $('<button type="city" class="btnCity" value="city"/>');
        newCity.text(input);
        $(".btn-group").append(newCity);



    });


    $(".btn-group").on("click", ".btnCity", function (event) {
        event.preventDefault();
        console.log(this)

        var city = $(this).text()
        // console.log(city)
        getWeather(city);
        fiveDayIndex(city);

    })


})