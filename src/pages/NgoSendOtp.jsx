import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NgoAuth.css";

export default function NgoSendOtp() {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      setLoading(true);
      await axios.post("/auth/send-otp", { mobile, userType: "NGO" });
      navigate("/ngo/verify-otp", { state: { mobile } });
    } catch (err) {
      alert(err.response?.data || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>NGO Registration</h2>
      <input
        type="text"
        placeholder="Enter mobile number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button onClick={sendOtp} disabled={loading}>
        {loading ? "Sending..." : "Send OTP"}
      </button>
    </div>
  );
}
