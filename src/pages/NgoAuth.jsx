// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./auth.css";
// import "./NgoDashboard";
// export default function NgoAuth() {
//   const navigate = useNavigate();

//   const [mode, setMode] = useState("login");  
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");

//   const BASE_URL = "http://localhost:8080/auth";

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(`${BASE_URL}/login`, {
//         mobileNumber: mobile,
//         password,
//         "userType":"NGO"
//       });

//       if (res.data) {
//         localStorage.setItem("token", res.data);
    
//         navigate("/ngo-dashboard");
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (err) {
//       alert("Login failed");
//     }
//   };

//   const handleSendOtp = async () => {
//     if (mobile.length !== 10) {
//       alert("Enter valid mobile number");
//       return;
//     }
//     try {
//       await axios.post(`${BASE_URL}/send-otp`, { mobileNumber: mobile });
//       setMode("verify");
//       alert("OTP sent to NGO mobile");
//     } catch {
//       alert("Failed to send OTP");
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       await axios.post(`${BASE_URL}/verify-otp`, {
//         mobileNumber: mobile,
//         otp,
//       });

//       navigate("/ngo-set-password", { state: { mobile } });
//     } catch {
//       alert("Invalid OTP");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">

//         <h2 className="auth-title">NGO Portal</h2>

//         {mode === "login" && (
//           <>
//             <p className="auth-subtext">Login to manage your NGO profile & campaigns</p>

//             <input
//               className="auth-input"
//               placeholder="Registered Mobile"
//               maxLength={10}
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//             />

//             <input
//               className="auth-input"
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <button className="auth-btn" onClick={handleLogin}>
//               Login
//             </button>

//             <p className="auth-link" onClick={() => setMode("signup")}>
//               New NGO? Register →
//             </p>
//           </>
//         )}

//         {mode === "signup" && (
//           <>
//             <h3>NGO Registration</h3>

//             <input
//               className="auth-input"
//               placeholder="NGO Mobile"
//               maxLength={10}
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//             />

//             <button className="auth-btn" onClick={handleSendOtp}>
//               Send OTP
//             </button>

//             <p className="auth-link" onClick={() => setMode("login")}>
//               Back to Login
//             </p>
//           </>
//         )}

//         {mode === "verify" && (
//           <>
//             <h3>Verify NGO Mobile</h3>

//             <input
//               className="auth-input"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />

//             <button className="auth-btn" onClick={handleVerifyOtp}>
//               Verify OTP
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NgoAuth.css";

export default function NgoSendOtp() {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (mobile.length !== 10) {
      alert("Enter valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:8080/auth/send-otp", { mobileNumber : mobile, userType: "NGO" });
      navigate("/ngo/verify-otp", { state: { mobile } });
    } catch (err) {
      console.log(err.response);
      alert(err.response?.data.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <h2 className="auth-title">NGO Registration</h2>
        <p className="auth-subtitle">Register your NGO to continue</p>

        <input
          className="auth-input"
          type="text"
          placeholder="Enter mobile number"
          maxLength={10}
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <button className="auth-btn" onClick={sendOtp} disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </button>

        <div
          className="back-link"
          onClick={() => navigate("/ngo-login")}
        >
          Existing User? Login
        </div>

      </div>
    </div>
  );
}
