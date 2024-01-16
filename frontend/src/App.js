import { useState } from 'react';
import { useEffect} from 'react';import 
{ BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// TODO: Create modules like this in the future
//import components
/* import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Footer from './components/Footer'; */
import Home from './pages/Home';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//import logo
import logo from './logo.svg';
import './App.css';


export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}
