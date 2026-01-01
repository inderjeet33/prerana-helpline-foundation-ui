import React, { useState } from "react";
import axios from "axios";

const SetPassword = () => {
  const [password, setPassword] = useState("");

  const savePassword = async () => {
    const token = localStorage.getItem("ngoTempToken");

    const res = await axios.post(
      "/auth/set-password",
      { password },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      localStorage.removeItem("ngoTempToken");
      localStorage.setItem("token", res.data.jwt);

      window.location.href = "/ngo/details";
    }
  };

  return (
    <div>
      <h2>Create Password</h2>
      <input 
        type="password" 
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={savePassword}>Save Password</button>
    </div>
  );
};

export default SetPassword;
