import React, { useContext, useState } from 'react';
import LoginContext from './loginContext';
import { useNavigate } from 'react-router-dom';
function Email() {
    const navigate = useNavigate();
    const { updateFormData, updatePageState } = useContext(LoginContext);
    const [userData, setUserData] = useState('');
    const [valid, setvalid] = useState('');

    const validate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(/[a-zA-Z]/.test(userData)){
            if (!emailRegex.test(userData)) {
                setvalid('Please enter a valid email or mobile number');
                return false;
            } else {
                setvalid('');
                return true;
            }
        }else{
            if (userData.length!==10) {
                setvalid('Please enter a valid email or mobile number');
                return false;
            } else {
                setvalid('');
                return true;
            }
        }
    }

    const handleChange = (e) => {
        setUserData(e.target.value);
    }
    const handleBack = (e) => {
        navigate('/');
    }
    const handleNext = (e) => {
        if (validate()) {
            updateFormData({ email: userData });
            updatePageState({ screen: 'otp' });
        }
    }
    return (
        <div>
            <h1>Enter email or mobile number</h1>
            <label htmlFor="email">Email or mobile: </label>
            <input id="email" type="email" onChange={handleChange} placeholder='Email/Mobile' />
            <p>{valid}</p>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
}
export default Email;