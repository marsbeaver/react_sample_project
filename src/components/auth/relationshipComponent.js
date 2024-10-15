import React, { useCallback, useEffect, useState } from 'react';

/**
* Component to input the relationship of the guardian to the user
*/
const RelationshipComponent = ({ relationship, setRelationship, setCallBack }) => {
    const [errorFlash, setErrorFlash] = useState('');

    /**
    * Validates the input upon clicking next button in the Signup parent page
    * and sets the values of valid as true or false.
    * Also sets error message if nothing is selected.
    */
    const callBack = useCallback((setValid) => {
        setValid(() => {
            if (relationship === '') {
                setErrorFlash('Please select an option');
            }
            return relationship !== '';
        });
    }, [relationship]);

    /**
    * Sets the callBack() as the setCallBack function in parent userType page 
    */
    useEffect(() => {
        setCallBack(() => callBack);
    }, [callBack, setCallBack]);

    /**
    * Sets the selected option as relationship
    */
    const handleChange = (e) => {
        setRelationship(e.target.value);
    };

    return (
        <div>
            <label htmlFor="relationship">Guardian Relationship:</label>
            <select id="relationship" value={relationship} onChange={handleChange}>
                <option value="">Select relationship</option>
                <option value="parent">Parent</option>
                <option value="stepparent">Stepparent</option>
                <option value="guardian">Guardian</option>
                <option value="grandparent">Grandparent</option>
                <option value="sibling">Sibling</option>
                <option value="other">Other</option>
            </select>
            <p>{errorFlash}</p>
        </div>
    );
}

export default RelationshipComponent;
