import React, { useCallback, useContext, useEffect, useState } from 'react';
import SignupContext from './signupContext';
import MobileInput from '../components/auth/MobileInput';

/**
 * Signup screen to input mobile number of user
 */
function Mobile({ setValidator }) {
    const { updateFormData, updatePageState } = useContext(SignupContext);
    const [mobile, setMobile] = useState('');
    const [valid, setValid] = useState('');
    const [callBack, setCallBack] = useState(false);

    /**
     * Run the validator function received from the 
     * Signup parent component on clicking the next button.
     * Causes child component to set the value of valid based on its respective validation.
     */
    const handleNext = useCallback(() => {
        callBack(setValid);
    }, [callBack]);

    /**
     *  Sets the value of mobile number received from child component and
     *  pageState.proceed, which determines if next screen may be displayed.
     */
    useEffect(() => {
        if (valid) {
            updateFormData({ mobile: mobile });
        }
        updatePageState({ proceed: valid });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valid, mobile]);

    /**
     * Sets the callBack handleNext() as the setValidator function in parent Signup page 
     */
    useEffect(() => {
        setValidator(() => handleNext);
    }, [setValidator, handleNext]);

    return (
        <div>
            <h1>Mobile</h1>
            <MobileInput {...{ mobile, setMobile, valid, setValid, setCallBack }} />
        </div>
    );
}
export default Mobile;