import './App.scss';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

const API_URL = 'http://api.openweathermap.org';
const API_KEY = '05df3968351d03d8d7668321890270e3'
let coords;

const getPosition = () => {
  return new Promise((res, rej) => {
    navigator.geolocation?.getCurrentPosition(res, rej);
  })
}

function App() {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({
    temp: '',
    feels_like: '',
    weather: '',
    wind_deg: '',
    wind_speed: '',
    time_of_day: ''
  })

  useEffect(() => {
    getPosition().then(pos => {
      coords = pos.coords;
      return coords;
    }).then(coords => fetch(`${API_URL}/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=1&appid=${API_KEY}`))
      .then(response => {
        if (!response.ok) {
          throw Error("Sorry, can't get your location. Please, try later");
        }
        return response.json();
      }).then(data => {
        setCurrentLocation([data[0]["name"], data[0]["country"]])
      }).then(() => fetch(`${API_URL}/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`))
      .then(response => {
        if (!response.ok) {
          throw Error("Sorry, can't get current weather. Please, try later");
        }
        return response.json();
      })
      .then(data => {
        setIsPending(false);
        setCurrentWeather({
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          weather: data.weather[0].description,
          wind_deg: data.wind.deg,
          wind_speed: data.wind.speed,
          time_of_day: (data.weather[0].icon).slice(-1),
        })
      }).then(() => fetch(`${API_URL}/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`))
      .then(response => {
        if (!response.ok) {
          throw Error("Sorry, can't get forecast. Please, try later");
        }
        return response.json();
      })
      .then(data => {
        setIsPending(false);
        console.log(data);
        // setCurrentWeather({
        //   temp: data.main.temp,
        //   temp_max: data.main.temp_max,
        //   temp_min: data.main.temp_min,
        //   weather: data.weather[0].description,
        //   wind_deg: data.wind.deg,
        //   wind_speed: data.wind.speed
        // })
      })
      .catch(err => {
        setError(err.message);
      })
  }
    , []);


  return (
    <div className="App">
      <Header setCurrentLocation={setCurrentLocation} currentLocation={currentLocation} />
      <Main currentWeather={currentWeather} />
    </div>
  );
}

export default App;

