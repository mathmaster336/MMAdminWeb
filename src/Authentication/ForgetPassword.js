import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

const steps = ["Enter Email", "Verify OTP", "Reset Password"];

export default function ForgotPassword() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendOtpToEmail = () => {
    // Simulate OTP generation & sending
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    console.log(`OTP sent to ${email}: ${generatedOtp}`);
    setStep(1);
  };

  const verifyOtp = () => {
    if (enteredOtp === otp) {
      setStep(2);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const resetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // Here you'd send newPassword to the server to reset it
    alert("Password successfully reset!");
    // Reset flow
    setStep(0);
    setEmail("");
    setEnteredOtp("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <motion.div
      initial={{ scale: 0.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-300 to-red-200 p-4"
    >
      <Paper elevation={4} className="p-6  md:mt-10     rounded-3xl md:w-1/3 ">
        <Typography variant="h5" className="text-blue-500  space-y-5">
          Forgot Password
        </Typography>
        <Stepper activeStep={step} alternativeLabel className="mt-5">
          {steps.map((label) => (
            <Step key={label}>  
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box mt={4}>
          {step === 0 && (
            <>
              <TextField
                label="Email Address"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={sendOtpToEmail}
                disabled={!email}
              >
                Send OTP
              </Button>
            </>
          )}

          {step === 1 && (
            <>
              <TextField
                label="Enter OTP"
                fullWidth
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={verifyOtp}
              >
                Verify OTP
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={resetPassword}
              >
                Reset Password
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </motion.div>
  );
}
