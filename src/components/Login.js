import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('https://us-central1-csci-5411.cloudfunctions.net/user-details', {
                params: {
                    username: username
                }
            });
            if (response.status === 200) {
                const userData = response.data;
                if (userData.password === password) {
                    localStorage.setItem('username', username);
                    navigate('/home');
                } else {
                    setError('Incorrect password. Please try again.');
                }
            }
        } catch (error) {
            if (error.message === "Request failed with status code 404") {
                setError('User not found. Please register first.');
            }
        }
    };

    return (
        <div className="Login-container">
            <h2>Login</h2>
            <form className="Login-form" onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="message">{error}</p>}
                {error && error.includes('Please register') && (
                    <p className="message">
                        <a href="/" style={{ color: 'white' }}>Register</a>
                    </p>
                )}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
