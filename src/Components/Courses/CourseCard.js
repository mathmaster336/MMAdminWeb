import React from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import { motion } from "framer-motion";

function CourseCard({ courseInfo }) {
  const typeIcons = {
    PDF: <PictureAsPdfIcon className="text-red-500" />,
    Image: <ImageIcon className="text-blue-500" />,
    Video: <VideocamIcon className="text-purple-500" />,
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-5 p-4">
      {courseInfo.map((item, index) => {
        const types = [];
        if (item.Video) types.push("Video");
        if (item.pdf) types.push("PDF");
        if (item.images) types.push("Image");

        return (
          <motion.div
            /* …framer‑motion props… */
            key={index}
            variants={cardVariants}
            custom={index}
            initial="hidden"
            animate="visible"
            className="bg-white shadow-md border border-l-blue-500 border-b-blue-400 border-r-blue-500  md:rounded-2xl rounded-xl flex flex-col hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 md:w-full max-w-sm mx-auto"
          >
            <img
              src={item.introimage || "/placeholder.jpg"}
              alt="Course Thumbnail"
              className="w-full h-48 object-cover md:rounded-t-2xl rounded-t-xl"
            />

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
                <button className="bg-blue-600 text-white hover:bg-white hover:text-blue-600 border hover:border-blue-600 px-6 py-1 text-sm rounded transition-all duration-200 hover:scale-105">
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
