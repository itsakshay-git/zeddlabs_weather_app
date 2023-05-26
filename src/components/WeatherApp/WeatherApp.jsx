import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherApp.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloud,
  faCloudSun,
  faCloudRain,
  faSnowflake,
  faWind,
  faTint,
  faCompass
} from "@fortawesome/free-solid-svg-icons";

const API_KEY = "f004216171243428fa4af886309b025e"; // Replace with your OpenWeatherMap API key

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWeatherData("pune");
  }, []);

  const fetchWeatherData = (city) => {
    setLoading(true);
    setError("");

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("City not found");
        setLoading(false);
      });
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    if (!city) return;
    fetchWeatherData(city);
  };

  const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
        return <FontAwesomeIcon icon={faSun} />;
      case "02d":
        return <FontAwesomeIcon icon={faCloudSun} />;
      case "03d":
      case "04d":
        return <FontAwesomeIcon icon={faCloud} />;
      case "09d":
      case "10d":
        return <FontAwesomeIcon icon={faCloudRain} />;
      case "13d":
        return <FontAwesomeIcon icon={faSnowflake} />;
      default:
        return <FontAwesomeIcon icon={faSun} />;
    }
  };

  useEffect(() => {
    if (weatherData) {
      const weatherCondition = weatherData.weather[0].main.toLowerCase();
      document.querySelector(
        ".weather-info"
      ).classList = `weather-info ${weatherCondition}`;
    }
  }, [weatherData]);

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {weatherData ? (
            <div className="weather-info">
              <h2>{weatherData.name}</h2>
              <div className="weather-icon">
                {getWeatherIcon(weatherData.weather[0].icon)}
              </div>
              <div className="weather-details">
                <div className="detail">
                  <FontAwesomeIcon icon={faTint} />
                  <p>Humidity: {weatherData.main.humidity}%</p>
                </div>
                <div className="detail">
                  <FontAwesomeIcon icon={faWind} />
                  <p>Wind: {weatherData.wind.speed} m/s</p>
                </div>
                <div className="detail">
                  <FontAwesomeIcon icon={faCompass} />
                  <p>Wind Direction: {weatherData.wind.deg}°</p>
                </div>
                <div className="detail">
                  <FontAwesomeIcon icon={faTint} />
                  <p>Humidity: {weatherData.main.humidity}%</p>
                </div>
                <div className="detail">
                  <FontAwesomeIcon icon={faWind} />
                  <p>Wind: {weatherData.wind.speed} m/s</p>
                </div>
                <div className="detail">
                  <FontAwesomeIcon icon={faCompass} />
                  <p>Wind Direction: {weatherData.wind.deg}°</p>
                </div>
              </div>
              <p className="temperature">
                {convertKelvinToCelsius(weatherData.main.temp)}°C
              </p>
              <p className="description">
                {weatherData.weather[0].description}
              </p>
            </div>
          ) : (
            <p>{error}</p>
          )}
        </>
      )}
    </div>
  );
};

export default WeatherApp;