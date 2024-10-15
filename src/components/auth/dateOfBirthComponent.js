import React, { useCallback, useEffect, useState } from 'react';
import { validatedob } from '../../utils/validators';

/**
* Component to input user birth date
*/
function DateOfBirthComponent(props) {
    const { setCallBack, setDob, dob } = props;
    const [errorFlash, setErrorFlash] = useState('');

    /**
    * Validates the input upon clicking next button in the Signup parent page
    * and sets the values of valid as true or false
    */
    const callBack = useCallback((setValid) => {
        setValid(validatedob(dob, setErrorFlash));
    }, [dob]);

    /**
    * Sets the callBack() as the setCallBack function in parent dateOfBirth page 
    */
    useEffect(() => {
        setCallBack(() => callBack);
    }, [callBack, setCallBack]);

    /**
    * Sets the date of birth variable when selected
    */
    const handleChange = (e) => {
        setDob(e.target.value);
    }
    return (
        <div>
            <label htmlFor="dob">Select Date: </label>
            <input id="dob" type="date" min="1940-01-01" onChange={handleChange} placeholder='Date Of Birth' />
            <p>{errorFlash}</p>
        </div>
    );
}

export default DateOfBirthComponent;