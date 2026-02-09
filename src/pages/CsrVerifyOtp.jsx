// NgoVerifyOtp.jsx
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./NgoAuth.css";

export default function CsrVerifyOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const mobile = location.state?.mobile;

  const verifyOtp = async () => {
    try {
      setLoading(true);
      console.log("Location State:", location.state);
console.log("Received mobile:", mobile);
localStorage.setItem("csrMobile", mobile);

      const res = await axios.post("http://localhost:8080/auth/verify-otp", {
        mobileNumber : mobile,
        otp,
        userType: "CSR"
      });

      const { token } = res.data;
      localStorage.setItem("csrTempToken", token);

      navigate("/csr/set-password");
    } catch (err) {
      alert(err.response?.data || "Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Verify OTP</h2>
        <p className="auth-subtitle">OTP sent to {mobile}</p>

        <input
          type="text"
          className="auth-input"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button className="auth-btn" onClick={verifyOtp} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div
          className="back-link"
          onClick={() => navigate("/csr-auth")}
        >
          Go Back
        </div>
      </div>
    </div>
  );
}
