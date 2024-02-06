import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleLogin = () => {
    loginWithRedirect();
  };

const startGame = () => {
    window.open('http://localhost:3000/vanilla/index.html', '_blank');
  };
  useEffect(() => {
    if (isAuthenticated) {
     navigate('/game'); // Redirect to the "/game" route when authenticated
    }
  }, [isAuthenticated, navigate]);

  return (
    !isAuthenticated && (
        <div className="login-page">
      <button className="login" onClick={handleLogin}>
        Log In
      </button>
      <button className='guest' onClick={startGame}>Start as guest</button>
      </div>
    )
  
  );
};

export default LoginButton;
