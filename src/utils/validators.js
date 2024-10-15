
export const validateMobile = (mobileNumber, setErrorFlash) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(mobileNumber)) {
        setErrorFlash('Please enter a valid 10 digit mobile number');
        return false;
    } else {
        setErrorFlash('');
        return true;
    }
}

export const validateEmail = (email, setErrorFlash) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setErrorFlash('Please enter a valid email id');
        return false;
    } else {
        setErrorFlash('');
        return true;
    }
}

export const validatedob = (dob, setErrorFlash) => {
    if (dob === '') {
        setErrorFlash('Please select a date of birth');
        return false;
    } else {
        setErrorFlash('');
        return true;
    }
}


export const validateAddress = (street, apartment, state, city, country, zip, setError) => {
    if (street === '' || apartment === '' || state === '' || city === '' || country === '' || zip === '') {
        setError('Please fill all fields');
        return false;
    }
    else if (zip !== '' && /\D/.test(zip)) {
        setError('Zip code must be numeric');
        return false;
    } else {
        setError('');
        return true;
    }
}

export const validateName = (firstName, lastName, setFirstNameError, setLastNameError) => {
    let isValid = true;

    // Validate First Name
    if (firstName.trim() === '') {
        setFirstNameError('First name is required.');
        isValid = false;
    } else if (firstName.length > 1 && !/[aeiouAEIOU]/.test(firstName)) {
        setFirstNameError('First name must contain at least one vowel.');
        isValid = false;
    } else {
        setFirstNameError('');
    }

    // Validate Last Name
    if (lastName.trim() === '') {
        setLastNameError('Last name is required.');
        isValid = false;
    } else if (lastName.length > 1 && !/[aeiouAEIOU]/.test(lastName)) {
        setLastNameError('Last name must contain at least one vowel.');
        isValid = false;
    } else {
        setLastNameError('');
    }

    return isValid;
};