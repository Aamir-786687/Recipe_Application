import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Recipes from './pages/Recipes';
import Register from './pages/Register';
import Login from './pages/Login';
import Footer from './pages/Footer';
// import Navbar from "./Components/Navbar";
import Navbarrr from './Components/Navbarrr';


const App = () => {
  return (
    <div>
      <Navbarrr />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
