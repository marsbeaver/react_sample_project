import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import LoginContext from './loginContext';
import Email from './email';
import Otp from './otp';
function Login() {
    const { pageState } = useContext(LoginContext);
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleHome}>Home</button>

            {pageState.screen === 'email' && <Email />}
            {pageState.screen === 'otp' && <Otp />}
        </div>

    );
}

export default Login;