document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'Api_key'; 
    const apiUrl = 'https://api.openweathermap.org/data/2.5/';


    const searchBox = document.querySelector('.input-box');
    const searchButton = document.querySelector('#btn');
    const cityElement=document.querySelector('.cityName');
    const temperatureElement=document.querySelector('.derece');
    const humidityElement= document.querySelector('.nem');
    const windElement=document.querySelector('.hiz');
    const dateElement= document.querySelector('.tarih');
    const iconElement=document.querySelector('.bulut');
    const textElement=document.querySelector('.bulutAd');
    const cloudElements=document.querySelector('.c');


    searchButton.addEventListener('click', () => {
        const city = searchBox.value;
        if (city) {
            fetchWeatherData(city);
        }
    });

    function fetchWeatherData(city) {
        fetch(`${apiUrl}weather?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                displayCurrentWeather(data);
                return fetch(`${apiUrl}forecast?q=${city}&units=metric&appid=${apiKey}`);
            })
            .then(response => response.json())
            .then(data => displayForecast(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function displayCurrentWeather(data) {
        cityElement.textContent = `Current Weather in ${data.name}`;
        temperatureElement.textContent = `${data.main.temp}°C`;
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
        windElement.textContent = `Wind speed: ${data.wind.speed} km/h`;
        dateElement.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        textElement.textContent=`${data.weather[0].description}`
        iconElement.src=`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        
    }
    

    function displayForecast(data) {
        const forecastContainer = document.querySelector('.guess');
        forecastContainer.innerHTML = '';

        const forecastDays = data.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));

        forecastDays.forEach((forecast, index) => {
            const dayElement = document.createElement('div');
            dayElement.classList.add(`day${index + 1}`);

            const date = new Date(forecast.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

            const dayNameElement = document.createElement('div');
            dayNameElement.innerHTML = `<p class="a">${dayName}</p>`;
            dayElement.appendChild(dayNameElement);

            const tempElement = document.createElement('div');
            tempElement.innerHTML = `<p class="b">${forecast.main.temp}°C</p>`;
            dayElement.appendChild(tempElement);

            const iconElement = document.createElement('div');
            iconElement.innerHTML = `<img class="c" src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}" />`;
            dayElement.appendChild(iconElement);

            const descElement = document.createElement('div');
            descElement.innerHTML = `<p class="d">${forecast.weather[0].description}</p>`;
            dayElement.appendChild(descElement);

            forecastContainer.appendChild(dayElement);
        });

    }
  });