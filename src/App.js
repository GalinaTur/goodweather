import './App.scss';
import { createHashRouter, createRoutesFromElements, RouterProvider, Route, Navigate } from 'react-router-dom';
import Root from './components/Root';
import HomePage from './components/Main/HomePage/HomePage';
import DetailsPage from './components/Main/DetailsPage/DetailsPage';
import ExtendedTable from './components/Main/ExtendedTable/ExtendedTable';
import AqiPage from './components/Main/AqiPage/AqiPage';
import About from './components/Main/About/About';

const router = createHashRouter(createRoutesFromElements(
    <Route path="/:cityId?" element={<Root />} >
      <Route path='main/' element={<HomePage />} />
      <Route path='details/' element={<DetailsPage />} >
        <Route path=':day/:time?' element={<ExtendedTable />} />
        <Route path='today/:time?' element={<ExtendedTable />} />
      </Route>
      <Route path='aqi' element={<AqiPage />} />
      <Route path='about' element={<About />} />
      <Route index element={<ExtendedTable />} />
    </Route>
));

function App() {

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App;

