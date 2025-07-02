import React, { useState } from "react";
import { motion } from "framer-motion";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import AddCourseForm from "../Components/Courses/AddCourseForm";

const AddCourses = () => {
  const [fetureStep, setfetureStep] = useState(0);

  const SelectFeature = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white bg-opacity-70 backdrop-blur-md shadow-2xl rounded-3xl p-8 mt-5 flex flex-col md:flex-row items-center justify-center gap-8"
      >
        {/* Add Courses Card */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
          onClick={() => setfetureStep(1)}
          className="cursor-pointer bg-gradient-to-br from-blue-500 via-violet-600 to-indigo-600 text-white hover:shadow-xl hover:shadow-blue-300 transition-shadow duration-300  w-full md:w-1/2 h-40 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2"
        >
          <MenuBookIcon sx={{ fontSize: 36 }} />
          <span className="text-xl font-semibold tracking-wide">Add Courses</span>
        </motion.div>

        {/* Daily Challenges Card */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: -1 }}
          transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.1 }}
          onClick={() => setfetureStep(2)}
          className="cursor-pointer bg-gradient-to-br from-pink-400 via-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-300 transition-shadow duration-300 w-full md:w-1/2 h-40 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2"
        >
          <EmojiObjectsIcon sx={{ fontSize: 36 }} />
          <span className="text-xl font-semibold tracking-wide">Daily Challenges</span>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 flex justify-center items-center px-4 py-8">
      {/* Optional Background Image */}
      {/* <img
        src={coursebg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      /> */}

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full  flex justify-center"
      >
        {fetureStep === 0 && <SelectFeature />}
        {fetureStep === 1 && (
          <AddCourseForm
            setfetureStep={setfetureStep}
            fetureStep={fetureStep}
          />
        )}
        {fetureStep === 2 && (
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-center text-gray-700">Daily Challenges coming soon!</h2>
            <button
              onClick={() => setfetureStep(0)}
              className="mt-6 block mx-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go Back
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AddCourses;
