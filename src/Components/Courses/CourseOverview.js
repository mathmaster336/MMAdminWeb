import { MarginOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MathMasterFeature from "./MathMasterFeature";
import { data, useNavigate } from "react-router-dom";
function CourseOverview({ CourseData ,setcourseStep}) {
  // const location = useLocation();
  // const data = location.state.data;
  // console.log(data);
  //   console.log("CourseIfon", Folder);

  const navigate = useNavigate();

  const handlecontent = () => {
    // navigate("/courses/content", { state: { data: Folder } });
    navigate("/courses/coursecontent",{state:{CourseId:CourseData.Id}})
  };

  const typeIcons = {
    PDF: <PictureAsPdfIcon className="text-red-500" />,
    Image: <ImageIcon className="text-blue-500" />,
    Video: <VideocamIcon className="text-purple-500" />,
  };
  const types = [];
  if (CourseData.video) types.push("Video");
  if (CourseData.pdf) types.push("PDF");
  if (CourseData.images) types.push("Image");

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
            {CourseData.courseName}
          </h1>
          <p className="mt-2 text-2xl    ">Mentor: <span className="font-semibold">{CourseData.mentorName}</span></p>
          <p className="mt-4 text-xl">Language: {CourseData.language}</p>
          <p className="mt-4 text-lg">{CourseData.desc}</p>

          <p className="mt-7 text-3xl font-medium">
            Price: ₹{CourseData.price}
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
            <Button variant="outlined" onClick={handlecontent} className="md:w-[30%] w-[40%] flex justify-center items-center h-10 hover:bg-blue-500 hover:text-white hover:shadow-md hover:shadow-blue-400 text-xl">
              Content
            </Button>
          </div>
        </div>
        {/* Right Content */}
        <div className="w-full md:w-[60%]  justify-center items-center p-6">
          {/* <iframe
          width="100%"
          height="315"
          src={CourseData.introVideo}
          title="Course Intro Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded shadow-md"
        /> */}
          <video
            width="800"
            height="400"
            controls
            className="rounded-xl border border-gray-400 shadow-lg  shadow-blue-300 hover:scale-105 duration-1000"
          >
            <source src={CourseData.introVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <MathMasterFeature />
    </div>
  );
}

export default CourseOverview;
