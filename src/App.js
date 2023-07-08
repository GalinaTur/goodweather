import './App.scss';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

const API_URL = {
  weather: "http://api.openweathermap.org/data/2.5/weather?",
  forecast: "http://api.openweathermap.org/data/2.5/forecast?",
  location: "http://api.openweathermap.org/geo/1.0/reverse?",
};
const API_KEY = '05df3968351d03d8d7668321890270e3';
const API_LIMIT = '&limit=1';
let coords;

const getPosition = () => {
  return new Promise((res, rej) => {
    navigator.geolocation?.getCurrentPosition(res, rej);
  })
}

export const fetchData = async (url, lat, long, limit, key, add, setState, setError) => {
  if (!coords) return;
  fetch(`${url}lat=${lat}&lon=${long}${limit}&appid=${key}${add}`)
    .then(response => {
      if (!response.ok) {
        throw Error("Sorry, can't get your location. Please, try later");
      }
      return response.json();
    }).then(data => {
      setState(data);
    }).catch(err => {
      setError(err.message);
    })
}

function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPosition().then(pos => {
      coords = pos.coords;
      return coords;
    }).then(coords => {
      fetchData(API_URL.location, coords.latitude, coords.longitude, API_LIMIT, API_KEY, '', setCurrentLocation, setError)
    })
  }, []);

  return !currentLocation? 'Loading' :( 
    <div className="App">
      <Header currentLocation={currentLocation} />
      <Main fetchData={fetchData} currentLocation={currentLocation} API_KEY={API_KEY} API_URL={API_URL}/>
    </div>
  );
}

export default App;

