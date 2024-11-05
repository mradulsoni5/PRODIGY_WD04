// API key from OpenWeatherMap (sign up for a free account to get one)
const apiKey = 'YOUR_API_KEY'; 

const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const conditionElement = document.getElementById('condition');
const loadingElement = document.querySelector('.loading');
const weatherInfoElement = document.querySelector('.weather-info');

// Function to fetch weather data based on latitude and longitude
function getWeather(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            loadingElement.textContent = "Failed to load weather data.";
        });
}

// Display weather information
function displayWeather(data) {
    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    conditionElement.textContent = data.weather[0].description;

    loadingElement.style.display = 'none';
    weatherInfoElement.style.display = 'block';
}

// Get user location using Geolocation API
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        getWeather(latitude, longitude);
    }, () => {
        loadingElement.textContent = "Unable to retrieve your location.";
    });
} else {
    loadingElement.textContent = "Geolocation is not supported by this browser.";
}
