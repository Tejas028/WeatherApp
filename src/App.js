import './App.css';
import { useEffect, useState } from 'react';
import Container from './Components/Container';
import Navbar from './Components/Navbar';
import PropTypes from 'prop-types';

function App() {
  const api = "d0041e74559b997faa3c32dbb6124ea8";

  const [sunriseTime, setSunriseTime] = useState("");
  const [sunsetTime, setSunsetTime] = useState("");
  const [rise, setRise] = useState(""); 
  const [set, setSet] = useState("");
  const [city, setCity] = useState(""); 
  const [now, setNow] = useState(""); 
  const [darkMode, setDarkMode] = useState(false);
  const [weatherCondition, setWeatherCondition] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [cityName, setCityName] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [humidity, setHumidity] = useState("");
  const [precipitation, setPrecipitation] = useState("");

  async function getWeatherByName(city) {
    if (!city) return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        updateWeatherData(data);
      } else {
        alert("City not found!");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  async function getWeather(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        updateWeatherData(data);
      } else {
        console.error("Error fetching weather data.");
      }
    } catch (error) {
      console.error("Failed to fetch weather.");
    }
  }

  function updateWeatherData(data) {
    let r = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    let s = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    let r12 = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    let s12 = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    setCity(data.name);
    setNow(data.main.temp);
    setSunriseTime(r);
    setRise(r12);
    setSunsetTime(s);
    setSet(s12);
    setFeelsLike(data.main.feels_like.toFixed(1));

    const weather = data.weather[0].description;
    setWeatherCondition(weather.charAt(0).toUpperCase() + weather.slice(1));
    setWindSpeed(data.wind.speed.toFixed(1));
    setHumidity(data.main.humidity);
    setPrecipitation(data.rain?.["1h"] || 0);

    autoMode(s, r);
  }

  function getLoc() {
    if (localStorage.getItem("latitude") && localStorage.getItem("longitude")) {
      const lat = localStorage.getItem("latitude");
      const long = localStorage.getItem("longitude");
      getWeather(lat, long);
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          localStorage.setItem("latitude", lat);
          localStorage.setItem("longitude", long);
          getWeather(lat, long);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported by browser.");
    }
  }

  useEffect(() => {
    getLoc();
  }, []);

  useEffect(() => {
    getWeatherByName(cityName);
  }, [cityName]);

  const autoMode = (s, r) => {
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();

    const [sunriseHours, sunriseMinutes] = r.split(":");
    const [sunsetHours, sunsetMinutes] = s.split(":");

    if (
      (hrs > parseInt(sunriseHours) ||
        (hrs === parseInt(sunriseHours) && mins >= parseInt(sunriseMinutes))) &&
      (hrs < parseInt(sunsetHours) ||
        (hrs === parseInt(sunsetHours) && mins < parseInt(sunsetMinutes)))
    ) {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  };

  return (
    <>
      <Navbar
        title="WeatherApp"
        mode={darkMode}
        setMode={setDarkMode}
        city={city}
        setCity={setCityName}
      />
      <Container
        mode={darkMode}
        now={now}
        sunRise={rise}
        sunSet={set}
        weather={weatherCondition}
        feelsLike={feelsLike}
        wind={windSpeed}
        humidity={humidity}
        prec={precipitation}
      />
    </>
  );
}

export default App;

Navbar.propTypes = {
  title: PropTypes.string,
  mode: PropTypes.bool,
};
