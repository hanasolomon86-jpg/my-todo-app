import { useState, useEffect } from "react";
import "../WeatherWidget/WeatherWidget.css";

function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  const openMeteroURL =
    "https://api.open-meteo.com/v1/forecast?latitude=32.08&longitude=34.78&current=temperature_2m";

  useEffect(() => {
    fetch(openMeteroURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch weather");
        }
        return res.json();
      })
      .then((data) => {
        setWeather(data.current.temperature_2m);
      })
      .catch((error) => {
        console.error("Weather error:", error);
      });
  }, []);

  return (
    <div className="weather-container">
      <h3>How is the weather today:</h3>
      {weather !== null ? <p>{weather}°C</p> : <p>Loading</p>}
    </div>
  );
}

export default WeatherWidget;
