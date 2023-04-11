import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [location, setLocation] = useState("Giurgiu");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const getWeatherClass = () => {
    if (!weatherData) {
      return "";
    }

    const weatherCondition = weatherData.weather[0].main;
    if (weatherCondition === "Clear") {
      return "clear-sky";
    } else if (weatherCondition === "Clouds") {
      return "clouds";
    } else if (weatherCondition === "Rain") {
      return "rain";
    } else {
      return "";
    }
  };

  return (
    <div className={`container ${getWeatherClass()}`}>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div className="weather-data">
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Wind speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
