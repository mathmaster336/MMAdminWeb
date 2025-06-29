import React, { useState } from "react";
import { motion } from "framer-motion";
import { coursebg } from "../Utils/images";
import ClearIcon from "@mui/icons-material/Clear";
import AddCourseForm from "../Components/Courses/AddCourseForm";

const AddCourses = () => {
  const [fetureStep, setfetureStep] = useState(0);

  const SelectFeature = () => {
    return (
      <div className="flex md:flex-row flex-col justify-center items-center gap-10 p-4 mt-12 w-[65%] h-[40%] bg-gradient-to-br from-transparent via-black rounded-3xl shadow-lg transition-all duration-500">
        {/* Card 1 */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
          className="bg-gradient-to-br from-blue-400 to-pink-400 md:w-[40%] w-[90%] h-40 text-white shadow-xl hover:shadow-purple-400 flex justify-center items-center rounded-2xl cursor-pointer transition-all duration-300"
          onClick={() => setfetureStep(1)}
        >
          <label className="md:text-3xl text-blue-100 text-xl tracking-widest font-semibold">
            Add Courses
          </label>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.1,
          }}
          onClick={() => setfetureStep(2)}
          whileHover={{ scale: 1.05, rotate: -1 }}
          className="bg-gradient-to-tr from-pink-400 to-green-400 md:w-[40%] w-[90%]  h-40 text-white shadow-xl hover:shadow-pink-300 flex justify-center items-center rounded-2xl cursor-pointer transition-all duration-300"
        >
          <label className="md:text-3xl text-blue-100 text-xl tracking-widest font-semibold">
            Daily Challenges
          </label>
        </motion.div>
      </div>
    );
  };
  return (
    <div className="relative w-full h-screen flex justify-center ">
      {/* Background Image */}
      <img
        src={coursebg} // replace with actual image path
        alt="Background"
        className="absolute h-screen w-full object-cover  z-0 "
      />

      {/* Foreground Form */}
      <motion.div
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className=" z-20 w-full h-auto flex justify-center p-2 "
      >
        {fetureStep === 0 && <SelectFeature />}
        {fetureStep === 1 && (
          <AddCourseForm
            setfetureStep={setfetureStep}
            fetureStep={fetureStep}
          />
        )}
      </motion.div>
    </div>
  );
};

export default AddCourses;
