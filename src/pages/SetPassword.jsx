import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const mobile = state?.mobile;


  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const BASE_URL = "http://localhost:8080/auth";

  const handleSetPassword = async () => {
    if (!password || !confirmPassword) {
      alert("Please enter both passwords");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/set-password`, {
        mobileNumber: mobile,
        password: password
      });

      alert("Password set successfully");
      navigate("/donor-details", { state: { mobile,password} });

    } catch (err) {
      console.error(err);
      alert("Failed to set password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Password</h2>

        <input
          className="auth-input"
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleSetPassword}>
          Continue
        </button>
      </div>
    </div>
  );
}
