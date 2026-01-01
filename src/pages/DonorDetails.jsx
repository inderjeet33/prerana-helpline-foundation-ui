// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function DonorDetails() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // receive mobile + password from previous screen
//   const { mobile, password } = location.state || {};

//   if (!mobile || !password) {
//     return <>Invalid signup flow. Mobile or password missing.</>;
//   }

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   const handleSignup = async () => {
//     try {
//       const response = await axios.post("http://localhost:8080/auth/signup", {
//         mobileNumber: mobile,
//         password: password,
//         name: name,
//         email: email,
//         userType : "INDIVIDUAL"
//       });

//       alert("Signup successful");
//       console.log("signup  successful redirecting to dashboard");
//       navigate("/donor-auth");

//     } catch (error) {
//       console.error(error);
//       alert("Signup failed");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2 className="auth-title">Your Details</h2>

//         <input
//           className="auth-input"
//           type="text"
//           placeholder="Full name"
//           value={name}
//           onChange={(e) => setName(e.target.value)} man
//         />

//         <input
//           className="auth-input"
//           type="email"
//           placeholder="Email address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <button className="auth-btn" onClick={handleSignup}>
//           Complete Signup
//         </button>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DonorDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mobile, password } = location.state || {};

  if (!mobile || !password) {
    return <>Invalid signup flow. Mobile or password missing.</>;
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const isFormValid = name.trim() !== "" && email.trim() !== "";

  const handleSignup = async () => {
    if (!isFormValid) {
      setError("Name and Email are required");
      return;
    }

    try {
      await axios.post("http://localhost:8080/auth/signup", {
        mobileNumber: mobile,
        password,
        name,
        email,
        userType: "INDIVIDUAL",
      });

      navigate("/donor-auth");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Your Details</h2>

        {error && <div className="auth-error">{error}</div>}

        <label className="input-label">
          Full Name <span className="required">*</span>
        </label>
        <input
          className={`auth-input ${!name && error ? "input-error" : ""}`}
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="input-label">
          Email Address <span className="required">*</span>
        </label>
        <input
          className={`auth-input ${!email && error ? "input-error" : ""}`}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          className="auth-btn"
          disabled={!isFormValid}
          onClick={handleSignup}
        >
          Complete Signup
        </button>
      </div>
    </div>
  );
}
