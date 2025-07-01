import { MarginOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MathMasterFeature from "./MathMasterFeature";
import { data, useNavigate } from "react-router-dom";
import { useAppContext } from "../../ContextApi/AppContenxt";
function CourseOverview({ setcourseStep}) {


  const navigate = useNavigate();

  const {courseData} =useAppContext();

  const handlecontent = (CourseData) => {
    // navigate("/courses/content", { state: { data: Folder } });
    navigate(`/courses/coursecontent/${CourseData.id}`)
  };

  const typeIcons = {
    PDF: <PictureAsPdfIcon className="text-red-500" />,
    Image: <ImageIcon className="text-blue-500" />,
    Video: <VideocamIcon className="text-purple-500" />,
  };
  const types = [];
  if (courseData.video) types.push("Video");
  if (courseData.pdf) types.push("PDF");
  if (courseData.images) types.push("Image");

  const hanldeback = () => {
    setcourseStep(true)

  };

  return (
    <div>
      <div className="ml-2">
        <ArrowBackIcon className="font-bold" onClick={hanldeback} />
      </div>
      <div className="flex md:flex-row  flex-col-reverse ">
        {/* Left Content */}
        <div className="w-full md:w-[60%] p-4">
          <h1 className="text-6xl hover:text-blue-700 mt-10  font-bold text-blue-600">
            {courseData.courseName}
          </h1>
          <p className="mt-2 text-2xl">Mentor: <span className="font-semibold">{courseData.mentorName}</span></p>
          <p className="mt-4 text-xl">Language: {courseData.language}</p>
          <p className="mt-4 text-lg">{courseData.desc}</p>

          <p className="mt-7 text-3xl font-medium">
            Price: ₹{courseData.price}
          </p>

          <div className="flex gap-[60px] mt-10">
            <div className="flex flex-wrap gap-2">
              {types.map((type, i) => (
                <button
                  key={i}
                  className="bg-gray-200 px-2 py-1 rounded text-xs flex items-center gap-1 hover:shadow-lg hover:shadow-blue-500"
                >
                  {typeIcons[type]}
                  <span>{type}</span>
                </button>
              ))}
            </div>
            <Button variant="outlined" onClick={()=>handlecontent(courseData)} className="md:w-[30%] w-[40%] flex justify-center items-center h-10 hover:bg-blue-500 hover:text-white hover:shadow-md hover:shadow-blue-400 text-xl">
              Content
            </Button>
          </div>
        </div>
        {/* Right Content */}
        <div className="w-full md:w-[60%]  justify-center items-center p-6">
          
          <video
            width="800"
            height="400"
            controls
            className="rounded-xl border border-gray-400 shadow-lg  shadow-blue-300 hover:scale-105 duration-1000"
          >
            <source src={courseData.introVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <MathMasterFeature />
    </div>
  );
}

export default CourseOverview;
