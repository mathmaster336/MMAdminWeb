import React, { useEffect, useState } from "react";
import CourseCard from "../Components/Courses/CourseCard";
import { useNavigate } from "react-router-dom";
import CourseOverview from "../Components/Courses/CourseOverview";
import MMapi from "../Services/MMapi";
import { useAppContext } from "../ContextApi/AppContenxt";

function Courses() {
  const [courseStep, setcourseStep] = useState(true);
  // const [CourseData, setCourseData] = useState({});
    const {courseData,setCourseData} =useAppContext();
  
  const [courseInfo, setcourseInfo] = useState([
    {
      courseName: "",
      desc: "",
      id: "",
      images: false,
      introVideo: "",
      introimg: "",
      language: "",
      mentorName: "",
      pdf: false,
      price: "",
      shortdesc: "",
      video: false,
    },
  ]);

  const navigate = useNavigate();
  const handleCourseClick = () => {
    navigate("/course-content");
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    debugger;
    try {
      const req = {};
      const res = await MMapi.post("/courses/allcourses", req);

      setcourseInfo(res); // assuming res is your actual data
    } catch (error) {}
  };

  const handleCourseCard = (data) => {
    debugger
    // console.log(data);
    setCourseData(data);
    console.log(courseData)
    setcourseStep(false);
  };

  return (
    <div className="bg-gray-200 h-screen" >
      {courseStep ? (
        <CourseCard
          courseInfo={courseInfo}
          handleCourseCard={handleCourseCard}
        />
      ) : (
        <CourseOverview setcourseStep={setcourseStep} />
      )}
    </div>
  );
}

export default Courses;
