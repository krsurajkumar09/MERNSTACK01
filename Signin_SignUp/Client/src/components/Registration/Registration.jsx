import React, { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import axios from 'axios';
import "./Registration.css";

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError('');
                setSuccess('');
            }, 10000); // 10 seconds

            return () => clearTimeout(timer); // Cleanup timer on component unmount
        }
    }, [error, success]);

    const handleChange = () => {
        if (error || success) {
            setError('');
            setSuccess('');
        }
    };

    const handlePassword = (e) => {
        const newPassword = e.target.value;

        // Regular expressions for password validation
        const hasCapital = /[A-Z]/.test(newPassword);
        const hasNumber = /[0-9]/.test(newPassword);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

        // Check if all conditions are met
        const isValidPassword = newPassword.length >= 6 && hasCapital && hasNumber && hasSpecialChar;

        // Update state and error message accordingly
        setPassword(newPassword);
        setError(isValidPassword ? '' : 'Password must be at least 6 characters long and contain at least one capital letter, one number, and one special character.');
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Invalid email format');
            return;
        }

        const user = { name, email, password };
        try {
            const response = await axios.post('http://localhost:3001/register', user);
            console.log('Response Data:', response.data);
            console.log('User:', user);
            console.log('Status Code:', response.status);

            setSuccess(response.data);
            setError(''); // Clear any existing error

            // Optionally reset the form fields
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            setSuccess('');
            setError(error.response?.data || 'Error creating user');
            if (error.response) {
                console.error('Status Code:', error.response.status);
                console.error('Response Data:', error.response.data);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    return (
        <div className='wrapper'>
            <div className='form-box'>
                <form onSubmit={handleSubmit}>
                    <h1>Create Your Account</h1>
                    <div className="input-box">
                        <input type="text"
                            name='name'
                            placeholder='Name'
                            autoComplete='off'
                            required
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                handleChange();
                            }} />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input type='email'
                            name='email'
                            placeholder='Email'
                            autoComplete='off'
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                handleChange();
                            }}
                        />
                        <FaEnvelope className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password"
                            placeholder='Password'
                            name='password'
                            autoComplete='off'
                            required
                            value={password}
                            onChange={(e) => {
                                // setPassword(e.target.value);
                                handleChange();
                                handlePassword(e);
                            }}
                            title="Password should contain at least 6 characters, one symbol, one capital letter, and one number."
                        />
                        <FaLock className='icon' />
                    </div>
                    <div className="remember-password">
                        <label><input type="checkbox" required />I agree to the terms & conditions</label>
                    </div>
                    <button type="submit">Register</button>
                    <div className="register-link">
                        <p>Already have an account?&nbsp;&nbsp;<Link to="/login">Login</Link></p>
                    </div>
                </form>
                {error && <div className="message error">{error}</div>}
                {success && <div className="message success">{success}</div>}
            </div>
        </div>
    )
}

export default Registration;
