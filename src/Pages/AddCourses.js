import React, { useState } from "react";
import { motion } from "framer-motion";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BookIcon from "@mui/icons-material/Book";
import AddCourseForm from "../Components/Courses/AddCourseForm";
import AddEbook from "../Components/Courses/AddEBook";
import AddQuestionPapers from "../Components/Courses/AddQuestionPapers";
import AddDailyChalenges from "../Components/Courses/AddDailyChalenges";

const AddCourses = () => {
  const [fetureStep, setfetureStep] = useState(0);

  const features = [
    {
      id: 1,
      title: "Add Courses",
      icon: <MenuBookIcon sx={{ fontSize: 36 }} />,
      colors: "from-blue-500 via-violet-600 to-indigo-600",
      step: 1,
    },
    {
      id: 2,
      title: "Daily Challenges",
      icon: <EmojiObjectsIcon sx={{ fontSize: 36 }} />,
      colors: "from-pink-400 via-orange-500 to-red-500",
      step: 2,
    },
    {
      id: 3,
      title: "Add Question Papers",
      icon: <LibraryBooksIcon sx={{ fontSize: 36 }} />,
      colors: "from-green-400 via-emerald-500 to-teal-600",
      step: 3,
    },
    {
      id: 4,
      title: "Add E-Books",
      icon: <BookIcon sx={{ fontSize: 36 }} />,
      colors: "from-yellow-400 via-orange-500 to-amber-600",
      step: 4,
    },
  ];

  const SelectFeature = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-5xl bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-10 mt-5 grid grid-cols-1 sm:grid-cols-2 gap-8"
    >
      {features.map((feature, idx) => (
        <motion.div
          key={feature.id}
          whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 1 : -1 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
          onClick={() => setfetureStep(feature.step)}
          className={`cursor-pointer bg-gradient-to-br ${feature.colors} text-white hover:shadow-2xl transition-shadow duration-300 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-3 h-44`}
        >
          {feature.icon}
          <span className="text-lg sm:text-xl font-semibold tracking-wide text-center">
            {feature.title}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 flex justify-center items-center px-4 py-2">
      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full flex justify-center"
      >
        {fetureStep === 0 && <SelectFeature />}
        {fetureStep === 1 && (
          <AddCourseForm setfetureStep={setfetureStep} fetureStep={fetureStep} />
        )}

        {fetureStep == 4 && (<AddEbook setfetureStep={setfetureStep} fetureStep={fetureStep} />)}
        {fetureStep == 3 && (<AddQuestionPapers setfetureStep={setfetureStep} fetureStep={fetureStep} />)}
        {fetureStep == 2 && (<AddDailyChalenges setfetureStep={setfetureStep} fetureStep={fetureStep} />)}

      </motion.div>
    </div>
  );
};

export default AddCourses;
