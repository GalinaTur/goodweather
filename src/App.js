import './App.scss';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { useFetch } from './useFetch';

const API_URL = {
  weather: "https://api.openweathermap.org/data/2.5/weather?",
  forecast: "https://api.openweathermap.org/data/2.5/forecast?",
  locationDir: "http://api.openweathermap.org/geo/1.0/direct?",
  locationRev: "https://api.openweathermap.org/geo/1.0/reverse?",
  airPollution: "http://api.openweathermap.org/data/2.5/air_pollution?"
};

function App() {
  const [coords, setCoords] = useState(null);

  const params = coords && new URLSearchParams({
    lat: coords.latitude,
    lon: coords.longitude,
    limit: 1,
    appid: process.env.REACT_APP_API_KEY,
})
  const [currentLocation, isPending, error, fetchLocation] = useFetch(API_URL.locationRev, params);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(pos => {
      setCoords(pos.coords)});
    }, []);

  const handleSelect = async (item) => {
    let locationArr = item.split(', ');
    if (locationArr.length === 2) locationArr.splice(1, 0, '');
    const params = new URLSearchParams({
      q: [...locationArr],
      limit: 1,
      appid: process.env.API_KEY
    })

    fetchLocation(API_URL.locationDir + params.toString());
    setCoords(null);
  }

  return (
    <div className="App" style={{height: window.innerHeight}}>
      <Header currentLocation={currentLocation}  handleSelect={handleSelect} API_URL={API_URL}/>
      {isPending && 'loading...'}
      {currentLocation && <Main currentLocation={currentLocation} API_URL={API_URL}/>}
    </div>
  )
}

export default App;

