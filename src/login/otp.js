import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpVerify from '../components/auth/OtpInput';
import LoginContext from './loginContext';
import { getOtp, login } from '../services/login';

function Otp() {
    const navigate = useNavigate();
    const { formData, updatePageState } = useContext(LoginContext);
    const [valid, setValid] = useState(false);
    const [callBack, setCallBack] = useState(() => { return false });

    const handleBack = () => {
        // Navigate to the previous page
        updatePageState({ screen: 'email' });
    };

    useEffect(() => {
        getOtp({ "email": formData.email });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNext = () => {
        callBack(setValid);
    };

    useEffect(() => {
        if (valid) {
            // Navigate to the next page only if OTP is valid
            login({ "email": formData.email });
            navigate('/dashboard');
        }
    }, [formData.email, navigate, valid]);

    return (
        <div>
            <h1>OTP Verification</h1>
            <h4>OTP for {formData.email}</h4>
            <OtpVerify {...{ valid, setValid, setCallBack }} />
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
}

export default Otp;
