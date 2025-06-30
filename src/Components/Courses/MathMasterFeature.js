import React from "react";
import { motion } from "framer-motion";
import { School, SupportAgent, Description, OndemandVideo, EmojiEvents } from '@mui/icons-material';

const features = [
  {
    icon: <SupportAgent fontSize="medium" className="text-blue-500" />, text: "1-on-1 Mentor Support"
  },
  {
    icon: <Description fontSize="medium" className="text-blue-500" />, text: "Previous Year Papers"
  },
  {
    icon: <School fontSize="medium" className="text-blue-500" />, text: "Chapter-Wise Academic Notes & Books"
  },
  {
    icon: <OndemandVideo fontSize="medium" className="text-blue-500" />, text: "Recorded Lectures"
  },
  {
    icon: <EmojiEvents fontSize="medium" className="text-blue-500" />, text: "Weekly Challenges & Leaderboards"
  }
];

const testimonials = [
  {
    name: "Aayush, Class 10 Student",
    quote: "I improved from 42 to 82 in just 2 months!"
  },
  {
    name: "Sneha, Class 10",
    quote: "The mentor support feels like a friend who really gets me."
  }
];

export default function MathMasterFeature() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-8 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
          Struggling with Math in Class 10?
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Meet Your Personal Mentor: <span className="font-semibold text-blue-700">MathMaster 📱</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
      >
        <div className="shadow-xl rounded-2xl border border-blue-100 bg-white p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">What’s Inside the MathMaster App?</h2>
          <ul className="space-y-4">
            {features.map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-800">
                {item.icon}
                <span className="text-md font-medium">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="shadow-xl rounded-2xl border border-blue-100 bg-white p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Student Testimonials</h2>
          {testimonials.map((t, i) => (
            <div key={i} className="mb-4">
              <p className="text-gray-700 italic text-lg">“{t.quote}”</p>
              <p className="text-sm text-gray-500 text-right mt-1">– {t.name}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-lg font-medium mb-2 text-blue-700">Join 10,000+ Students Who’ve Transformed Their Scores!</p>
        <p className="mt-2 text-sm text-gray-500 italic">First 100 Sign-ups Get Free Access to Board Booster Pack 🧮✨</p>
      </motion.div>
    </div>
  );
}
