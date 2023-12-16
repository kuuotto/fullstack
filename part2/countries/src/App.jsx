import { useState, useEffect } from 'react'
import './App.css'
import countryInfo from './services/countryInfo'
import currentWeather from './services/currentWeather'

function App() {
    const [countryNames, setCountryNames] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedCountryInfo, setSelectedCountryInfo] = useState(null)

    // load country names at the start
    useEffect(() => {
        countryInfo
            .getCountryNames()
            .then(returnedNames => setCountryNames(returnedNames))
    }, [])

    const updateSelectedCountry = (newSelectedCountry) => {
        // do nothing if the selected country didn't change
        if (newSelectedCountry === selectedCountry) {
            return
        }

        setSelectedCountry(newSelectedCountry)

        if (!newSelectedCountry) {
            return
        }

        // load data for the new country
        countryInfo
            .getCountryInfo(newSelectedCountry)
            .then(countryInfo => {
                setSelectedCountryInfo(countryInfo)
                console.log(countryInfo)
            })
    }

    return (
        <>
            <h1>Information about Countries</h1>
            <CountrySelector
                countryNames={countryNames}
                setSelectedCountry={updateSelectedCountry}
            />
            <h2>{selectedCountry}</h2>
            {selectedCountry && <CountryInfoDisplay countryInfo={selectedCountryInfo} />}
        </>
    )
}

const CountrySelector = ({ countryNames, setSelectedCountry }) => {
    const [countryNameInput, setCountryNameInput] = useState("")

    return (
        <div>
            <div>
                <label htmlFor="searchTerm">Start typing a country name:</label>
                <input
                    id="searchTerm"
                    value={countryNameInput}
                    onChange={event => setCountryNameInput(event.target.value)} />
            </div>
            <CountryList
                countryNames={countryNames}
                searchTerm={countryNameInput}
                setSelectedCountry={setSelectedCountry}
            />
        </div>
    )
}

const CountryList = ({ countryNames, searchTerm, setSelectedCountry }) => {
    if (!countryNames) {
        return null
    }

    // filter and sort countries
    const countriesToShow = countryNames
        .filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort()

    // select the country if there is only one result
    // we have to wrap this in useEffect. Otherwise we would call a setter of
    // the App component during the rendering of CountryList, which is a no no.
    useEffect(() => {
        const newSelectedCountry = countriesToShow.length === 1 ? countriesToShow[0] : null
        setSelectedCountry(newSelectedCountry)
    }, [searchTerm])

    // don't display anything if we have selected a country
    if (countriesToShow.length === 1) {
        return null
    }

    // don't show results if there are too many
    if (countriesToShow.length > 10) {
        return (`${countriesToShow.length} results. Try a more specific country name.`)
    }

    // if there are no results, say so
    if (countriesToShow.length === 0) {
        return ("No results. Try a different country name.")
    }

    return (
        <ul>
            {countriesToShow.map(
                countryName =>
                    <li key={countryName}>
                        {countryName}
                        <button onClick={() => setSelectedCountry(countryName)}>show</button>
                    </li>
            )
            }
        </ul>
    )
}

const CountryInfoDisplay = ({ countryInfo }) => {
    if (!countryInfo) {
        return
    }
    const languages = Object.values(countryInfo.languages)

    return (
        <>
            <img src={countryInfo.flags.svg} className="flag" alt={countryInfo.flags.alt} />
            <img src={countryInfo.coatOfArms.svg} className="coatOfArms" alt={countryInfo.coatOfArms.alt} />
            <p>{countryInfo.name.common !== countryInfo.name.official ? `or ${countryInfo.name.official},` : ""} is a country in {countryInfo.subregion}.</p>
            <p>Here are some basic facts:</p>
            <li>Capital{countryInfo.capital.length > 1 ? "s" : ""}: {joinStringsNeat(countryInfo.capital)}</li>
            <li>Population: {countryInfo.population.toLocaleString()}</li>
            <li>Area: {countryInfo.area.toLocaleString()} km<sup>2</sup></li>
            <li>Language{languages.length > 1 ? "s" : ""}: {joinStringsNeat(languages)} </li>
            <CapitalWeatherDisplay countryInfo={countryInfo} />
        </>
    )
}

const CapitalWeatherDisplay = ({ countryInfo }) => {
    const [weatherData, setWeatherData] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const [lat, long] = countryInfo.capitalInfo.latlng
        currentWeather
            .getWeatherAt(lat, long)
            .then(weatherData => {
                setWeatherData(weatherData)
                console.log(weatherData)
            })
            .catch(({error, message}) => {
                setWeatherData(null)
                setErrorMessage(message)
                console.log(error, message)
            })
    }, [countryInfo])

    if (errorMessage === "APIKeyNotFound") {
        return <p>Weather data for the capital city could not be found (API key is missing).</p>
    } else if (errorMessage !== null) {
        return <p>Unknown error happened when finding weather for the capital city.</p>
    }

    if (!weatherData) {
        return null
    }

    return (
        <>
            <h3>Weather in {countryInfo.capital[0]}</h3>
            <div className="weatherConditions">
                {
                    weatherData.weather.map(weather => {
                        return (
                            <div className="weatherCondition" key={weather.id}>
                                <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
                                <p>{weather.description}</p>
                            </div>
                        )
                    })
                }
            </div>
            The temperature is {weatherData.main.temp} °C.
            Wind is blowing at the speed of {weatherData.wind.speed} m/s.
        </>
    )
}

const joinStringsNeat = (stringArray) => {
    if (stringArray.length === 1) {
        return stringArray[0]
    }

    return `${stringArray.slice(0, stringArray.length - 1).join(", ")} and ${stringArray[stringArray.length - 1]}`
}

export default App
