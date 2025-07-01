import React, { createContext, useContext, useState } from "react";

// 1. Create the context
const AppContext = createContext();

// 2. Create the provider component
export const AppProvider = ({ children }) => {
  // Global states
  const [courseData, setCourseData] = useState({});
  const [courseId, setCourseId] = useState(null);

  return (
    <AppContext.Provider
      value={{
        courseData,
        setCourseData,
        courseId,
        setCourseId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 3. Create a custom hook for easy access
export const useAppContext = () => useContext(AppContext);
