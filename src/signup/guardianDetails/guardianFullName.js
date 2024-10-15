import React, { useCallback, useContext, useEffect, useState } from 'react';
import SignupContext from '../signupContext';
import FullNameComponent from '../../components/auth/fullNameComponent';

/**
 * Signup screen to input first and last name of guardian
 */
function GuardianFullName({ setValidator }) {
    const { updateGuardianData, updatePageState } = useContext(SignupContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [valid, setValid] = useState(false);
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
     *  Sets the value of first name and last name received from child component and
     *  pageState.proceed, which determines if next screen may be displayed.
     */
    useEffect(() => {
        if (valid) {
            updateGuardianData({ firstName: firstName, lastName: lastName });
        }
        updatePageState({ proceed: valid });
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valid, firstName, lastName]);

    /**
     * Sets the callBack handleNext() as the setValidator function in parent Signup page 
     */
    useEffect(() => {
        setValidator(() => handleNext);
    }, [setValidator, handleNext]);

    return (
        <div>
            <h1>Guardian Information</h1>
            <h1>Full Name</h1>
            <FullNameComponent {...{ setFirstName, setLastName, firstName, lastName, setCallBack }} />

        </div>
    );
}

export default GuardianFullName;
