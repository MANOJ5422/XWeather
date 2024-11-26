import React, { useState } from "react";
import "./App.css"; // Optional for styling

const API_KEY = "your_api_key_here"; // Replace with your WeatherAPI key
const API_ENDPOINT = "https://api.weatherapi.com/v1/current.json";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    if (!city.trim()) {
      alert("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(
        `${API_ENDPOINT}?key=376d61c7b2a84f10a96182523242511&q=${encodeURIComponent(city)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError("Failed to fetch weather data");
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Weather Application</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Search</button>
      </div>

      {loading && <p>Loading data…</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h2>Temperature</h2>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h2>Humidity</h2>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h2>Condition</h2>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h2>Wind Speed</h2>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
