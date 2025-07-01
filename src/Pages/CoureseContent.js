import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { CourseContentProvider } from "../ContextApi/CourseContentContext";
import CourseContentComponent from "../Components/Courses/CourseContentComponent";

function CoureseContent() {

  

  return (
    <CourseContentProvider>
      <CourseContentComponent />
    </CourseContentProvider>
  );
}

export default CoureseContent;
