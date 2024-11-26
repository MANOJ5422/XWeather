import React, { useState } from "react";
import "./App.css"; // Add some CSS styling

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchWeatherData = async () => {
    if (!city) return; // Do nothing if city input is empty
    setIsLoading(true);
    setError(false);
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=376d61c7b2a84f10a96182523242511&q=${city}`
      );

      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeatherData(data.current);
    } catch (error) {
      setError(true);
      alert("Failed to fetch weather data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherData} style={{ backgroundColor: "green" }}>
          Search
        </button>
      </div>

      {isLoading ? (
        <p>Loading data…</p>
      ) : (
        <div className="weather-cards">
          {weatherData && (
            <>
              <div className="weather-card">
                <h2>Temperature</h2>
                <p>{weatherData.temp_c}°C</p>
              </div>
              <div className="weather-card">
                <h2>Humidity</h2>
                <p>{weatherData.humidity}%</p>
              </div>
              <div className="weather-card">
                <h2>Condition</h2>
                <p>{weatherData.condition.text}</p>
              </div>
              <div className="weather-card">
                <h2>Wind Speed</h2>
                <p>{weatherData.wind_kph} kph</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default App;
