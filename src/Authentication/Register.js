import React, { useState } from "react";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import OtpInput from "react-otp-input";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MMapi from "../Services/MMapi";
import { db } from "../firebase.js";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  //   const [step, setStep] = useState(1); // 1 for email/password, 2 for phone
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const navigate = useNavigate();
  const handleEmailLogin = async () => {
    debugger;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 6 characters and contain at least one special character."
      );
      return;
    }

    if (password !== cpassword) {
      alert("Password and Confirm Password should be same");
      return;
    }

    const req = {
      email: email,
      password: password,
    };

    try {
      // Insert data into 'mmadmin' collection, document ID 'MMadmin'
      await setDoc(doc(db, "testCollection", "user"), req);
      alert("Data inserted successfully!");
      // navigate("/login"); // if using react-router
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to insert data.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-red-200 p-4">
      <motion.div
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex justify-center items-center"
      >
        <div className="bg-white rounded-2xl shadow-lg w-2/3">
          <h2 className="text-2xl font-bold mb-6 text-blue-700 pt-4 text-center">
            Sign UP
          </h2>

          <div className="mx-7">
            <TextField
              id="outlined-basic"
              label="Enter email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />

            <TextField
              id="outlined-password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              label="Enter password"
              type="password"
              autoComplete="current-password"
              sx={{ marginTop: 3 }}
            />

            <TextField
              id="outlined-password-input"
              value={cpassword}
              onChange={(e) => setcpassword(e.target.value)}
              className="w-full"
              label="Confirm password"
              type="password"
              autoComplete="current-password"
              sx={{ marginTop: 2 }}
            />

            <button
              onClick={handleEmailLogin}
              className="w-full text-xl font-bold bg-blue-500 text-white py-3 mt-5 mb-5 rounded hover:bg-blue-600 border hover:border-gray-600"
            >
              Sign Up
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
