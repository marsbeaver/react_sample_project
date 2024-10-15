import React, { createContext, useState } from 'react';

const SignupContext = createContext();

/**
 * Stores Data structures for signup flow
 */
export const SignupProvider = ({ children }) => {

  /**
   * User Data
   */
  const [formData, setFormData] = useState({
    consent: 'false',
    gender: '',
    userType: '',
    email: '',
    mobile: '',
    firstName: '',
    lastName: '',
    dob: '',
    address: ''
  });

  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  /**
   * Guardian Data
   */

  const [guardianData, setGuardianData] = useState({
    firstName: '',
    lastName: '',
    relationship: '',
    email: '',
    mobile: '',
  });

  const updateGuardianData = (newData) => {
    setGuardianData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  /**
   * Page state data
   */

  const [pageState, setPageState] = useState({
    pageNum: 1,
    screen: 'consent',
    proceed: false
  });

  const updatePageState = (newData) => {
    setPageState((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <SignupContext.Provider value={{ formData, updateFormData, guardianData, updateGuardianData, pageState, updatePageState }}>
      {children}
    </SignupContext.Provider>
  );
};

export default SignupContext;
