
import { useEffect, useState } from "react";
import "./ModeratorDashboard.css";
import axios from "axios";

export default function ModeratorDashboard({ onNavigate }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/dashboard/moderator-stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load moderator stats", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="mod-dashboard">

      {/* ===== Header ===== */}
      <div className="mod-dash-header">
        <div>
          <h1>Moderator Control Panel</h1>
          <p>Monitor donations, NGOs & assignments in real time</p>
        </div>
      </div>

      {/* ===== Stats Grid (CLICKABLE) ===== */}
      <div className="mod-dash-stats">
        <div
          className="mod-dash-card blue clickable"
          onClick={() => onNavigate("offers")}
        >
          <div className="icon">🎁</div>
          <div>
            <h2>{stats?.totalOffers ?? 0}</h2>
            <span>Total Donation Offers</span>
          </div>
        </div>

        <div
          className="mod-dash-card orange clickable"
          onClick={() => onNavigate("offers")}
        >
          <div className="icon">⏳</div>
          <div>
            <h2>{stats?.unassignedOffers ?? 0}</h2>
            <span>Unassigned Offers</span>
          </div>
        </div>

        <div
          className="mod-dash-card green clickable"
          onClick={() => onNavigate("ngos")}
        >
          <div className="icon">🏢</div>
          <div>
            <h2>{stats?.totalNgos ?? 0}</h2>
            <span>Active NGOs</span>
          </div>
        </div>

        <div
          className="mod-dash-card purple clickable"
          onClick={() => onNavigate("history")}
        >
          <div className="icon">✅</div>
          <div>
            <h2>{stats?.completedOffersToday ?? 0}</h2>
            <span>Completed Today</span>
          </div>
        </div>
      </div>

      {/* ===== Quick Actions ===== */}
      <div className="mod-quick-actions">
        <h3>Quick Actions</h3>

        <div className="mod-actions-grid">
          <div
            className="action-card clickable"
            onClick={() => onNavigate("offers")}
          >
            <h4>Assign Donations</h4>
            <p>Review and assign pending donor offers to NGOs</p>
          </div>

          <div
            className="action-card clickable"
            onClick={() => onNavigate("ngos")}
          >
            <h4>Review NGOs</h4>
            <p>View verified NGOs and assignment capacity</p>
          </div>

          <div
            className="action-card clickable"
            onClick={() => onNavigate("history")}
          >
            <h4>Track History</h4>
            <p>Monitor completed & reassigned donations</p>
          </div>
        </div>
      </div>

      {/* ===== System Note ===== */}
      <div className="mod-system-note">
        ⚡ System running smoothly. No pending alerts.
      </div>
    </div>
  );
}
