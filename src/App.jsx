import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Recipes from './pages/Recipes';
import Register from './pages/Register';
import Login from './pages/Login';
import Footer from './pages/Footer';
import Navbarrr from './Components/Navbarrr';

const App = () => {
  return (
    <Router>
      <Navbarrr />
      <Routes>
        {/* <Route path="/" element={<Navigate to="/home" />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
