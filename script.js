const apiKey = '6b599d18ae0c1eb5fc9c5ebae91b9a7d'; 

document.getElementById('weather-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const city = document.getElementById('city').value;
    if (!city) return;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`);
        const data = await response.json();

        console.log(data); // Verifica la respuesta

        if (data.cod === '404') {
            document.getElementById('temperature').textContent = 'Ciudad no encontrada';
            document.getElementById('description').textContent = '';
            document.getElementById('humidity').textContent = '';
            document.getElementById('wind').textContent = '';
            return;
        }

        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeedMs = data.wind.speed;
        const windSpeedKmH = (windSpeedMs * 3.6).toFixed(1); // Convertir m/s a km/h

        document.getElementById('temperature').textContent = `Temperatura: ${temperature}°C`;
        document.getElementById('description').textContent = `Descripción: ${description.charAt(0).toUpperCase() + description.slice(1)}`;
        document.getElementById('humidity').textContent = `Humedad: ${humidity}%`;
        document.getElementById('wind').textContent = `Velocidad del viento: ${windSpeedKmH} km/h`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('temperature').textContent = 'Error al obtener los datos';
        document.getElementById('description').textContent = '';
        document.getElementById('humidity').textContent = '';
        document.getElementById('wind').textContent = '';
    }
});
