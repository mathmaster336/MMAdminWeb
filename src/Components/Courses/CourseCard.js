import React from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import { motion } from "framer-motion";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CourseCard({ courseInfo, handleCourseCard, handlecontent }) {
  const typeIcons = {
    PDF: <PictureAsPdfIcon className="text-red-500" />,
    Image: <ImageIcon className="text-blue-500" />,
    Video: <VideocamIcon className="text-purple-500" />,
  };
  const navigate = useNavigate();


  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };
  // 

  // const handleContemt=(courseData)=>{
  //   
  //    navigate(`/courses/coursecontent/${courseData.id}`)

  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-5 p-4">
      {courseInfo.map((item, index) => {
        const types = [];
        if (item.pdf) types.push("PDF");
        if (item.images) types.push("Image");
        if (item.video) types.push("Video");
        {
          
        }
        return (
          <motion.div
            /* …framer‑motion props… */
            key={index}
            variants={cardVariants}
            custom={index}
            initial="hidden"
            animate="visible"
            className="bg-white hover:shadow-blue-500 shadow-sm border  border-gray-400 md:rounded-2xl 
            rounded-xl flex flex-col hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 md:w-full max-w-sm mx-auto  cursor-pointer"
            onClick={() => handleCourseCard(item)}
          >
            {item.introimg ? (
              <img
                src={item.introimg}
                alt="Course Thumbnail"
                loading="lazy"
                className="w-full h-48 object-cover md:rounded-t-2xl rounded-t-xl border border-b-2 border-black"
              />
            ) : (
              <div className="p-2">
                <Skeleton
                  variant="rectangular"
                  height={192} // Tailwind h-48
                  width="100%" // Tailwind w-full
                  className="rounded-t-xl"
                />
              </div>
            )}

            <div className="p-4 flex-1 flex flex-col">
              <h2 className="font-bold text-xl mb-1">{item.courseName}</h2>
              <p className="text-gray-800 text-lg mb-1">
                Mentor:{" "}
                <span className="font-semibold text-lg">{item.mentorName}</span>
              </p>

              {/* Scrollable description */}
              <div className="text-lg text-gray-800 max-h-20 overflow-y-auto pr-1 custom-scrollbar flex-1">
                {item.shortdesc}
              </div>

              {/* === NEW FLEX ROW (types + action button) === */}
              <div className="flex items-center justify-between mt-4">
                {/* resource type chips */}
                <div className="flex flex-wrap gap-2">
                  {types.map((type, i) => (
                    <button
                      key={i}
                      className="bg-gray-200 px-2 py-1 rounded text-xs flex items-center gap-1"
                    >
                      {typeIcons[type]}
                      <span>{type}</span>
                    </button>
                  ))}
                </div>

                {/* main action button */}
                <button className="bg-blue-600 text-white hover:bg-white hover:text-blue-600 border hover:border-blue-600 px-6 py-1 text-sm rounded transition-all duration-200 hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlecontent(item)
                  }
                  }
                >

                  Content
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
export default CourseCard;
