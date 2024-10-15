import React, { useCallback, useContext, useEffect, useState } from 'react';
import SignupContext from './signupContext';
import EmailInput from '../components/auth/EmailInput';

/**
 * Signup screen to input email id of user
 */
function Email({ setValidator }) {
    const { updateFormData, updatePageState } = useContext(SignupContext);
    const [email, setEmail] = useState('');
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
     *  Sets the value of email received from child component and
     *  pageState.proceed, which determines if next screen may be displayed.
     */
    useEffect(() => {
        if (valid) {
            updateFormData({ email: email });
        }
        updatePageState({ proceed: valid });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valid, email]);

    /**
     * Sets the callBack handleNext() as the setValidator function in parent Signup page 
     */
    useEffect(() => {
        setValidator(() => handleNext);
    }, [setValidator, handleNext]);

    return (
        <div>
            <h1>Email</h1>
            <EmailInput {...{ setEmail, email, valid, setValid, setCallBack }} />

        </div>
    );
}
export default Email;