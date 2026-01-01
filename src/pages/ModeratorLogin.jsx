import React, { useState } from "react";
import axios from "axios";
import "./ModeratorLogin.css";

export default function ModeratorLogin() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        mobileNumber: mobile,
        password,
        userType:"MODERATOR"
      });

      console.log(res);
      const { token, role } = res.data;

      if (role !== "MODERATOR") {
        setError("Access denied. You are not a moderator.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      window.location.href = "/moderator-dashboard";
    } catch (err) {
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div className="mod-login-container">
      <div className="mod-login-box">
        <h2 className="mod-login-title">🛡 Moderator Login</h2>
        <p className="mod-login-subtitle">
          Access restricted to authorized moderators only.
        </p>

        {error && <p className="mod-login-error">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mod-input-group">
            <label>Mobile Number</label>
            <input
              type="text"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
            />
          </div>

          <div className="mod-input-group">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <button className="mod-login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
