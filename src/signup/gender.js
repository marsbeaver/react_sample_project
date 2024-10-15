import React, { useCallback, useContext, useEffect, useState } from 'react';
import SignupContext from './signupContext';
import GenderComponent from '../components/auth/genderComponent';

/**
 * Signup screen to input gender of user
 */
function Gender({ setValidator }) {
    const { updateFormData, updatePageState } = useContext(SignupContext);
    const [gender, setGender] = useState('');
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
     *  Sets the value of gender received from child component and
     *  pageState.proceed, which determines if next screen may be displayed.
     */
    useEffect(() => {
        if (valid) {
            updateFormData({ gender: gender });
        }
        updatePageState({ proceed: valid });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gender, valid]);

    /**
     * Sets the callBack handleNext() as the setValidator function in parent Signup page 
     */
    useEffect(() => {
        setValidator(() => handleNext);
    }, [setValidator, handleNext]);

    return (
        <div>
            <h1>Gender</h1>
            <br />
            <GenderComponent {...{ gender, setGender, setCallBack }} />
        </div>
    );
}

export default Gender;