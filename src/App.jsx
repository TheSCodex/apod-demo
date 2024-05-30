import { useState } from 'react'
import { useRoutes, BrowserRouter as Router } from 'react-router-dom';

//PAGES
import Home from './pages/Home.jsx';
import Info from './pages/Info.jsx';


const AppRoutes = () => {
  let routes = useRoutes([
    {path: "/", element: <Home />},
    {path: "/day/:date", element:<Info />},
  ]);

  return routes;

};

function App() {

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
