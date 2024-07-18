const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = 'e67fc065c42d8879ce75b89259b44548';
const difKelvin = 273.15;

document.getElementById('botonBusqueda').addEventListener('click', () => {
    let ciudad = document.getElementById('ciudadEntrada').value;
    if (ciudad) {
        fetchDatosClima(ciudad);
    }
})


function fetchDatosClima(ciudad) {
    const divdatosTiempo = document.getElementById('datosTiempo');
    divdatosTiempo.classList.remove('visible');

    const url = `${urlBase}?q=${ciudad}&appid=${apiKey}`;
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Ciudad no encontrada');
        }
        return response.json();
    })
    .then(data => mostrarDatosClima(data))
    .catch(error => mostrarError(error.message));
}

function mostrarDatosClima(data) {
    const divdatosTiempo = document.getElementById('datosTiempo');
    divdatosTiempo.innerHTML = '';

    const cityName = data.name;
    const cityCountry = data.sys.country;
    const cityTemp = data.main.temp;
    const description = data.weather[0].description;
    const cityHumidity = data.main.humidity;
    const weatherIcon = data.weather[0].icon;

    const cityTitleElement = document.createElement('h2');
    cityTitleElement.classList.add('city-title', 'appear');
    cityTitleElement.textContent = `${cityName}, ${cityCountry} `;

    const iconElement = document.createElement('img');
    iconElement.classList.add('city-icon', 'appear');
    iconElement.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    const cityTempElement = document.createElement('p');
    cityTempElement.classList.add('city-temp', 'appear');
    cityTempElement.textContent = `The current temperature is: ${Math.floor(cityTemp - difKelvin)}°C`;

    const cityHumidityElement = document.createElement('p');
    cityHumidityElement.classList.add('city-humidity', 'appear');
    cityHumidityElement.textContent = `The humidity is: ${cityHumidity}%`;

    const cityDescriptionElement = document.createElement('p');
    cityDescriptionElement.classList.add('city-description', 'appear');
    cityDescriptionElement.textContent = `The weather is: ${description}`;

    divdatosTiempo.appendChild(cityTitleElement);
    divdatosTiempo.appendChild(iconElement);
    divdatosTiempo.appendChild(cityTempElement);
    divdatosTiempo.appendChild(cityDescriptionElement);
    divdatosTiempo.appendChild(cityHumidityElement);

    divdatosTiempo.classList.add('visible');
}

let mostrarError = message => {
    const divdatosTiempo = document.getElementById('datosTiempo');
    divdatosTiempo.innerHTML = '';
    const errorElement = document.createElement('p');
    errorElement.classList.add('error-message', 'appear');
    errorElement.textContent = message;
    divdatosTiempo.appendChild(errorElement);

    divdatosTiempo.classList.add('visible');
}