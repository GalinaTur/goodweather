import { useState, useEffect, useRef } from 'react';
import { useFetch } from '../useFetch';
import { useLocation } from 'react-router-dom';
import Header from './Header/Header';
import Main from './Main/Main';
import Modal from './Modal/Modal';
import Error from './Error/Error';

const API_URL = {
  weather: "https://api.openweathermap.org/data/2.5/weather?",
  forecast: "https://api.openweathermap.org/data/2.5/forecast?",
  locationDir: "http://api.openweathermap.org/geo/1.0/direct?",
  locationRev: "https://api.openweathermap.org/geo/1.0/reverse?",
  airPollution: "http://api.openweathermap.org/data/2.5/air_pollution?"
};

const setLocationText = (location, isPending) => {
  const city = location?.[0]['name'];
  const state = location?.[0]['state'] || '';
  const country = location?.[0]['country'];
  const locationText = location && `${city}${state ? ', ' + state : ''}${country ? ', ' + country : ''}`;

  if (locationText) {
    return locationText;
  } else if (isPending) {
    return 'Loading...';
  } else if (!isPending) {
    return 'No location';
  }
}

export default function Root() {
  const [coords, setCoords] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const input = useRef(null);
  const modal = useRef(null);
  const modalWindow = useRef(null);
  const menuBtn = useRef(null);
  const closeModalBtn = useRef(null);
  const urlLocation = useLocation();

  const params = coords && new URLSearchParams({
    lat: coords.latitude,
    lon: coords.longitude,
    limit: 1,
    appid: process.env.REACT_APP_API_KEY,
  })

const handleError = (err) => {
  setError(err);
}

const handlePending = (ispending) => {
  setIsPending(ispending);
}

  const [currentLocation, fetchLocation] = useFetch(API_URL.locationRev, params, handleError, handlePending);

const getLocation = () => {
  navigator.geolocation?.getCurrentPosition((pos => {
    setCoords(pos.coords);
  }), 
  (err => {
    setError(err);
    setIsPending(false);
  }));
}

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const viewport = document.querySelector("meta[name=viewport]");
    const onOrientationChange = () => {
      if (window.screen.orientation.type === 'landscape-primary') {
        viewport.setAttribute("content", viewport.content + ", height=" + document.body.clientHeight);
        viewport.setAttribute("content", viewport.content + ", width=" + window.innerWidth);
      } else if (window.screen.orientation.type === 'portrait-primary') {
        viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
        viewport.setAttribute("content", viewport.content + ", width=" + window.innerWidth);
      }
    }
    window.screen.orientation.addEventListener('change', onOrientationChange);

    return window.screen.orientation.removeEventListener('change', onOrientationChange);
  }, [window.screen.orientation.type])

  const handleChangeLocation = async (location) => {
    const params = new URLSearchParams({
      q: [...location],
      limit: 1,
      appid: process.env.REACT_APP_API_KEY
    })
    fetchLocation(API_URL.locationDir + params.toString());
    setCoords(null)
  }

  const handleModalOpen = (e) => {
    if (e.currentTarget === menuBtn.current) {
      setActiveModal('menu');
    }
    document.body.classList.add('modalOpen');
  }

  const handleModalClose = (e) => {
    if (e && e.target !== modal.current && e.target !== closeModalBtn.current) {
      return;
    } else setActiveModal(null);
    document.body.classList.remove('modalOpen');
  }

  useEffect(() => {
    handleModalClose();
  }, [urlLocation]);

  useEffect(() => {
    if (!error) {
      setActiveModal('');
    } else {
    setActiveModal('disabled');
    }
  }, [error])

  return (
    <>
      <Header locationText={setLocationText(currentLocation, isPending)} handleChangeLocation={handleChangeLocation} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} API_URL={API_URL} inputRef={input} menuBtnRef={menuBtn} activeModal={activeModal}/>
      {error && <Error error={error} />}
      {currentLocation && <Main currentLocation={currentLocation} API_URL={API_URL} handleError={handleError} handlePending={handlePending}/>}
      <Modal modalRef={modal} modalWindowRef={modalWindow} closeModalBtnRef={closeModalBtn} activeModal={activeModal} handleModalClose={handleModalClose} />
    </>
  )
}
