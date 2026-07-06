import React from 'react';
import "./App.css"; 
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
// import Home from './pages/Home';


function App() {
  return (
    <div>
      <Navbar/>
      <AppRoutes/>
      {/* <Home/> */}
   
    </div>
  )
}

export default App