import { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Routes } from 'react-router-dom';

//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// TODO: Create modules like this in the future
//import components
/* import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Footer from './components/Footer'; */
import Home from './pages/Home';
import Signup from './pages/Signup';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//import logo
//import logo from './logo.svg';
import './App.css';


export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} /> {/* Handles unmatched routes */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}