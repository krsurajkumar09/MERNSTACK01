import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { googleAuth } from '../api/api.js';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      console.log(authResult);
      if (authResult['code']) {
        const result = await googleAuth(authResult['code']);
        console.log(result);
        
        // Extract user data
        const { email, name, image } = result.data.user;
        const token = result.data.token;

        // Save user data to local storage, including email
        const obj = { email, name, image, token };
        localStorage.setItem('user-info', JSON.stringify(obj));

        // Debugging logs
        console.log('result.data.user---', result.data.user);
        
        // Navigate to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error while requesting google code:', error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
  });

  return (
    <>
      <button onClick={googleLogin}>
        Login With Google
      </button>
    </>
  );
};

export default GoogleLogin;
