import React, { useCallback, useContext, useEffect, useState } from 'react';
import SignupContext from '../signupContext';
import OtpVerify from '../../components/auth/OtpInput';

/**
 * Signup screen to input otp to verify the received guardian email
 */
function GuardianEmailOtp({ setValidator }) {
    const { guardianData, updatePageState } = useContext(SignupContext);
    const [valid, setValid] = useState(false);
    const [callBack, setCallBack] = useState(() => { return false });

    /**
     * Run the validator function received from the 
     * Signup parent component on clicking the next button.
     * Causes child component to set the value of valid based on its respective validation.
     */
    const handleNext = useCallback(() => {
        callBack(setValid);
    }, [callBack]);

    /**
     *  Sets the value of pageState.proceed, which determines if next screen may be displayed.
     */
    useEffect(() => {
        updatePageState({ proceed: valid });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valid]);
    
    /**
     * Sets the callBack handleNext() as the setValidator function in parent Signup page 
     */
    useEffect(() => {
        setValidator(() => handleNext);
    }, [setValidator, handleNext]);

    return (
        <div>
            <h1>Guardian Information</h1>
            <h1>OTP Verification</h1>
            <h4>OTP for {guardianData.email}</h4>
            <OtpVerify {...{ setCallBack }} />
        </div>
    );
}

export default GuardianEmailOtp;
