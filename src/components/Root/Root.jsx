import { useState, useEffect, useRef } from 'react';
import { createHashRouter, createRoutesFromElements, RouterProvider, HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import { useFetch } from '../../useFetch';
import Modal from '../Modal/Modal';

const API_URL = {
  weather: "https://api.openweathermap.org/data/2.5/weather?",
  forecast: "https://api.openweathermap.org/data/2.5/forecast?",
  locationDir: "http://api.openweathermap.org/geo/1.0/direct?",
  locationRev: "https://api.openweathermap.org/geo/1.0/reverse?",
  airPollution: "http://api.openweathermap.org/data/2.5/air_pollution?"
};

const viewport = document.querySelector("meta[name=viewport]");

export default function Root() {
  const [coords, setCoords] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const input = useRef(null);
  const modal = useRef(null);
  const modalWindow = useRef(null);
  const menuBtn = useRef(null);
  const closeModalBtn = useRef(null);

  const params = coords && new URLSearchParams({
    lat: coords.latitude,
    lon: coords.longitude,
    limit: 1,
    appid: process.env.REACT_APP_API_KEY,
  })
  const [currentLocation, isPending, error, fetchLocation] = useFetch(API_URL.locationRev, params);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(pos => {
      setCoords(pos.coords)
    });
  }, []);

  useEffect(() => {
    const onOrientationChange = () => {
      if (window.screen.orientation.type === 'landscape-primary') {
        viewport.setAttribute("content", viewport.content + ", height=" + document.body.clientHeight);
      } else if (window.screen.orientation.type === 'portrait-primary') {
        viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
      }
    }
    window.screen.orientation.addEventListener('change', onOrientationChange);

    return window.screen.orientation.removeEventListener('change', onOrientationChange);
  })

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
  }

  const handleModalClose = (e) => {
    if (e.target !== modal.current && e.target !== closeModalBtn.current) {
      return;
    } else setActiveModal(null);
  }

  return (
    <>
          <Header currentLocation={currentLocation} handleChangeLocation={handleChangeLocation} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} API_URL={API_URL} inputRef={input} menuBtnRef={menuBtn} activeModal={activeModal} />
          {isPending && 'loading...'}
          {currentLocation && <Main currentLocation={currentLocation} API_URL={API_URL} />}
          <Modal modalRef={modal} modalWindowRef={modalWindow} closeModalBtnRef={closeModalBtn} activeModal={activeModal} handleModalClose={handleModalClose} />
          </>
  )
}

