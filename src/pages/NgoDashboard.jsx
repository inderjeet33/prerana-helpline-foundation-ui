import React, { useEffect, useState } from "react";
import "./ngoDashboard.css";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/impact-hero.jpg"; // add any soft illustration

export default function NgoDashboard() {
  const navigate = useNavigate();
  const [stats,setStats] = useState(null);
  
  useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:8080/dashboard/ngo-stats", {
    headers: { Authorization: "Bearer " + token }
  })
    .then(res => res.json())
    .then(setStats);
    console.log(stats);
}, []);


console.log("ngo stats",stats);
  return (
    <div className="ngo-dashboard-container">

      {/* ===== HERO / WELCOME ===== */}
      <section className="ngo-hero">
        <div className="ngo-hero-text">
          <h1>Welcome back 👋</h1>
          <p>
            Your efforts are creating real change.  
            Manage donations, campaigns, and showcase your impact.
          </p>
        </div>

        <div className="ngo-hero-image">
          <img src={heroImg} alt="NGO impact" />
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="ngo-stats">
        <div className="ngo-stat">
          <h2>{stats?.completedDonations ?? "-"}</h2>
          <span>Donations Received</span>
        </div>
        <div className="ngo-stat">
          <h2>{stats?.campaigns ?? "-"}</h2>
          <span>Active Campaigns</span>
        </div>
        <div className="ngo-stat">
          <h2>900+</h2>
          <span>Lives Impacted</span>
        </div>
      </section>

      {/* ===== ACTION CARDS ===== */}
      <section className="ngo-cards">

        <div className="ngo-card" onClick={() => navigate("/ngo/profile")}>
          <div className="card-icon">📝</div>
          <h3>NGO Profile</h3>
          <p>View & update NGO information</p>
        </div>

        <div className="ngo-card" onClick={() => navigate("/ngo-donations")}>
          <div className="card-icon">🎁</div>
          <h3>Donations Received</h3>
          <p>Manage donation offers assigned to you</p>
        </div>

        <div className="ngo-card" onClick={() => navigate("/campaign/my-campaigns")}>
          <div className="card-icon">📢</div>
          <h3>Requests</h3>
          <p>Create and manage your campaigns</p>
        </div>

        <div className="ngo-card gallery" onClick={() => navigate("/ngo/gallery")}>
          <div className="card-icon">🖼️</div>
          <h3>Impact Gallery</h3>
          <p>Showcase stories & photos of change</p>
        </div>

      </section>
    </div>
  );
}
