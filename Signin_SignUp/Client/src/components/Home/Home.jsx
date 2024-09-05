import React from 'react';

const Home = ({ onLogout }) => {
    return (
        <div style={{ position: "absolute", top: "50px", left: "50%", transform: "translateX(-50%)", textAlign: "center", color: "white" }}>
            <h1>Welcome to the Home Page</h1>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
};

export default Home;
