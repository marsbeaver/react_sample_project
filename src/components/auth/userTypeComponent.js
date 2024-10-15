import React, { useCallback, useEffect, useState } from 'react';

/**
* Component to input user type as radio options
*/
function UserTypeComponent({ userType, setUserType, setCallBack }) {
    const [errorFlash, setErrorFlash] = useState('');

    /**
    * Validates the input upon clicking next button in the Signup parent page
    * and sets the values of valid as true or false
    */
    const callBack = useCallback((setValid) => {
        setValid(() => {
            if (userType === '') {
                setErrorFlash('Please select an option');
            }
            return userType !== '';
        });
    }, [userType]);

    /**
    * Sets the callBack() as the setCallBack function in parent userType page 
    */
    useEffect(() => {
        setCallBack(() => callBack);
    }, [callBack, setCallBack]);

    return (
        <div>
            <form onChange={(e) => { setUserType(e.target.value); }}>
                <input type="radio" id="student" name="userType" value="student" />
                <label htmlFor="student">Student</label><br></br>
                <br />
                <input type="radio" id="teacher" name="userType" value="teacher" />
                <label htmlFor="teacher">Teacher</label><br></br>
            </form>
            <br />
            <p>{errorFlash}</p>
        </div>
    );
}

export default UserTypeComponent;