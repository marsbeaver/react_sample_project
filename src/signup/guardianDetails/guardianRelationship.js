import React, { useCallback, useContext, useEffect, useState } from 'react';
import SignupContext from '../signupContext';
import RelationshipComponent from '../../components/auth/relationshipComponent';

/**
 * Signup screen to input relationship of user to guardian
 */
const Relationship = ({ setValidator }) => {
    const { updateGuardianData, updatePageState } = useContext(SignupContext);
    const [relationship, setRelationship] = useState('');
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
     *  Sets the value of relationship received from child component and
     *  pageState.proceed, which determines if next screen may be displayed.
     */
    useEffect(() => {
        if (valid) {
            updateGuardianData({ relationship: relationship });
        }
        updatePageState({ proceed: valid });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [relationship, valid]);

    /**
     * Sets the callBack handleNext() as the setValidator function in parent Signup page 
     */
    useEffect(() => {
        setValidator(() => handleNext);
    }, [setValidator, handleNext]);

    return (
        <div>
            <h1>Guardian Information</h1>
            <h1>Guardian Relationship</h1>
            <br />
            <RelationshipComponent {...{ relationship, setRelationship, setCallBack }} />
        </div>
    );
}

export default Relationship;