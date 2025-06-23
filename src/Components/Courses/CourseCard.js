import React, { useState } from "react";
// import { FaFilePdf, FaImage, FaVideo, FaFont } from "react-icons/fa";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";

function CourseCard() {
  const [data, setData] = useState([
    {
      courseName: "Web Api",
      subDesc: "ASP.NET Web API",
      mentorName: "Mangesh",
      types: ["PDF", "Image", "Video"],
    },
    {
      courseName: "React",
      subDesc: "React.js with Hooks",
      mentorName: "Mangesh",
      types: ["PDF", "Image", "Video"],
    },
    {
      courseName: "Sql",
      subDesc: "Sql with api and fronted",
      mentorName: "Mangesh",
      types: ["PDF", "Image", "Video"],
    },
  ]);

  const typeIcons = {
    PDF: <PictureAsPdfIcon className="text-red-500" />,
    Image: <ImageIcon className="text-blue-500" />,
    Video: <VideocamIcon className="text-purple-500" />,
  };

  return (
    <>
      <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 p-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg flex flex-col items-start transition transform hover:scale-105 hover:shadow-lg duration-300"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROxNeobSXYoNRS0Q05773BHuOcK_ilTrcdg&s"
              alt="Product"
              className="w-full h-52 object-cover rounded-md mb-2 "
            />
            <hr className="border-red-400 w-full mb-2" />
            <div className="font-bold text-lg">{item.courseName}</div>
            <p className="mt-1 font-medium text-lg text-left">{item.subDesc}</p>
            <p className="text-sm text-gray-500 text-left">
              Mentor Name : {item.mentorName}
            </p>
            <div className="text-sm text-gray-600 flex gap-2 flex-wrap mt-2">
              {item.types.map((type, typeIndex) => (
                <button
                  key={typeIndex}
                  className="bg-gray-200 px-2 py-1 rounded text-xs flex items-center gap-1"
                >
                  <span className="text-base">
                    {typeIcons[type] || <PictureAsPdfIcon />}
                  </span>
                  <span>{type}</span>
                </button>
              ))}
            </div>
            <button className="absolute bottom-1 right-1 bg-green-500 text-white text-sm px-2 py-1 rounded hover:bg-green-600">
              Content
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default CourseCard;