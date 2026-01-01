import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
  

const NgoDetailsForm = () => {
  const [ngo, setNgo] = useState({
    registrationNumber: "",
    ngoType: "",
    address: "",
    city: "",
    domain: ""
  });

  const handleChange = (e) => {
    setNgo({ ...ngo, [e.target.name]: e.target.value });
  };

  const saveDetails = async () => {
    const res = await axios.post("/ngo/details", ngo, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    if (res.data.success) {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="dashboard-container">
    <div>
      <h2>NGO Details</h2>

      <input name="registrationNumber" placeholder="Registration Number" onChange={handleChange} />
      <input name="ngoType" placeholder="NGO Type (Trust / Society)" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />
      <input name="city" placeholder="City" onChange={handleChange} />
      <input name="domain" placeholder="Domain of Work" onChange={handleChange} />

      <button onClick={saveDetails}>Submit</button>
    </div>
    </div>
  );
};

export default NgoDetailsForm;
