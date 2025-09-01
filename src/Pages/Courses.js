import  { useRef, useState } from "react";
import CourseCard from "../Components/Courses/CourseCard";
import { useNavigate } from "react-router-dom";
import CourseOverview from "../Components/Courses/CourseOverview";
import {  ContentApi } from "../Services/MMapi";
import { useAppContext } from "../ContextApi/AppContenxt";

function Courses() {
  const [courseStep, setcourseStep] = useState(true);
  // const [CourseData, setCourseData] = useState({});
  const { courseData, setCourseData } = useAppContext();

  const Navigate = useNavigate();

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

  // useEffect(() => {
  //   fetchCourses();
  // }, []);

  // const fetchCourses = async () => {
  //   debugger;
  //   try {
  //     const req = {};
  //     const res = await ContentApi.post("/courses/allcourses", req);

  //     setcourseInfo(res); // assuming res is your actual data
  //   } catch (error) { }
  // };

  const hasFetched = useRef(false); // 👈 Track if API has been called

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const res = await ContentApi.post("/courses/allcourses", {});
  //       setcourseInfo(res.data); // ✅ Use res.data
  //     } catch (error) {
  //       console.error("Error fetching courses:", error);
  //     }
  //   };
  //   fetchCourses();
  // }, []);

  // ⛔️ Do NOT use useEffect, call API inline with a guard
  if (!hasFetched.current) {
    debugger
    hasFetched.current = true;
    (async () => {
      try {
        const res = await ContentApi.post("/courses/allcourses", {});
        // console.log(res)
        setcourseInfo(res);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    })();
  }

  const handleCourseCard = (data) => {
    setCourseData(data);
    setcourseStep(false);
  };

  const handlecontent = (CourseData) => {
    // navigate("/courses/content", { state: { data: Folder } });
    navigate(`/courses/coursecontent/${CourseData.id}`)
  };

  return (
    <div className="bg-gray-200 h-full" >
      {courseStep ? (
        <CourseCard
          courseInfo={courseInfo}
          handleCourseCard={handleCourseCard}
          handlecontent={handlecontent}
        />
      ) : (
        <CourseOverview setcourseStep={setcourseStep}
          handlecontent={handlecontent} />
      )}
    </div>
  );
}

export default Courses;
