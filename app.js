const apikey = "7093d3c0e139530131d300b436c721a1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);
    
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";   

        
        const weatherCondition = data.weather[0].main.toLowerCase(); 

        if (weatherCondition === "clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherCondition === "clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherCondition === "rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherCondition === "drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherCondition === "mist") {
            weatherIcon.src = "images/mist.png";
        } else {
            weatherIcon.src = "images/default.png";  
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
