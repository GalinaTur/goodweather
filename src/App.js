import './App.scss';
import { useState, useEffect, useRef } from 'react';
import { createHashRouter, createRoutesFromElements, RouterProvider, HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { useFetch } from './useFetch';
import Modal from './components/Modal/Modal';
import Root from './components/Root/Root';

// const router = createHashRouter(createRoutesFromElements(
//   <Route path="/" element={<Root />} >
//   </Route>
// ));


function App() {
  return (
    <Router>
    <Root/>
    </Router>
  )
}

export default App;

