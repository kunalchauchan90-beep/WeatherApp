const weatherform=document.querySelector(".weatherform");
const cityinput=document.querySelector(".cityinput");
const card=document.querySelector(".card");

const apikey="bc20dafbce21ba6b8894e592408d4de6";


weatherform.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = cityinput.value.trim();

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeather(weatherData);
        } catch (error) {
            showError("City not found!");
        }
    } else {
        showError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch data");
    }

    return await response.json();
}

function displayWeather(data) {
    console.log(data);

    const cityDisplay = document.querySelector(".citydisplay");
    const tempDisplay = document.querySelector(".temperaturedisplay");
    const humidityDisplay = document.querySelector(".humiditydisplay");
    const descDisplay = document.querySelector(".descdisplay");
    const emojiDisplay = document.querySelector(".weatheremoji");
    const errorDisplay = document.querySelector(".errordisplay");

    card.style.display="block";

    errorDisplay.style.display = "none";

    const { name, main, weather } = data;

    cityDisplay.textContent = name;
    tempDisplay.textContent = `${Math.round(main.temp)}°C`;
    humidityDisplay.textContent = `Humidity: ${main.humidity}%`;
    descDisplay.textContent = weather[0].description;

    emojiDisplay.textContent = getWeatherEmoji(weather[0].main);
}

function getWeatherEmoji(condition) {
    switch (condition) {
        case "Clouds":
            return "☁️";
        case "Rain":
            return "🌧️";
        case "Clear":
            return "☀️";
        case "Snow":
            return "❄️";
        case "Thunderstorm":
            return "⛈️";
        case "Drizzle":
            return "🌦️";
        case "Mist":
            return "🌫️";
        default:
            return "🌡️";
    }
}

function showError(message) {
    const errorDisplay = document.querySelector(".errordisplay");
    errorDisplay.textContent = message;
    errorDisplay.style.display = "block";
}