import React, { useState } from "react";
import axios from "axios";

const NgoSignup = () => {
  const [form, setForm] = useState({
    name: "",
    ngoName: "",
    mobileNumber: ""
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const BASE_URL = "http://localhost:8080/auth";

  const handleSubmit = async () => {
    try{
    console.log(form);
    const res = await axios.post(`${BASE_URL}/send-otp`, {mobileNumber : form.mobileNumber});
    console.log(res);
    localStorage.setItem("ngoMobile", form.mobileNumber);
    window.location.href = "/ngo/verify-otp";
    }catch(err){
    alert("Failed to send OTP");}
  };

  return (
    <div className="signup-container">
  
      <h2>NGO Registration</h2>

      <input name="name" placeholder="Your Full Name" onChange={handleChange} />
      <input name="ngoName" placeholder="NGO Name" onChange={handleChange} />
      <input name="mobileNumber" placeholder="Mobile Number" onChange={handleChange} />

      <button onClick={handleSubmit}>Send OTP</button>
    </div>
  );
};

export default NgoSignup;
