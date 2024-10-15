import React, { useCallback, useEffect, useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import labels from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css';

/**
 * Component to input mobile number
 */
function MobileInput({ setCallBack, setMobile, mobile }) {
    const [errorFlash, setErrorFlash] = useState('');
    const [countryCode, setCountryCode] = useState('91');

    /**
     * Validates the input upon clicking next button in the Signup parent page
     * and sets the values of valid as true or false.
     * Also sets the full mobile number by concatenating the number with country code.
     */
    const callBack = useCallback((setValid) => {
        const fullNumber = `+${countryCode}${mobile}`;
        const isValid = isValidPhoneNumber(fullNumber);

        setValid(isValid);
        setErrorFlash(
            !mobile ? 'Phone number required' : (isValid ? '' : 'Invalid phone number')
        );

        if (isValid) {
            setMobile(fullNumber); // Set the full mobile number with country code
        }
    }, [countryCode, mobile, setMobile]);

    /**
     * Sets the callBack() as the setCallBack function in parent page 
     */
    useEffect(() => {
        setCallBack(() => callBack);
    }, [callBack, setCallBack]);

    return (
        <div>
            <label htmlFor="mobile">Mobile: </label>
            <select
                value={countryCode}
                onChange={event => setCountryCode(event.target.value)}
                aria-label="Select country code"
            >
                <option key={'IN'} value="91">
                    {labels['IN']} +{getCountryCallingCode("IN")}
                </option>
                {getCountries().map((country) => (
                    <option key={country} value={getCountryCallingCode(country)}>
                        {labels[country]} +{getCountryCallingCode(country)}
                    </option>
                ))}
            </select>

            <input
                id="mobile"
                type="tel"
                placeholder="Enter phone number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                aria-label="Enter phone number"
            />

            {errorFlash && <p>{errorFlash}</p>}
        </div>
    );
}

export default MobileInput;
