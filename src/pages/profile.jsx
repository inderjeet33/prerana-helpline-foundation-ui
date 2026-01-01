import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

import { useLocation, useNavigate } from "react-router-dom";

import "./profile.css";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [form, setForm] = useState({
  fullName: user?.name || "",
  email: user?.email || "",
  mobileNumber: user?.mobile || "",
  address: user?.address || "",
  profession: user?.profession || "",
  city: user?.city || "",
  state: user?.state || "",
  pincode: user?.pinCode || "",
});


    useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8080/user/me", {
          headers: { Authorization: "Bearer " + token },
        });
        const data = await res.json();
        console.log("response in profile user ",data);
        setForm({
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pinCode || "",
          profession: data.profession || "",
        });
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    fetchProfile();
  }, [token]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchProfile = async() => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:8080/user/profile",{
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            Authorization: "Bearer "+token,
        }
    });
  }

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:8080/user/profile/complete", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(form),
    });

    alert("Profile updated successfully");
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <Sidebar/>
      <div className="profile-page">
      <div className="profile-hero">
    <h1>Your Profile</h1>
    <p>
      Every detail you share helps us build trust,
      transparency and greater impact 🌱
    </p>
  </div>
      <div className="profile-container">
        <div className="profile-card">
          <h2>My Profile</h2>

<div className="profile-section">
  <h4>Personal Information</h4>

  <div className="field">
    <label>Full Name</label>
    <input value={user.name} disabled />
  </div>

  <div className="field">
    <label>Mobile Number</label>
    <input value={user.mobile} disabled />
  </div>

  <div className="field">
    <label>Email</label>
    <input value={user.email || ""} disabled />
  </div>
  </div>
          {/* ADDITIONAL INFO */}
          <div className="profile-section">
            <h4>Additional Details</h4>

            <div className="field">
              <label>Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Profession</label>
              <input
                name="profession"
                value={form.profession}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>State</label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>pincode</label>
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
              />
            </div>
            
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
