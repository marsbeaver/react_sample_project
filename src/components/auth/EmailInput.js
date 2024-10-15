import React, { useCallback, useEffect, useState } from 'react';
import { validateEmail } from '../../utils/validators';

/**
* Component to input user email id 
*/
function EmailInput(props) {
    const { setCallBack, setEmail, email } = props;
    const [errorFlash, setErrorFlash] = useState('');

    /**
    * Validates the input upon clicking next button in the Signup parent page
    * and sets the values of valid as true or false
    */
    const callBack = useCallback((setValid) => {
        setValid(validateEmail(email, setErrorFlash));
    }, [email]);

    /**
    * Sets the callBack() as the setCallBack function in parent email page 
    */
    useEffect(() => {
        setCallBack(() => callBack);
    }, [callBack, setCallBack]);

    /**
    * Sets the email variable when value is input
    */
    const handleChange = (e) => {
        setEmail(e.target.value);
    }
    return (
        <div>
            <label htmlFor="email">Email: </label>
            <input id="email" type="email" onChange={handleChange} placeholder='Email' />
            <p>{errorFlash}</p>
        </div>
    );
}
export default EmailInput;