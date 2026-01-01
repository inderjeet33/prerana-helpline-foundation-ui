// // NgoSetPassword.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import "./NgoAuth.css";

// export default function NgoSetPassword() {
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
  
// let mobile = location.state?.mobile || localStorage.getItem("ngoMobile");

//   const savePassword = async () => {
//     try {
//       setLoading(true);

//       console.log(mobile);
//       await axios.post(
//         "http://localhost:8080/auth/set-password",
//         { mobileNumber : mobile,password }      );

//       alert("Password set successfully!");
//       navigate("/ngo/basic-info", {
//   state: {
//     mobile: mobile,
//     password
//   }
// });
//     } catch (err) {
//         console.log(err);
//       alert(err.response?.data || "Error setting password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-card">
//         <h2 className="auth-title">Create Password</h2>
//         <p className="auth-subtitle">Set a secure password for your account</p>

//         <input
//           type="password"
//           className="auth-input"
//           placeholder="Create password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="auth-btn" onClick={savePassword} disabled={loading}>
//           {loading ? "Saving..." : "Save Password"}
//         </button>

//         <div
//           className="back-link"
//           onClick={() => window.history.back()}
//         >
//           Go Back
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./NgoAuth.css";

export default function NgoSetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const mobile =
    location.state?.mobile || localStorage.getItem("ngoMobile");

  const savePassword = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setError("");
      setLoading(true);

      await axios.post("http://localhost:8080/auth/set-password", {
        mobileNumber: mobile,
        password,
      });

      alert("Password set successfully!");

      navigate("/ngo/basic-info", {
  state: {
    mobile: mobile,
    password
  }});
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
          "Error setting password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Create Password</h2>
        <p className="auth-subtitle">
          Set a secure password for your account
        </p>

        <input
          type="password"
          className="auth-input"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="auth-input"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <div className="auth-error">{error}</div>}

        <button
          className="auth-btn"
          onClick={savePassword}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Password"}
        </button>

        <div
          className="back-link"
          onClick={() => window.history.back()}
        >
          Go Back
        </div>
      </div>
    </div>
  );
}
