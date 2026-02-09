
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NgoAuth.css";

export default function CsrSendOtp() {
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
      await axios.post("http://localhost:8080/auth/send-otp", { mobileNumber : mobile, userType: "CSR" });
      navigate("/csr/verify-otp", { state: { mobile } });
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

        <h2 className="auth-title">CSR Registration</h2>
        <p className="auth-subtitle">Register your CSR mandate Company to continue</p>

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
          onClick={() => navigate("/csr-login")}
        >
          Existing User? Login
        </div>

      </div>
    </div>
  );
}
