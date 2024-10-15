import React, { createContext, useState } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
  });

  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const [pageState, setPageState] = useState({
    pageNum: 0,
    screen: 'email',
  });

  const updatePageState = (newData) => {
    setPageState((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <LoginContext.Provider value={{ formData, updateFormData, pageState, updatePageState }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
