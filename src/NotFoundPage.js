import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "./Utils/HelperMethods/Localstorage";

const MotionBox = motion(Box);

export default function NotFoundPage() {
  const navigate = useNavigate();
  const token = getLocalStorage("token")
  console.log(token)

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <MotionBox
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-9xl font-bold text-blue-600"
      >
        404
      </MotionBox>

      <MotionBox
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-4"
      >
        <Typography variant="h5" className="text-gray-800">
          Oops! Page not found.
        </Typography>
        <Typography variant="body1" className="text-gray-600 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </Typography>
      </MotionBox>

      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6"
      >
        <Button
          variant="contained"
          color="primary"
          className="!bg-blue-600 !text-white !rounded-xl !px-6 !py-2"
          onClick={() => token ?navigate("/home"):navigate("/login")}
        >
          {token ? "Go Home":"Go Login"}
        </Button>
      </MotionBox>
    </div>
  );
}
