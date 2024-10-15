import React, { useCallback, useEffect, useContext, useState, useReducer } from 'react';
import SignupContext from './signupContext';

/**
 * Signup screen for user to agree to Terms and Conditions and Privacy Policy
 */
function Consent({ setValidator }) {
    const { updateFormData, updatePageState } = useContext(SignupContext);
    const [consentValid, setConsentValid] = useState('');
    const [state, dispatch] = useReducer(reducer, { terms: '',privacy:'' });

    /**
     * Reducer function to assign state values
     */
    function reducer(state, action) {
        switch (action.type) {
            case 'consent_form':
                return { ...state, [action.field]: action.payload };
            default:
                return state;
        }
    }

    /**
     * Assigns the selected value from the inputs during onChange event
     */
    const handleChange = (e) => {
        dispatch({
            type: 'consent_form',
            field: e.target.name,
            payload: e.target.checked
        });
    };

    /**
     * Checks if both conditions are checked and displays error flashes
     */
    const validateConsent = useCallback(() => {
        if (state.terms && state.privacy) {
            updateFormData({ consent: 'true' });
            setConsentValid('');
            updatePageState({ screen: 'userType', pageNum: 2 });
        } else {
            setConsentValid('Please check all fields');
        }
    }, [state.terms, state.privacy, updateFormData, updatePageState]);

    /**
     * Sets the callBack validateConsent() as the setValidator function in parent Signup page 
     */
    useEffect(() => {
        setValidator(() => validateConsent);
    }, [setValidator, validateConsent]);
    return (
        <div>
            <h1>Consent</h1>
            <label htmlFor="terms">I agree to the Terms And Conditions</label>
            <input id="terms" name="terms" type="checkbox" onChange={handleChange} />
            <br />
            <label htmlFor="privacy">I agree to the Privacy Policy</label>
            <input id="privacy" name="privacy" type="checkbox" onChange={handleChange} />
            <br />
            <p>{consentValid}</p>
        </div>
    );
}
export default Consent;