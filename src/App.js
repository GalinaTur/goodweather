import './App.scss';
import { createHashRouter, createRoutesFromElements, RouterProvider, Route, Navigate } from 'react-router-dom';
import Root from './components/Root';
import HomeBlock from './components/Main/HomeBlock/HomeBlock';
import ExtendedBlock from './components/Main/ExtendedBlock/ExtendedBlock';
import ExtendedTable from './components/Main/ExtendedBlock/ExtendedTable/ExtendedTable';

const router = createHashRouter(createRoutesFromElements(
  <Route path="/" element={<Root />} >
    <Route index elemement={<Navigate to='main/:cityId' replace />} />
    <Route path='main/:cityId?' element={<HomeBlock />} />
    <Route path='details/:cityId' element={<ExtendedBlock />} >
      <Route path=':day/:time?' element={<ExtendedTable />} />
      <Route path='today/:time?' element={<ExtendedTable />} />
    </Route>
  </Route>
));

function App() {

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App;

