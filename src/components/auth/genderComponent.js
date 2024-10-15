import React, { useCallback, useEffect, useState } from 'react';

/**
* Component to input gender as radio options
*/
function GenderComponent({ gender, setGender, setCallBack }) {
    const [errorFlash, setErrorFlash] = useState('');

    /**
    * Validates the input upon clicking next button in the Signup parent page
    * and sets the values of valid as true or false
    */
    const callBack = useCallback((setValid) => {
        setValid(() => {
            if (gender === '') {
                setErrorFlash('Please select an option');
            }
            return gender !== '';
        });
    }, [gender]);

    /**
    * Sets the callBack() as the setCallBack function in parent gender page 
    */
    useEffect(() => {
        setCallBack(() => callBack);
    }, [callBack, setCallBack]);

    return (
        <div>
            <form onChange={(e) => { setGender(e.target.value); }}>
                <input type="radio" id="male" name="gender" value="male" />
                <label htmlFor="male">Male</label><br></br>
                <br />
                <input type="radio" id="female" name="gender" value="female" />
                <label htmlFor="female">Female</label><br></br>
            </form>
            <br />
            <p>{errorFlash}</p>
        </div>
    );
}

export default GenderComponent;