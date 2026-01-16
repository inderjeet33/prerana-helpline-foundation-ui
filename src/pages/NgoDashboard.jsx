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

    {/* ===== HERO ===== */}
    <section className="ngo-hero ngo-hero-premium">
      <div className="ngo-hero-text">

        <div className="ngo-header-row">
          <h1>Welcome back 👋</h1>

          {stats?.activationStatus && (
            <div
              className={`ngo-status-pill ${
                stats.activationStatus === "VERIFIED"
                  ? "verified"
                  : stats.activationStatus === "REJECTED"
                  ? "rejected"
                  : "pending"
              }`}
            >
              <span className="dot" />
              {stats.activationStatus.replace("_", " ")}
            </div>
          )}
        </div>

        <p className="ngo-hero-subtext">
          Manage your NGO profile, track donations, and showcase the impact
          you’re creating in the community.
        </p>
      </div>

      <div className="ngo-hero-image">
        <img src={heroImg} alt="NGO impact" />
      </div>
    </section>

    {/* ===== REJECTION BANNER ===== */}
    {stats?.activationStatus === "REJECTED" && (
      <section className="ngo-rejection-banner premium">
        <div className="icon">❌</div>

        <div className="content">
          <h3>Profile Rejected</h3>

          <p className="reason">
            <strong>Reason:</strong> {stats.rejectedReason}
          </p>

          <p className="hint">
            Update your NGO profile with correct information and resubmit it
            for verification.
          </p>

          <button
            className="resubmit-btn"
            onClick={() => navigate("/ngo/profile")}
          >
            ✏️ Fix & Resubmit Profile
          </button>
        </div>
      </section>
    )}

    {/* ===== STATS ===== */}
    <section className="ngo-stats premium">
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
    <section className="ngo-cards premium">
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
