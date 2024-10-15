import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailInput from '../components/auth/EmailInput';
import MobileInput from '../components/auth/MobileInput';
import OtpVerify from '../components/auth/OtpInput';
import AddressComponent from '../components/auth/addressComponent';
import DateOfBirthComponent from '../components/auth/dateOfBirthComponent';
import FullNameComponent from '../components/auth/fullNameComponent';
import GenderComponent from '../components/auth/genderComponent';
import UserTypeComponent from '../components/auth/userTypeComponent';
import SignupContext from './signupContext';
import RelationshipComponent from '../components/auth/relationshipComponent';
import { signup } from '../services/signup';
/**
 * Display all entered data and edit if needed
 */
function Confirm({ setValidator }) {
    const navigate = useNavigate();
    const { formData, updateFormData, guardianData, updateGuardianData } = useContext(SignupContext);
    const [errorFlash, setErrorFlash] = useState('');


    // Toggle input components for editing fields

    const [visibleUserType, setVisibleUserType] = useState(false);
    const [visibleGender, setVisibleGender] = useState(false);
    const [visibleFullName, setVisibleFullName] = useState(false);
    const [visibleEmail, setVisibleEmail] = useState(false);
    const [visibleMobile, setVisibleMobile] = useState(false);
    const [visibleEmailOtp, setVisibleEmailOtp] = useState(false);
    const [visibleMobileOtp, setVisibleMobileOtp] = useState(false);
    const [visibleDob, setVisibleDob] = useState(false);
    const [visibleAddress, setVisibleAddress] = useState(false);

    const [visibleGuardianFullName, setVisibleGuardianFullName] = useState(false);
    const [visibleGuardianEmail, setVisibleGuardianEmail] = useState(false);
    const [visibleGuardianMobile, setVisibleGuardianMobile] = useState(false);
    const [visibleGuardianEmailOtp, setVisibleGuardianEmailOtp] = useState(false);
    const [visibleGuardianMobileOtp, setVisibleGuardianMobileOtp] = useState(false);
    const [visibleGuardianRelationship, setVisibleGuardianRelationship] = useState(false);


    // Store function to save edited changes
    const [save, setSave] = useState(() => () => true);

    // Store whether input value is valid
    const [valid, setValid] = useState(false);

    // Store edited values
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [userType, setUserType] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');

    const [guardianfirstName, setGuardianFirstName] = useState('');
    const [guardianlastName, setGuardianLastName] = useState('');
    const [guardianRelationship, setGuardianRelationship] = useState('');
    const [guardianEmail, setGuardianEmail] = useState('');
    const [guardianMobile, setGuardianMobile] = useState('');

    // Set the user type if edited. Display the guardian details if it is student.
    useEffect(() => {
        try {
            setUserType(formData.userType);
        } catch (error) {
            console.error(error)
        }
    }, [formData.userType]);

    /**
     * Run the validator function received from the 
     * Signup parent component on clicking the next button.
     * Checks if all values have been assigned
     */
    const handleNext = useCallback(async () => {
        try {
            let guardianPayload = {
                firstName: guardianData.firstName,
                lastName: guardianData.lastName,
                relationship: guardianData.relationship,
                email: guardianData.email,
                mobile: guardianData.mobile,
            };
            let userPayload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                userType: formData.userType,
                gender: formData.gender,
                email: formData.email,
                mobile: formData.mobile,
                dob: formData.dob,
                address: formData.address,
                ...(formData.userType === 'student' ? guardianPayload : {})
            };

            if (Object.values(formData).some(value => value === '') || (formData.userType === 'student' && Object.values(guardianData).some(value => value === ''))) {
                setErrorFlash('Please fill all details!');
            } else {
                try {
                    await signup({ userPayload });
                }
                catch (e) {
                    setErrorFlash(e);
                }
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error)
        }
    }, [formData, guardianData, navigate]);

    /**
     * Sets the callBack handleNext() as the setValidator function in parent Signup page 
     */
    useEffect(() => {
        try {
            setValidator(() => handleNext);
        } catch (error) {
            console.error(error)
        }
    }, [handleNext, setValidator]);

    /**
     * Runs when valid changes.
     * Updates respective edited values and hides the input component
     */
    useEffect(() => {
        try {
            if (valid) {
                if (visibleFullName === true) {
                    updateFormData({ firstName: firstName, lastName: lastName });
                    setVisibleFullName(false);
                } else if (visibleGuardianFullName === true) {
                    updateGuardianData({ firstName: guardianfirstName, lastName: guardianlastName });
                    setVisibleGuardianFullName(false);
                } else if (visibleGender === true) {
                    updateFormData({ gender: gender });
                    setVisibleGender(false);
                } else if (visibleUserType === true) {
                    updateFormData({ userType: userType });
                    setVisibleUserType(false);
                } else if (visibleEmailOtp === true) {
                    setVisibleEmailOtp(false);
                    updateFormData({ email: email });
                } else if (visibleMobileOtp === true) {
                    setVisibleMobileOtp(false);
                    updateFormData({ mobile: mobile });
                } else if (visibleEmail === true) {
                    setVisibleEmailOtp(true);
                    setVisibleEmail(false);
                } else if (visibleMobile === true) {
                    setVisibleMobileOtp(true);
                    setVisibleMobile(false);
                } else if (visibleDob === true) {
                    updateFormData({ dob: dob });
                    setVisibleDob(false);
                } else if (visibleAddress === true) {
                    updateFormData({ address: address });
                    setVisibleAddress(false);
                } else if (visibleGuardianEmailOtp === true) {
                    setVisibleGuardianEmailOtp(false);
                    updateGuardianData({ email: guardianEmail });
                } else if (visibleGuardianMobileOtp === true) {
                    setVisibleGuardianMobileOtp(false);
                    updateGuardianData({ mobile: guardianMobile });
                } else if (visibleGuardianEmail === true) {
                    setVisibleGuardianEmailOtp(true);
                    setVisibleGuardianEmail(false);
                } else if (visibleGuardianMobile === true) {
                    setVisibleGuardianMobileOtp(true);
                    setVisibleGuardianMobile(false);
                } else if (visibleGuardianRelationship === true) {
                    setVisibleGuardianRelationship(false);
                    updateGuardianData({ relationship: guardianRelationship });
                }
                setValid(false);
            }
        } catch (error) {
            console.error(error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valid]);

    return (
        <>
            <h1>
                Confirm
            </h1>
            <h2>Your Information</h2>
            {/**
            * OTP verification screens as popup dialogues
            */}
            {visibleMobileOtp && (<dialog open><h2>OTP verification for {mobile}</h2><OtpVerify {...{ valid, setValid }} setCallBack={setSave} />
                <button onClick={() => { setVisibleMobileOtp(false) }}>Cancel</button>
                <button onClick={() => { save(setValid) }}>Save</button></dialog>)}
            {visibleEmailOtp && (<dialog open><h2>OTP verification for {email}</h2><OtpVerify {...{ valid, setValid }} setCallBack={setSave} />
                <button onClick={() => { setVisibleEmailOtp(false) }}>Cancel</button>
                <button onClick={() => { save(setValid) }}>Save</button></dialog>)}
            {visibleGuardianMobileOtp && (<dialog open><h2>OTP verification for {guardianMobile}</h2><OtpVerify {...{ valid, setValid }} setCallBack={setSave} />
                <button onClick={() => { setVisibleGuardianMobileOtp(false) }}>Cancel</button>
                <button onClick={() => { save(setValid) }}>Save</button></dialog>)}
            {visibleGuardianEmailOtp && (<dialog open><h2>OTP verification for {guardianEmail}</h2><OtpVerify {...{ valid, setValid }} setCallBack={setSave} />
                <button onClick={() => { setVisibleGuardianEmailOtp(false) }}>Cancel</button>
                <button onClick={() => { save(setValid) }}>Save</button></dialog>)}

            {/**
            * User data display table
            */}
            <table>
                <tbody>
                    <tr>
                        <td>User Type:</td>
                        <td> {formData.userType}</td>
                        <td> <button onClick={() => { setVisibleUserType(!visibleUserType) }}>edit</button></td>
                    </tr>
                    <tr>
                        {visibleUserType === true && <><UserTypeComponent {...{ userType, setUserType }} setCallBack={setSave} />
                            <button onClick={() => { setVisibleUserType(false) }}>Cancel</button>
                            <button onClick={() => { save(setValid); }}>Save</button></>}
                    </tr>
                    <tr>
                        <td>Gender:</td>
                        <td> {formData.gender}</td>
                        <td> <button onClick={() => { setVisibleGender(!visibleGender) }}>edit</button></td>
                    </tr>
                    <tr>
                        {visibleGender === true && <><GenderComponent {...{ gender, setGender }} setCallBack={setSave} />
                            <button onClick={() => { setVisibleGender(false) }}>Cancel</button>
                            <button onClick={() => { save(setValid); }}>Save</button></>}
                    </tr>
                    <tr>
                        <td>Full Name:</td>
                        <td> {formData.firstName} {formData.lastName}</td>
                        <td> <button onClick={() => { setVisibleFullName(!visibleFullName) }}>edit</button></td>
                    </tr>
                    <tr>
                        {visibleFullName === true && <><FullNameComponent {...{ setFirstName, setLastName, firstName, lastName }} setCallBack={setSave} />
                            <button onClick={() => { setVisibleFullName(false) }}>Cancel</button>
                            <button onClick={() => { save(setValid); }}>Save</button></>
                        }
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td> {formData.email}</td>
                        <td> <button onClick={() => { setVisibleEmail(!visibleEmail) }}>edit</button></td>
                    </tr>
                    <tr>
                        {visibleEmail === true && <><EmailInput {...{ setEmail, email, valid }} setCallBack={setSave} />
                            <button onClick={() => { setVisibleEmail(false) }}>Cancel</button>
                            <button onClick={() => { save(setValid) }}>Save</button></>}
                    </tr>
                    <tr>
                        <td>Mobile:</td>
                        <td> {formData.mobile}</td>
                        <td> <button onClick={() => { setVisibleMobile(!visibleMobile) }}>edit</button></td>
                    </tr>
                    <tr>
                        {visibleMobile === true && <><MobileInput {...{ setMobile, mobile, valid }} setCallBack={setSave} />
                            <button onClick={() => { setVisibleMobile(false) }}>Cancel</button>
                            <button onClick={() => { save(setValid); }}>Save</button></>}
                    </tr>
                    <tr>
                        <td>Date of Birth:</td>
                        <td> {formData.dob}</td>
                        <td> <button onClick={() => { setVisibleDob(!visibleDob) }}>edit</button></td>
                    </tr>
                    <tr>
                        {visibleDob === true && <><DateOfBirthComponent {...{ setDob, dob }} setCallBack={setSave} />
                            <button onClick={() => { setVisibleDob(false) }}>Cancel</button>
                            <button onClick={() => { save(setValid); }}>Save</button></>}
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td> {formData.address}</td>
                        <td> <button onClick={() => { setVisibleAddress(!visibleAddress) }}>edit</button></td>
                    </tr>
                    <tr>
                        {visibleAddress === true && <>
                            <AddressComponent {...{ setAddress, address, valid, setValid }} setCallBack={setSave} />
                            <button onClick={() => { setVisibleAddress(false) }}>Cancel</button>
                            <button onClick={() => { save(setValid); }}>Save</button></>}
                    </tr>

                </tbody>
            </table>
            {/**
            * Guardian data display table.
            * Visible if user is a student
            */}
            {formData.userType === 'student' && <>
                <h2>Guardian Information</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Full Name:</td>
                            <td>{guardianData.firstName} {guardianData.lastName}</td>
                            <td> <button onClick={() => { setVisibleGuardianFullName(!visibleGuardianFullName) }}>edit</button></td>
                        </tr>
                        <tr>
                            {visibleGuardianFullName === true && <><FullNameComponent {...{ setFirstName: setGuardianFirstName, setLastName: setGuardianLastName, firstName: guardianfirstName, lastName: guardianlastName }} setCallBack={setSave} />
                                <button onClick={() => { setVisibleGuardianFullName(false) }}>Cancel</button>
                                <button onClick={() => { save(setValid); }}>Save</button></>
                            }
                        </tr>
                        <tr>
                            <td>Relationship:</td>
                            <td> {guardianData.relationship}</td>
                            <td> <button onClick={() => setVisibleGuardianRelationship(!visibleGuardianRelationship)}>edit</button></td>
                        </tr>
                        <tr>
                            {visibleGuardianRelationship === true && <><RelationshipComponent {...{ relationship: guardianRelationship, setRelationship: setGuardianRelationship }} setCallBack={setSave} />
                                <button onClick={() => { setVisibleGuardianRelationship(false) }}>Cancel</button>
                                <button onClick={() => { save(setValid); }}>Save</button></>
                            }
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td> {guardianData.email}</td>
                            <td> <button onClick={() => { setVisibleGuardianEmail(!visibleGuardianEmail) }}>edit</button></td>
                        </tr>
                        <tr>
                            {visibleGuardianEmail === true && <><EmailInput {...{ setEmail: setGuardianEmail, email: guardianEmail, valid }} setCallBack={setSave} />
                                <button onClick={() => { setVisibleGuardianEmail(false) }}>Cancel</button>
                                <button onClick={() => { save(setValid) }}>Save</button></>}
                        </tr>
                        <tr>
                            <td>Mobile:</td>
                            <td> {guardianData.mobile}</td>
                            <td> <button onClick={() => { setVisibleGuardianMobile(!visibleGuardianMobile) }}>edit</button></td>
                        </tr>
                        <tr>
                            {visibleGuardianMobile === true && <><MobileInput {...{ setMobile: setGuardianMobile, mobile: guardianMobile, valid }} setCallBack={setSave} />
                                <button onClick={() => { setVisibleGuardianMobile(false) }}>Cancel</button>
                                <button onClick={() => { save(setValid); }}>Save</button></>}
                        </tr>

                    </tbody>
                </table>
            </>
            }
            {/**
            * Show error message
            */}
            <p>{errorFlash}</p>
        </>
    );
}

export default Confirm;