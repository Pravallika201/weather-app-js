const api_key = "ff4c76c23dc78145e0983a09e7b58b13";


let weatherDataEl = document.getElementById("weather-data");
let cityInputEl = document.getElementById("city-input");
let formEl = document.querySelector("form");

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${api_key}&units=metric`)
        
        if (!response.ok) {
            throw new Error("Network response was not ok")
        }
        const data = await response.json()

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `wind speed: ${data.wind.speed} m/s`,
        ]
        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weatherIcon"/>`
        weatherDataEl.querySelector(".temperature").textContent=`${temperature}°C`;
        weatherDataEl.querySelector(".description").textContent= description;
        weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=>`<div>${detail}</div>`).join("");


    }
    catch(error){
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent="";
        
        weatherDataEl.querySelector(".details").innerHTML = "";

        weatherDataEl.querySelector(".description").textContent= "Please try again";
    }
}