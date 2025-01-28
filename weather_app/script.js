const url = 'https://api.openweathermap.org/data/2.5/';
const apiKey = '81f41e4c217b522028921ad8f82bed71';
let unit = 'metric'; // Default to Celsius

const iconMap = {
    '01d': 'wi wi-day-sunny',
    '01n': 'wi wi-night-clear',
    '02d': 'wi wi-day-cloudy',
    '02n': 'wi wi-night-cloudy',
    '03d': 'wi wi-cloud',
    '03n': 'wi wi-cloud',
    '04d': 'wi wi-cloudy',
    '04n': 'wi wi-cloudy',
    '09d': 'wi wi-rain',
    '09n': 'wi wi-rain',
    '10d': 'wi wi-day-rain',
    '10n': 'wi wi-night-rain',
    '11d': 'wi wi-day-thunderstorm',
    '11n': 'wi wi-night-thunderstorm',
    '13d': 'wi wi-snow',
    '13n': 'wi wi-snow',
    '50d': 'wi wi-day-fog',
    '50n': 'wi wi-night-fog',
};

// Function to toggle between Celsius and Fahrenheit
$(document).ready(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                weatherFnByCoords(lat, lon);
                weatherForecastFnByCoords(lat, lon);
            },
            error => {
                alert("Unable to fetch your location. Please check your browser's location settings. Defaulting to London.");
                // Default to London if geolocation is denied
                const defaultCity = "London";
                weatherFn(defaultCity);
                weatherForecastFn(defaultCity);
            }
        );
    } else {
        alert("Geolocation is not supported by this browser. Defaulting to London.");
        weatherFn("London");
        weatherForecastFn("London");
    }

    $('#city-input-btn').click(function () {
        const cityName = $('#city-input').val().trim();
        if (cityName) {
            weatherFn(cityName);
            weatherForecastFn(cityName);
        } else {
            alert('Please enter a valid city name.');
        }
    });

    $('#toggle-celsius').click(function () {
        if (unit !== 'metric') {
            unit = 'metric';
            toggleUnitUI();
            const cityName = $('#city-name').text();
            if (cityName) {
                weatherFn(cityName);
                weatherForecastFn(cityName);
            }
        }
    });

    $('#toggle-fahrenheit').click(function () {
        if (unit !== 'imperial') {
            unit = 'imperial';
            toggleUnitUI();
            const cityName = $('#city-name').text();
            if (cityName) {
                weatherFn(cityName);
                weatherForecastFn(cityName);
            }
        }
    });
});

function toggleUnitUI() {
    $('#toggle-celsius').toggleClass('active', unit === 'metric');
    $('#toggle-fahrenheit').toggleClass('active', unit === 'imperial');
}

async function weatherFnByCoords(lat, lon) {
    const temp = `${url}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    showLoadingState(); // Added loading state
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('Unable to fetch weather for your location.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    } finally {
        hideLoadingState(); // Hide loading state
    }
}

async function weatherFn(cityName) {
    const temp = `${url}weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
    showLoadingState(); // Added loading state
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    } finally {
        hideLoadingState(); // Hide loading state
    }
}

async function weatherForecastFn(cityName) {
    const forecastUrl = `${url}forecast?q=${cityName}&appid=${apiKey}&units=${unit}`;
    showLoadingState(); // Added loading state
    try {
        const res = await fetch(forecastUrl);
        const data = await res.json();
        if (res.ok) {
            forecastShowFn(data);
        } else {
            alert('Unable to fetch forecast data for the city.');
        }
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    } finally {
        hideLoadingState(); // Hide loading state
    }
}

async function weatherForecastFnByCoords(lat, lon) {
    const forecastUrl = `${url}forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    showLoadingState(); // Added loading state
    try {
        const res = await fetch(forecastUrl);
        const data = await res.json();
        if (res.ok) {
            forecastShowFn(data);
        } else {
            alert('Unable to fetch forecast data for your location.');
        }
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    } finally {
        hideLoadingState(); // Hide loading state
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name || 'Unknown Location');
    $('#date').text(moment().format('dddd, MMMM Do YYYY, h:mm a'));
    $('#temperature').html(`${data.main.temp}°${unit === 'metric' ? 'C' : 'F'}`);
    $('#description').text(data.weather[0].description || 'N/A');
    $('#humidity').text(`${data.main.humidity}%`);
    $('#pressure').text(`${data.main.pressure} hPa`);
    $('#wind-speed').text(`${data.wind.speed} m/s`);
    $('#wind-direction').text(`${data.wind.deg}°`);
    const iconClass = iconMap[data.weather[0].icon] || 'wi wi-na';
    $('#weather-icon').removeClass().addClass(iconClass);
    $('#weather-info').fadeIn();
}

function forecastShowFn(data) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let currentDay = new Date().getDay();
    $('#forecast-info').empty();

    for (let i = 0; i < 5; i++) {
        const dayData = data.list[i * 8];
        const day = new Date(dayData.dt * 1000);
        const weekdayName = weekday[(currentDay + i) % 7];
        const temperature = (dayData.main.temp).toFixed(1);
        const icon = dayData.weather[0].icon;
        const iconClass = iconMap[icon] || 'wi wi-na';

        const cardHTML = `
            <div class="forecast-card">
                <h3>${weekdayName}</h3>
                <i class="${iconClass}"></i>
                <h4>${temperature}°${unit === 'metric' ? 'C' : 'F'}</h4>
                <p><strong>Humidity:</strong> ${dayData.main.humidity}%</p>
                <p><strong>Pressure:</strong> ${dayData.main.pressure} hPa</p>
                <p><strong>Wind Speed:</strong> ${dayData.wind.speed} m/s</p>
            </div>
        `;
        $('#forecast-info').append(cardHTML);
    }
}

// Function to show loading state
function showLoadingState() {
    $('#weather-info').hide();
    $('#forecast-info').hide();
    $('#loading').show(); // Assuming you have a loading element
}

// Function to hide loading state
function hideLoadingState() {
    $('#loading').hide(); // Assuming you have a loading element
    $('#weather-info').show();
    $('#forecast-info').show();
}
