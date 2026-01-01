import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";
import { AuthContext } from "../context/AuthContext";

export default function DonorAuth() {
  const navigate = useNavigate();
  const { refreshUser } = useContext(AuthContext);
  const [error, setError] = useState("");


  const [mode, setMode] = useState("select");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const BASE_URL = "http://localhost:8080/auth";

  // ------------------ SEND OTP ------------------
  const handleSendOtp = async () => {
    if (mobile.length !== 10) {
     
    setError("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/send-otp`, { mobileNumber: mobile });
      alert("OTP sent successfully");
      setMode("verify");
      setError("");
    } catch (err) {
      console.log(err);
      setError(
      err.response?.data?.message ||
      "Failed to send OTP"
    );
    }
  };

  // ------------------ VERIFY OTP ------------------
 const handleVerifyOtp = async () => {
  setError("");

  try {
    await axios.post(`${BASE_URL}/verify-otp`, {
      mobileNumber: mobile,
      otp,
    });

    navigate("/set-password", { state: { mobile } });
  } catch (err) {
    console.log(err);
    setError(
      err.response?.data?.message || "Invalid OTP. Please try again."
    );
  }
};


  // ------------------ LOGIN ------------------
  const handleLogin = async () => {
  setError("");

  try {
    const res = await axios.post(`${BASE_URL}/login`, {
      mobileNumber: mobile,
      password,
      userType: "INDIVIDUAL",
    });

  
    console.log(res.data);
    localStorage.setItem("token", res.data.token);
    await refreshUser();
    navigate("/dashboard");

  } catch (err) {
    console.log(err);
    setError(
      err.response?.data?.message ||
      "Invalid mobile number or password"
    );
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        {error && <div className="auth-error">{error}</div>}

        
        {/* SELECT MODE */}
        {mode === "select" && (
          <>
          <h2 className="auth-title">Welcome Back 🌱</h2>
<p className="auth-subtitle">
  Continue your journey of compassion and impact
</p>

                      <button className="auth-btn" onClick={() => setMode("login")}>
              Login
            </button>
            <button className="auth-btn secondary" onClick={() => setMode("otp")}>
              Signup
            </button>
            <button className="auth-btn secondary" onClick={() => navigate("/")}>Home</button>
          </>
        )}

        {/* LOGIN */}
        {mode === "login" && (
          <>
          <h2 className="auth-title">Login</h2>
            <input
              className="auth-input"
              placeholder="Mobile"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="auth-btn" onClick={handleLogin}>
              Login
            </button>
            <p
  className="small-link"
  onClick={() => setMode("select")}
>
  ← New user? Signup
</p>

          </>
        )}

        {/* SIGNUP */}
        {mode === "otp" && (
          <>
<h2 className="auth-title">Signup</h2>

            <input
              className="auth-input"
              placeholder="Mobile"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <button className="auth-btn" onClick={handleSendOtp}>
              Send OTP
            </button>
            <p
  className="small-link"
  onClick={() => setMode("select")}
>
  ← Already have an account? Login
</p>

          </>
        )}

        {/* VERIFY OTP */}
        {mode === "verify" && (
          <>
<h2 className="auth-title">Verify OTP</h2>

            <input
              className="auth-input"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button className="auth-btn" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
            <p
  className="small-link"
  onClick={() => setMode("otp")}
>
  ← Change mobile number
</p>

          </>
        )}
      </div>
    </div>
  );
}
