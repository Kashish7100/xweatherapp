import React, { useState } from "react";
import "./App.css";

const API_KEY = "6b94da5f06544aa9b3a44848251903";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
        alert("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError("Failed to fetch weather data");
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Weather App</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <p className="loading">Loading data...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <strong>Temperature:</strong> {weather.current.temp_c}°C
          </div>
          <div className="weather-card">
            <strong>Humidity:</strong> {weather.current.humidity}%
          </div>
          <div className="weather-card">
            <strong>Condition:</strong> {weather.current.condition.text}
          </div>
          <div className="weather-card">
            <strong>Wind Speed:</strong> {weather.current.wind_kph} km/h
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
