import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const getWeatherAt = (lat, long) => {
    if (apiKey === undefined) {
        return Promise.reject(new Error("APIKeyNotFound"))
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`
    return (
        axios
            .get(url)
            .then(response => response.data)
    )
}

export default { getWeatherAt }
