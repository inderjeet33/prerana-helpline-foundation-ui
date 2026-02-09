import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./NgoAuth.css";

export default function CsrBasicInfo() {
  const location = useLocation();
  const navigate = useNavigate();

  const { mobile, password } = location.state || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!mobile || !password) {
    return (
      <div className="auth-wrapper">
        <div className="auth-card">
          <h3>Error</h3>
          <p>Missing mobile or password. Restart registration.</p>
        </div>
      </div>
    );
  }

  const handleSignup = async () => {
    if (!name.trim()) {
      alert("Enter CSR contact person name");
      return;
    }
    if (!email.trim()) {
      alert("Enter email");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:8080/auth/signup", {
        mobileNumber: mobile,
        password,
        userType: "CSR",
        name,
        email,
        firstName: null,
        lastName: null
      });

      alert("Signup completed! Please login.");
      navigate("/csr-auth");

    } catch (err) {
      console.log("here",err);
      alert(err.response?.data || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Complete CSR Signup</h2>
        <p className="auth-subtitle">
          Enter your basic details to finish registration.
        </p>

        <input
          className="auth-input"
          type="text"
          placeholder="Your Name (Contact Person)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="auth-input"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="auth-btn" onClick={handleSignup} disabled={loading}>
          {loading ? "Creating Account..." : "Finish Signup"}
        </button>

        <p className="back-link" onClick={() => navigate("/csr-auth")}>
          Back to Login
        </p>
      </div>
    </div>
  );
}
