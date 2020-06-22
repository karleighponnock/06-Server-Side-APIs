let request = new XMLHttpRequest
request.open("Get", api.openweathermap.org / data / 2.5 / weather ? q = { cityname } & appid={ 7a61aeca48fc673374ccf53ae205e4f4 })
request.send();
request.onload = () {
    console.log(request);
    if (request.Status === 200) {
        console.log(JSON.parse(request.response))
    } else {
        console.log(`error ${request.status} ${request.statusText}`)
    }
}