import React, { createContext, useContext, useState } from "react";

// 1. Create Context
const CourseContentContext = createContext();

// 2. Create Provider
export const CourseContentProvider = ({ children }) => {
  const [courseData, setCourseData] = useState(null);      // Store entire course object
  const [currentFolderId, setCurrentFolderId] = useState(); // Folder user is currently inside
  const [breadcrumbs, setBreadcrumbs] = useState([]);        // For folder trail

  return (
    <CourseContentContext.Provider
      value={{
        courseData,
        setCourseData,
        currentFolderId,
        setCurrentFolderId,
        breadcrumbs,
        setBreadcrumbs,
      }}
    >
      {children}
    </CourseContentContext.Provider>
  );
};

// 3. Export Hook for Easy Access
export const useCourseContent = () => useContext(CourseContentContext);
