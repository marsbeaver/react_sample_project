import React, { useCallback, useContext, useEffect, useState } from 'react';
import DateOfBirthComponent from '../components/auth/dateOfBirthComponent';
import SignupContext from './signupContext';

/**
 * Signup screen to input date of birth
 */
function DateOfBirth({ setValidator }) {
    const { updateFormData, updatePageState } = useContext(SignupContext);
    const [dob, setDob] = useState('');
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
    *  Sets the value of date of birth received from child component and
    *  pageState.proceed, which determines if next screen may be displayed.
    */
    useEffect(() => {
        if (valid) {
            updateFormData({ dob: dob });
        }
        updatePageState({ proceed: valid });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dob, valid]);

    /**
     * Sets the callBack handleNext() as the setValidator function in parent Signup page 
     */
    useEffect(() => {
        setValidator(() => handleNext);
    }, [setValidator, handleNext]);

    return (
        <div>
            <h1>Date of Birth</h1>
            <DateOfBirthComponent {...{ dob, setDob, setValid, setCallBack }} />
        </div>
    );
}

export default DateOfBirth;