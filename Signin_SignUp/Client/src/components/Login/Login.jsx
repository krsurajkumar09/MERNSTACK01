import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to track password visibility
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            if (response.status === 200) {
                onLogin();
                navigate('/'); // Redirect to home after successful login
            }
        } catch (error) {
            setError(error.response?.data || 'Error logging in');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle password visibility state
    };

    return (
        <div className='wrapper'>
            <div className='form-box'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type='email'
                            name='email'
                            placeholder='Email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <FaEnvelope className='icon' />
                    </div>
                    <div className="input-box">
                        <input
                            type={showPassword ? "text" : "password"} // Dynamically set the input type
                            name='password'
                            placeholder='Password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <span className="icon" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEye /> : <FaEyeSlash />}   </span>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an account?&nbsp;&nbsp;<Link to="/signup">Sign up</Link></p>
                    </div>
                </form>
                {error && <div className="message error">{error}</div>}
            </div>
        </div>
    );
};

export default Login;
