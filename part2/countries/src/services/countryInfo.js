import axios from 'axios'

const allCountriesUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
const countryBaseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name"

const getCountryNames = () => {
    return (
        axios
            .get(allCountriesUrl)
            .then(response => response.data)
            .then(countryData => countryData.map(c => c.name.common))
    )
}

const getCountryInfo = (commonName) => {
    const countryUrl = `${countryBaseUrl}/${commonName}`

    return (
        axios
            .get(countryUrl)
            .then(response => response.data)
    )
}

export default { getCountryNames, getCountryInfo }
