import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const CountryInfo = ({ country }) => {
    const [weather, setWeather] = useState(null);
    const iconUrl = `https://openweathermap.org/img/wn/`

    useEffect(() => {
        const { latlng } = country;
        const [lat, lon] = latlng;
        weatherService.getWeather(lat, lon).then(setWeather);
    }, [country]);

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <div>
                <h3>Languages:</h3>
                <ul>
                    {Object.entries(country.languages).map(([languageCode, languageName]) =>
                        <li key={languageCode}>{languageName}</li>
                    )}
                </ul>
            </div>
            <img src={country.flags.png} alt={country.name.common} />
            {weather && (
                <div>
                    <h3>Weather in {country.capital}</h3>
                    <p>Temperature: {weather.main.temp}ºC</p>
                    <img src={`${iconUrl}${weather.weather[0].icon}@2x.png`} alt={`${country.capital} Temperature Icon`} />
                    <p>Wind: {weather.wind.speed}mt/s</p>
                </div>
            )}
        </div>
    )
}

const Country = ({ country, setFilterValue }) => {
    return (
        <div>
            {country.name.common}
            <button onClick={() => setFilterValue(country.name.common)}>Show</button>
        </div>
    )
}

const Countries = ({ countriesToShow, countriesLength, setFilterValue }) => {
    if (countriesLength == 0) return <p>No matches found</p>
    else if (countriesLength == 1) return <CountryInfo country={countriesToShow[0]}></CountryInfo>
    else if (countriesLength > 1 && countriesLength <= 10) {
        return (
            <div>
                {countriesToShow.map((country, index) =>
                    <Country country={country} key={index} setFilterValue={setFilterValue} />
                )}
            </div>
        )
    }
    else return <p>Too many matches, specify another filter</p>
}

export default Countries