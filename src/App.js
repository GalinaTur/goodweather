import './App.scss';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

const url = 'http://api.openweathermap.org';
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

  useEffect(() => {
    getPosition().then(pos => {
      coords = pos.coords;
      return coords;
    }).then(coords => fetch(url + `/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=1&appid=05df3968351d03d8d7668321890270e3`))
      .then(response => {
        if (!response.ok) {
          throw Error("Sorry, can't get data. Please, try later");
        }
        return response.json();
      }).then(data => {
        setIsPending(false);
        setCurrentLocation([data[0]["name"], data[0]["country"]]);
      }).catch(err => {
        setError(err.message);
      })
  }
    , []);

    //todo do smthng with header input and header loading
  return (
    <div className="App">
      <Header setCurrentLocation={setCurrentLocation} currentLocation={currentLocation} />
      <Main />
    </div>
  );
}

export default App;
