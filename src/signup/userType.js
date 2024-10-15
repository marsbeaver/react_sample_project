import React, { useCallback, useContext, useEffect, useState } from 'react';
import SignupContext from './signupContext';
import UserTypeComponent from '../components/auth/userTypeComponent';

/**
 * Signup screen to input type of user
 */
function UserType({ setValidator }) {
    const { updateFormData, updatePageState } = useContext(SignupContext);
    const [userType, setUserType] = useState('');
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
     *  Sets the value of User Type received from child component and
     *  pageState.proceed, which determines if next screen may be displayed.
     */
    useEffect(() => {
        if (valid) {
            updateFormData({ userType: userType });
        }
        updatePageState({ proceed: valid });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userType, valid]);

    /**
     * Sets the callBack handleNext() as the setValidator function in parent Signup page 
     */
    useEffect(() => {
        setValidator(() => handleNext);
    }, [setValidator, handleNext]);

    return (
        <div>
            <h1>User Type</h1>
            <br />
            <UserTypeComponent {...{ userType, setUserType, setCallBack }} />
        </div>
    );
}

export default UserType;