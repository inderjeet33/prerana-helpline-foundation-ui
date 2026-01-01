import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // CHECK PATH

// import refreshUser from "../context/AuthContext"
import "./NgoAuth.css";

export default function NgoLogin() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
    const { refreshUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (mobile.length !== 10) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:8080/auth/login", {
        mobileNumber: mobile,
        password,
        userType: "NGO"
      });

      console.log(res);   
      localStorage.setItem("token", res.data.token);

      console.log("await refresh user is ",refreshUser);
      await refreshUser();
      alert("Login successful!");
      navigate("/ngo-dashboard");

    } catch (err) {
      console.log(err);
      alert(err.response?.data || "Invalid mobile or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        
        <h2 className="auth-title">NGO Login</h2>
        <p className="auth-subtitle">Access your NGO dashboard</p>

        <input
          className="auth-input"
          type="text"
          placeholder="Mobile Number"
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

        <button className="auth-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          className="back-link"
          onClick={() => navigate("/ngo-auth")}
        >
          Create NGO Account
        </p>
        <p
          className="back-link"
          onClick={() => navigate("/")}
        >
          Home
        </p>
      </div>
    </div>
  );
}
