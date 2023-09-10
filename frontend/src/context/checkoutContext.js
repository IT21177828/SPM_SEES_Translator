// ErrorContext.js
import { createContext, useContext, useState } from 'react';

const checkoutContext = createContext();

export const useError = () => {
  return useContext(checkoutContext);
};

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const setErrorMsg = (errorMsg) => {
    setError(errorMsg);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <checkoutContext.Provider value={{ error, setErrorMsg, clearError }}>
      {children}
    </checkoutContext.Provider>
  );
};
