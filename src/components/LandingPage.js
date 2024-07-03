import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <h1>Priya's Activity-2 GCP application</h1>
            <div className="button-container">
                <div className="button-section">
                    <Link to="/registration">
                        <button className="signup-button">Sign Up</button>
                    </Link>
                    <p>Don't have an account? Sign up here.</p>
                </div>
                <div className="button-section">
                    <Link to="/login">
                        <button className="login-button">Login</button>
                    </Link>
                    <p>Already have an account? Login here.</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
