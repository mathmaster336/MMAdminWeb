// // Login.jsx
// import React, { useState } from "react";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
// import OtpInput from "react-otp-input";

// import TextField from "@mui/material/TextField";

// function Login() {
//   const [step, setStep] = useState(1); // 1: email & password, 2: phone, 3: OTP
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [serverOtp, setServerOtp] = useState("1234"); // Simulate backend OTP

//   const handleEmailLogin = () => {
//     if (!email || !password) {
//       alert("Please enter email and password");
//       return;
//     }
//     // Simulate email/password login
//     console.log("Logged in with:", email);
//     setStep(2);
//   };

//   const handleSendOtp = () => {
//     if (!phone) {
//       alert("Please enter a valid phone number");
//       return;
//     }
//     console.log("Sending OTP to:", phone);
//     setStep(3);
//   };

//   const handleVerifyOtp = () => {
//     if (otp === serverOtp) {
//       alert("Login successful!");
//       // Navigate to dashboard or home
//     } else {
//       alert("Invalid OTP. Try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-red-200 p-4">
//       <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-xl border-black ">
//         <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

//         {step === 1 && (
//           <div className="space-y-7 mx-5">
//             <TextField
//               id="outlined-basic"
//               label="Enter email"
//               variant="outlined"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border rounded mb-4 text-xl"
//             />

//             <TextField
//               id="outlined-password-input"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border rounded mb-4 "
//               label="Enter password"
//               type="password"
//               autoComplete="current-password"
//             />

//             <button
//               onClick={handleEmailLogin}
//               className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//             >
//               Next
//             </button>
//           </div>
//         )}

//         {step === 2 && (
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Mobile Number
//             </label>
//             <PhoneInput
//               defaultCountry="IN"
//               value={phone}
//               onChange={setPhone}
//               className="mb-4"
//             />
//             <button
//               onClick={handleSendOtp}
//               className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//             >
//               Send OTP
//             </button>
//           </div>
//         )}

//         {step === 3 && (
//           <div>
//             <label className="block text-sm font-medium mb-2">Enter OTP</label>
//             <OtpInput
//               value={otp}
//               onChange={(val) => setOtp(val)}
//               numInputs={4}
//               inputStyle={{
//                 width: "3rem",
//                 height: "3rem",
//                 fontSize: "1.5rem",
//                 margin: "0 0.5rem",
//                 borderRadius: 4,
//                 border: "1px solid gray",
//               }}
//             />

//             <button
//               onClick={handleVerifyOtp}
//               className="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600"
//             >
//               Verify OTP
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import OtpInput from "react-otp-input";
import { TextField } from "@mui/material";

export default function AdminLogin() {
  //   const [step, setStep] = useState(1); // 1 for email/password, 2 for phone
  const [step, setStep] = useState(1); // 1: email & password, 2: phone, 3: OTP
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("1234"); // Simulate backend OTP

  const handleEmailLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    // Simulate email/password login
    console.log("Logged in with:", email);
    setStep(2);
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
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className=""
      >
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

          {step === 1 && (
            <div className="space-y-4 ">
              <div className="space-y-7 flex flex-col mx-10">
                <TextField
                  id="outlined-basic"
                  label="Enter email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                />

                <TextField
                  id="outlined-password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full  p-2 border rounded mb-4 "
                  label="Enter password"
                  type="password"
                  autoComplete="current-password"
                />

                <button
                  onClick={handleEmailLogin}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className=" "
            >
              <div className="mx-10 space-y-4">
                <label className="block text-sm font-medium mb-2">
                  Mobile Number
                </label>
                <PhoneInput
                  defaultCountry="IN"
                  value={phone}
                  onChange={setPhone}
                  className="mb-4 w-full border border-gray-300 rounded h-12"
                />
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
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
