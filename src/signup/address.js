import React, { useEffect, useCallback, useContext, useState } from 'react';
import SignupContext from './signupContext';
import AddressComponent from '../components/auth/addressComponent';

/**
 * Signup screen to input address
 */
function Address({ setValidator }) {
    const { updateFormData, updatePageState } = useContext(SignupContext);
    const [address, setAddress] = useState('');
    const [valid, setValid] = useState(false);
    const [proceed, setProceed] = useState(false);
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
     *  Sets the value of address received from child component and
     *  pageState.proceed, which determines if next screen may be displayed.
     */
    useEffect(() => {
        if (valid) {
            updatePageState({ proceed: true });
            updateFormData({ address: address });
        }
        else {
            updatePageState({ proceed: false });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valid, address]);

     /**
     * Sets the callBack handleNext() as the setValidator function in parent Signup page 
     */
    useEffect(() => {
        setValidator(() => handleNext);
    }, [setValidator, handleNext]);

    return (
        <div>
            <h1>Address</h1>
            <AddressComponent {...{ address, setValid, setAddress, setProceed, proceed, setCallBack }} />
            <br />

        </div>
    );
}
export default Address;