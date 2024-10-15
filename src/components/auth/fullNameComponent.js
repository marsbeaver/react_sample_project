import React, { useCallback, useEffect, useState } from 'react';
import { validateName } from '../../utils/validators';

/**
* Component to input user type as radio options
*/
function FullNameComponent({ firstName, lastName, setFirstName, setLastName, setCallBack }) {
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');

    /**
    * Validates the input upon clicking next button in the Signup parent page
    * and sets the values of valid as true or false
    */
    const callBack = useCallback((setValid) => {
        setValid(validateName(firstName, lastName, setFirstNameError, setLastNameError));
    }, [firstName, lastName]);

    /**
    * Sets the callBack() as the setCallBack function in parent fullName page 
    */
    useEffect(() => {
        setCallBack(() => callBack);
    }, [callBack, setCallBack]);


    return (
        <>
            <label htmlFor="firstName">First Name:</label>
            <input
                id="firstName"
                type="text"
                onChange={(e) => { setFirstName(e.target.value) }}
                placeholder="First name"
            />
            {firstNameError && <p>{firstNameError}</p>}
            <br />
            <label htmlFor="lastName">Last Name:</label>
            <input
                id="lastName"
                type="text"
                onChange={(e) => { setLastName(e.target.value) }}
                placeholder="Last name"
            />
            {lastNameError && <p>{lastNameError}</p>}
            <br />
        </>
    );
}

export default FullNameComponent;
