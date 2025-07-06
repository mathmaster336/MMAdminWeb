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
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { MMapi } from "../Services/MMapi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate } from "react-router-dom";

const steps = ["Enter Email", "Verify OTP", "Reset Password"];

export default function ForgotPassword() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState({ email: false, otp: false, reset: false });

  const navigate = useNavigate();

  const sendOtpToEmail = async () => {
    setLoading((prev) => ({ ...prev, email: true }));
    try {
      const res = await MMapi.post("/auth/foregetpassword", {
        adminEmail: email,
      });

      if (res.status) {
        setStep(1);
        toast.success(
          <>
            <CheckCircleIcon style={{ verticalAlign: "middle", marginRight: 8 }} />
            OTP has been sent to your email
          </>,
          { icon: false }
        );
      } else {
        toast.error(
          <>
            <ErrorIcon style={{ verticalAlign: "middle", marginRight: 8 }} />
            {res.message || "Something went wrong"}
          </>,
          { icon: false }
        );
      }
    } catch (error) {
      toast.error(
        <>
          <ErrorIcon style={{ verticalAlign: "middle", marginRight: 8 }} />
          Failed to send OTP
        </>,
        { icon: false }
      );
    } finally {
      setLoading((prev) => ({ ...prev, email: false }));
    }
  };

  const verifyOtp = async () => {
    setLoading((prev) => ({ ...prev, otp: true }));
    try {
      const res = await MMapi.post("/auth/VerifyForgetOtp", {
        adminEmail: email,
        forgetOtp: enteredOtp,
      });

      if (res.status) {
        setStep(2);
        toast.success(
          <>
            <CheckCircleIcon style={{ verticalAlign: "middle", marginRight: 8 }} />
            OTP verified successfully
          </>,
          { icon: false }
        );
      } else {
        toast.error(
          <>
            <ErrorIcon style={{ verticalAlign: "middle", marginRight: 8 }} />
            Invalid OTP. Please try again.
          </>,
          { icon: false }
        );
      }
    } catch (err) {
      toast.error(
        <>
          <ErrorIcon style={{ verticalAlign: "middle", marginRight: 8 }} />
          Something went wrong
        </>,
        { icon: false }
      );
    } finally {
      setLoading((prev) => ({ ...prev, otp: false }));
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error(
        <>
          <ErrorIcon style={{ verticalAlign: "middle", marginRight: 8 }} />
          Passwords do not match
        </>,
        { icon: false }
      );
      return;
    }

    setLoading((prev) => ({ ...prev, reset: true }));

    try {
      const res = await MMapi.post("/auth/adminResetpassword", {
        email: email,
        newPassword: newPassword,
      });

      if (res.status) {
        toast.success(
          <>
            <CheckCircleIcon style={{ verticalAlign: "middle", marginRight: 8 }} />
            Password reset successful!
          </>,
          { icon: false }
        );
        // Reset all state
        setStep(0);
        setEmail("");
        setEnteredOtp("");
        setNewPassword("");
        setConfirmPassword("");
        navigate("/login");
      } else {
        toast.error(
          <>
            <ErrorIcon style={{ verticalAlign: "middle", marginRight: 8 }} />
            {res.message || "Reset failed"}
          </>,
          { icon: false }
        );
      }
    } catch (error) {
      toast.error(
        <>
          <ErrorIcon style={{ verticalAlign: "middle", marginRight: 8 }} />
          Password reset failed
        </>,
        { icon: false }
      );
    } finally {
      setLoading((prev) => ({ ...prev, reset: false }));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 to-red-200 p-4">
      <motion.div
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Paper elevation={4} className="p-6 rounded-3xl">
          <Typography variant="h5" className="text-blue-500 mb-4 text-center">
            Forgot Password
          </Typography>

          <Stepper activeStep={step} alternativeLabel>
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
                  disabled={!email || loading.email}
                >
                  {loading.email ? <CircularProgress size={22} color="inherit" /> : "Send OTP"}
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
                  disabled={!enteredOtp || loading.otp}
                >
                  {loading.otp ? <CircularProgress size={22} color="inherit" /> : "Verify OTP"}
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
                  disabled={
                    !newPassword || !confirmPassword || loading.reset
                  }
                >
                  {loading.reset ? (
                    <CircularProgress size={22} color="inherit" />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </>
            )}
          </Box>
        </Paper>
      </motion.div>
    </div>
  );
}
