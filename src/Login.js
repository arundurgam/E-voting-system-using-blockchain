import React, { useState } from 'react';
import axios from 'axios';
import image from './aadhaar.png';
import './login.css';
import ResultPage from './ResultPage';

const Login = ({ onLogin }) => {
    const [aadhar, setAadhar] = useState('');

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:3110/login', { aadhar });
            const { has_voted } = response.data;
            onLogin(aadhar, has_voted);
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div className='a'>
            <div className='image-container'>
                <img src={image} alt="Aadhaar" className='logo' /> 
            </div>

            <div>
                <h2 className='login-head'>Login Page</h2>
                <input
                    type="number"
                    placeholder="Aadhar Number"
                    value={aadhar}
                    onChange={(e) => setAadhar(e.target.value)}
                    className='input-ele'
                />
                <br />
                <div className='button-container'>
                    <button onClick={login} className='button'>Login</button>
                </div>
            </div>
            <br />
            <br />
        </div>
    );
};

export default Login;

