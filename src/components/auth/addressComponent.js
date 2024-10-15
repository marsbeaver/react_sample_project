import React, { useCallback, useEffect, useState } from 'react';
import { validateAddress } from '../../utils/validators';

const COUNTRIES = ['India', 'USA'];
const STATES = {
    'India': ['Delhi', 'Telangana', 'Andhra Pradesh'],
    'USA': ['Texas', 'California', 'Virginia'],
};
const CITIES = {
    'Delhi': ['New Delhi'],
    'Telangana': ['Warangal', 'Hyderabad', 'Nizamabad', 'Karimnagar'],
    'Andhra Pradesh': ['Tirupati', 'Nellore', 'Vijayawada', 'Kakinada'],
    'Texas': ['Houston', 'Dallas', 'Austin', 'Fort Worth'],
    'California': ['Los Angeles', 'San Diego', 'San Francisco', 'Oakland'],
    'Virginia': ['Richmond', 'Norfolk', 'Alexandria', 'Hampton'],
};

/**
* Component to input address of user
*/
const AddressComponent = ({ proceed, address, setValid, setAddress, setProceed, setCallBack }) => {
    const [street, setStreet] = useState('');
    const [apartment, setApartment] = useState('');
    const [country, setCountry] = useState('India');
    const [state, setState] = useState(STATES[country][0] ?? '');
    const [city, setCity] = useState(CITIES[state][0] ?? '');
    const [zip, setZip] = useState('');
    const [error, setError] = useState('');

    /**
    * Validates the input upon clicking next button in the Signup parent page
    * and sets the values of valid as true or false.
    * Also sets the value of address by concatenating all input values
    */
    const callBack = useCallback(() => {
        setValid(validateAddress(street, apartment, state, city, country, zip, setError));
        setAddress(`${street}, ${apartment}, ${state}, ${city}, ${country}, ${zip}`);

    }, [apartment, city, country, setAddress, setValid, state, street, zip]);

    /**
    * Sets the callBack() as the setCallBack function in parent address page 
    */
    useEffect(() => {
        setCallBack(() => callBack);
    }, [callBack, setCallBack]);

    /**
    * Sets the state to one belonging to selected country when country is changed
    */
    useEffect(() => {
        setState(STATES[country][0] ?? '');
    }, [country]);

    /**
    * Sets the city to one belonging to selected country when state is changed
    */
    useEffect(() => {
        setCity(CITIES[state][0] ?? '');
    }, [state]);

    return (
        <div>
            <label htmlFor="street">Street: </label>
            <input name="street" type="text" onChange={(e) => setStreet(e.target.value)} />
            <br />

            <label htmlFor="apartment">Apartment: </label>
            <input name="apartment" type="text" onChange={(e) => setApartment(e.target.value)} />
            <br />

            <label htmlFor="city">City: </label>
            <select name="city" id="city" value={city} onChange={(e) => {
                setCity(e.target.value);
            }}>
                {CITIES[state] && CITIES[state].map((val, index) => (
                    <option key={index} value={val} >{val}</option>
                ))}
            </select>
            <br />

            <label htmlFor="state">State: </label>
            <select name="state" id="state" value={state} onChange={(e) => {
                setState(e.target.value);
            }}>
                {STATES[country] && STATES[country].map((val, index) => (
                    <option key={index} value={val} >{val}</option>
                ))}
            </select>
            <br />

            <label htmlFor="country">Country: </label>
            <select name="country" id="country" value={country} onChange={(e) => {
                setCountry(e.target.value);
            }}>
                {COUNTRIES.map((val, index) => (
                    <option key={index} value={val} >{val}</option>
                ))}
            </select>
            <br />

            <label htmlFor="zip">Zip code: </label>
            <input name="zip" type="text" onChange={(e) => setZip(e.target.value)} />
            <br />
            <p>{error}</p>


        </div>
    );
};

export default AddressComponent;
