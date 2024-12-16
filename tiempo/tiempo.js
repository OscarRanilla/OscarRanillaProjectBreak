document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '1c4e5f5813d142e9a81192646241312'; // Mi ApiKey 
    const defaultCity = 'Madrid'; // Cuando se abre la página se muestra por default la ciudad de Madrid


    // Elementos del DOM
    const form = document.getElementById('cityForm');
    const inputCity = document.getElementById('cityInput');
    const locationName = document.getElementById('locationName');
    const weatherCondition = document.getElementById('weatherCondition');
    const weatherIcon = document.getElementById('weatherIcon');
    const temperature = document.getElementById('temperature');
    const precipitation = document.getElementById('precipitation');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const forecastWeather = document.getElementById('forecastWeather');
    const scrollLeftButton = document.getElementById('scrollLeft');// Flecha scrollLeft para el desplazamiento hacia la izquierda 
    const scrollRightButton = document.getElementById('scrollRight');// Flecha ScrollRight para el desplazamiento hacia la derecha
    //Estas dos del final las utilizamos para el contenedor de prevision
    //por horas y también se mostrarán o ocultarán segun corresponda
    
    // Funcion para obtener datos de la API

    async function fetchWeather(city) {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al obtener los datos del clima.');
            const data = await response.json();
            updateCurrentWeather(data);
            updateForecast(data.forecast.forecastday[0].hour);
        } catch (error) {
            console.error('Error:', error.message);
            alert('No se pudo obtener la información del clima. Por favor, verifica la ciudad ingresada.');
        }
    }


    // Se Actualiza el clima actual en el DOM

    function updateCurrentWeather(data) {
        const { location, current } = data;

        locationName.textContent = `${location.name} / ${location.country}`;
        weatherCondition.textContent = current.condition.text;
        weatherIcon.src = `https:${current.condition.icon}`;
        weatherIcon.alt = current.condition.text;
        temperature.textContent = `${current.temp_c} ºC`;
        precipitation.textContent = `Precipitaciones: ${current.precip_mm} mm`;
        humidity.textContent = `Humedad: ${current.humidity}%`;
        windSpeed.textContent = `Viento: ${current.wind_kph} Km/h`;
    }

    // Se actualiza la previsión por horas en el DOM

    function updateForecast(hourlyData) {
        forecastWeather.innerHTML = ''; // Se limpia la previsión anterior

        hourlyData.forEach(hour => {
            const listItem = document.createElement('li');
            listItem.classList.add('forecast-grades');
            listItem.innerHTML = `
                <span>
                    ${hour.time.split(' ')[1]} 
                    <span>
                        <img class="weather-icon" src="https:${hour.condition.icon}" alt="${hour.condition.text}">
                        <p>${hour.temp_c} ºC</p>
                    </span>
                </span>
            `;
            forecastWeather.appendChild(listItem);
        });
        toggleScrollButtons();
    }

    // Scroll para el desplazamiento horizontal y la visibilidad de botones
    // LEFT Y RIGHT
    scrollLeftButton.addEventListener('click', () => {
        forecastWeather.scrollBy({left: -200, behavior: 'smooth'});
    });

    scrollRightButton.addEventListener('click', () => {
        forecastWeather.scrollBy({ left: 200, behavior: 'smooth'});
    });

    function toggleScrollButtons() {
        const maxScrollLeft = forecastWeather.scrollWidth - forecastWeather.clientWidth;
        scrollLeftButton.style.display = forecastWeather.scrollLeft > 0 ? 'flex' : 'none';
        scrollRightButton.style.display = forecastWeather.scrollLeft < maxScrollLeft ? 'flex' : 'none';
    }

    //Cuando se hacen los eventos de scroll y actualizan los botones
    forecastWeather.addEventListener('scroll', toggleScrollButtons);

    // Se maneja el formulario para cambiar la ciudad 

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = inputCity.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    // Se carga el inicio con la ciudad por defecto "Madrid"

    fetchWeather(defaultCity);
});