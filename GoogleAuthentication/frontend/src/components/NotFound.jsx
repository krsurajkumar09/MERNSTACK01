import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 >Error 404: Not Found</h1>
      <div>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </>

  )
}

export default NotFound;