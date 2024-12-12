import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';
import reg from './reg.jpg';

const Registration = () => {
    const [aadhar, setAadhar] = useState('');
    const [name, setName] = useState('');

    const register = async () => {
        try {
            await axios.post('http://localhost:3110/register', { aadhar, name });
            alert('Registration successful');
        } catch (error) {
            alert('Error during registration');
        }
    };

    return (
        <div className='reg'>
        <div>
            <img src={reg} className='regimg'/>
            <h2>Register</h2>
            
            <input
                type="text"
                placeholder="Aadhar Number"
                value={aadhar}
                onChange={(e) => setAadhar(e.target.value)}
            />
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={register}>Register</button>
        </div>
        </div>
    );
};

export default Registration;
