import './App.scss';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

const API_URL = {
  weather: "https://api.openweathermap.org/data/2.5/weather?",
  forecast: "https://api.openweathermap.org/data/2.5/forecast?",
  locationDir: "http://api.openweathermap.org/geo/1.0/direct?",
  locationRev: "https://api.openweathermap.org/geo/1.0/reverse?",
  airPollution: "http://api.openweathermap.org/data/2.5/air_pollution?"
};
const API_KEY = '05df3968351d03d8d7668321890270e3';
const API_LIMIT = '&limit=1';
let coords;

const getPosition = () => {
  return new Promise((res, rej) => {
    navigator.geolocation?.getCurrentPosition(res, rej);
  })
}

export const fetchData = async (url, lat, long, limit, key, extra, setState, setError) => {
  if (!coords) return;
  fetch(`${url}lat=${lat}&lon=${long}${limit}&appid=${key}${extra}`)
    .then(response => {
      if (!response.ok) {
        throw Error("Sorry, can't get data. Please, try later");
      }
      return response.json();
    }).then(data => {
      setState(data);
    }).catch(err => {
      setError(err.message);
    })
}

const fetchDataDir = (url, city, state, country, limit, key, setState) => {
  fetch(`${url}q=${city},${state && state + ','}${country}&limit=${limit}&appid=${key}`)
    .then(response => {
      if (!response.ok) {
        throw Error("Sorry, can't get data. Please, try later");
      }
      return response.json();
    }).then(data => {
      setState(data);
    }).catch(err => {
      setState(err.message);
    })
}

function App() {
  const [isPending, setIsPending] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPosition().then(pos => {
      coords = pos.coords;
      return coords;
    }).then(coords => {
      fetchData(API_URL.locationRev, coords.latitude, coords.longitude, API_LIMIT, API_KEY, '', setCurrentLocation, setError)
      setIsPending(false);
    }).catch(err => {
      setError("Can't get your location. Please use search string to find forecast by city name or try later");
      setIsPending(false);
    })
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDataDir(API_URL.locationDir, searchTerm, '', '', 5, API_KEY, setSearchResult);
  }

  const handleSelect = (item) => {
    let locationArr = item.split(', ');
    if (locationArr.length === 2) locationArr.splice(1, 0, '');
    fetchDataDir(API_URL.locationDir, ...locationArr, 1, API_KEY, setCurrentLocation);
  }

  return (
    <div className="App" style={{height: window.innerHeight}}>
      <Header currentLocation={currentLocation} isPending={isPending} handleChange={handleChange} handleSubmit={handleSubmit} searchResult={searchResult} handleSelect={handleSelect} />
      {isPending && 'loading...'}
      {currentLocation && <Main fetchData={fetchData} currentLocation={currentLocation} API_KEY={API_KEY} API_URL={API_URL} isPending={isPending} setIsPending={setIsPending} />}
    </div>
  )
}

export default App;

