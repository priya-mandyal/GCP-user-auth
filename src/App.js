import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration';
import RegistrationSuccess from './components/RegistrationSuccess';
import Login from './components/Login';
import Home from './components/Home';
import Images from './components/Images';
import LandingPage from './components/LandingPage';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Router>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/registration-success/:username" element={<RegistrationSuccess />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/images" element={<Images />} />
                        <Route path="/" element={<LandingPage />} />
                    </Routes>
                </Router>
            </header>
        </div>
    );
}

export default App;
