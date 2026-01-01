import React, { useState } from "react";
import axios from "axios";

const NgoOtpVerify = () => {
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    const mobileNumber = localStorage.getItem("ngoMobile");

    try{
    console.log(mobileNumber);
    const res = await axios.post("http://localhost:8080/auth/verify-otp", {
      mobileNumber,
      otp
    });
      localStorage.setItem("ngoTempToken", res.data.tempToken);
      window.location.href = "/ngo/set-password";
    }catch(err){
        alert("Error while verifying the otp, please try again");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} />
      <button onClick={verifyOtp}>Verify OTP</button>
    </div>
  );
};

export default NgoOtpVerify;
