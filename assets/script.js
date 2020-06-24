$(document).ready(function () {

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
            var temp =response.main.temp
            var humidity =response.main.humidity
            var speed =response.wind.speed
            

            console.log(response)
            $(".city").text(city);
            
            $(".temperature").text(temp);
            $(".humidity").text(humidity);
            $(".windSpeed").text(speed);

            
            getUVIndex(lat, lon);
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
            var uvIndex =response.value
            $(".uvIndex").text(uvIndex);
        
        })

    }



    $(".btnCity").on("click", function (event) {
        event.preventDefault();
        console.log(this)
        var city = $(this).text()
        console.log(city)
        getWeather(city);
    })
})

