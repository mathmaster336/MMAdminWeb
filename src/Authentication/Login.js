import React, { useState } from "react";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import OtpInput from "react-otp-input";
import { TextField } from "@mui/material";
import { MMapi } from "../Services/MMapi";
import { setLocalStorage } from "../Utils/HelperMethods/Localstorage";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function AdminLogin() {
  //   const [step, setStep] = useState(1); // 1 for email/password, 2 for phone
  const [step, setStep] = useState(1); // 1: email & password, 2: phone, 3: OTP
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("1234"); // Simulate backend OTP
  const [buttonClick, setbuttonClick] = useState(false);

  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    setbuttonClick(true);
    debugger;
    const req = {
      email,
      password,
    };

    try {
      const res = await MMapi.post("/auth/adminlogin", req);

      if (res?.token) {
        setLocalStorage("token", res.token);
        alert("Login successful");
        navigate("/home");
        // Optionally redirect or fetch user data here
      } else {
        alert("Login failed. Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Api Error");
    } finally {
      setbuttonClick(false);
    }
  };

  const handleSendOtp = () => {
    if (!phone) {
      alert("Please enter a valid phone number");
      return;
    }
    console.log("Sending OTP to:", phone);
    setStep(3);
  };

  const handleVerifyOtp = () => {
    if (otp === serverOtp) {
      alert("Login successful!");
      // Navigate to dashboard or home
    } else {
      alert("Invalid OTP. Try again.");
    }
  };

  const handleNext = () => {
    // Validate here if needed
    setStep(2);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-red-200 p-4">
      <motion.div
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className=""
      >
        <div className="bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 pt-4 text-center underline">
            Math Master Login
          </h2>

          {step === 1 && (
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
                sx={{ marginTop: 2 }}
              />

              <button
                onClick={handleEmailLogin}
                disabled={buttonClick}
                className={`w-full py-3 mt-5 mb-5 rounded border ${
                  buttonClick
                    ? "bg-blue-300 text-white cursor-not-allowed border border-blue-700"
                    : "bg-blue-500 text-white hover:bg-blue-600 hover:border-gray-600"
                }`}
              >
                {!buttonClick ? (
                  "Login"
                ) : (
                  <CircularProgress size={22} className="text-white" />
                )}
              </button>
            </div>
          )}

          {step === 2 && (
            <motion.div
              // initial={{ x: 60, opacity: 0 }}
              // animate={{ x: 0, opacity: 1 }}
              // transition={{ duration: 0.4 }}
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className=" "
            >
              <div className="mx-10">
                {/* <label className="block text-sm font-medium mb-2">
                  Mobile Number
                </label> */}

                <TextField
                  id="outlined-basic"
                  label="Enter Mobile Number "
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full"
                  sx={{ marginTop: 2 }}
                />

                <button
                  onClick={handleSendOtp}
                  className="w-full bg-blue-500 text-white py-3 mt-5 mb-5 rounded hover:bg-blue-600 border hover:border-gray-600"
                >
                  Send OTP
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Enter OTP
              </label>
              <OtpInput
                value={otp}
                onChange={(val) => setOtp(val)}
                numInputs={4}
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  fontSize: "1.5rem",
                  margin: "0 0.5rem",
                  borderRadius: 4,
                  border: "1px solid gray",
                }}
              />

              <button
                onClick={handleVerifyOtp}
                className="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
