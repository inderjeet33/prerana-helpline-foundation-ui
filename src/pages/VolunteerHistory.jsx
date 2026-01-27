import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./DonationHistory.css";   // Reuse same CSS

function getVolunteerIcon(type) {
  switch (type) {
    case "TEACHING": return "📚 Teaching";
    case "CLEANING": return "🧹 Cleaning";
    case "COOKING": return "🍳 Cooking";
    case "GARDENING": return "🌱 Gardening";
    case "EVENT_SUPPORT": return "🎪 Event Support";
    case "MEDICAL_HELP": return "🩺 Medical Help";
    default: return "🤝 Volunteering";
  }
}

export default function VolunteerHistory() {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/volunteer/my-requests", {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
      });

      if (!res.ok) {
        setError("Failed to load volunteer history.");
        return;
      }

      const data = await res.json();
      setRequests(data);
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const cancelRequest = async (id) => {
    if (!window.confirm("Cancel this volunteer request?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8080/volunteer/${id}/cancel`,
        {
          method: "PUT",
          headers: { Authorization: "Bearer " + token },
        }
      );

      if (!res.ok) {
        alert("Unable to cancel request.");
        return;
      }

      loadRequests();
    } catch {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="history-page">
      <Navbar />
      <Sidebar />

      <div className="with-sidebar">
        <div className="hp-container">

          <div className="hp-header hp-header-row">
            <div>
              <h1>My Volunteer Requests</h1>
              <p>Your journey of service, beautifully organized.</p>
            </div>
          </div>

          {loading && <div className="hp-loader">Loading your requests…</div>}
          {error && <div className="hp-error">{error}</div>}

          <div className="hp-list">
            {requests.map((r) => (
              <div
                className="hp-card clickable"
                key={r.id}
                onClick={() => setSelected(r)}
              >

                <div className="hp-card-header">
                  <div>
                    <h3>{getVolunteerIcon(r.volunteerType)}</h3>
                    <span className="hp-category">{r.availability}</span>
                  </div>

                  <span className={`hp-status ${r.status?.toLowerCase()}`}>
                    {r.status}
                  </span>
                </div>

                <div className="hp-details">

                  <div className="hp-detail-item">
                    <span className="hp-label">Volunteer Type</span>
                    <span className="hp-text">{r.volunteerType}</span>
                  </div>

                  <div className="hp-detail-item">
                    <span className="hp-label">Skills</span>
                    <span className="hp-text">
                      {r.skills || "Not specified"}
                    </span>
                  </div>

                  <div className="hp-detail-item">
                    <span className="hp-label">Location</span>
                    <span className="hp-text">
                      {r.location || "Not specified"}
                    </span>
                  </div>

                  <div className="hp-detail-item">
                    <span className="hp-label">Contact</span>
                    <span className="hp-text">{r.preferredContact}</span>
                  </div>
                </div>

                {r.reason && (
                  <div className="hp-reason">
                    <h4>Reason</h4>
                    <p>{r.reason}</p>
                  </div>
                )}

                {(r.status === "OPEN" || r.status === "ASSIGNED") && (
                  <div className="hp-cancel-wrapper">
                    <button
                      className="hp-cancel-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        cancelRequest(r.id);
                      }}
                    >
                      Cancel Request
                    </button>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FULL DETAIL MODAL */}
      {selected && (
        <div className="hp-modal-overlay" onClick={() => setSelected(null)}>
          <div className="hp-modal" onClick={(e) => e.stopPropagation()}>

            <div className="hp-modal-header">
              <h2>Volunteer Request Details</h2>
              <button onClick={() => setSelected(null)}>✖</button>
            </div>

            <div className="hp-modal-grid">
              <div><strong>Type:</strong> {selected.volunteerType}</div>
              <div><strong>Availability:</strong> {selected.availability}</div>
              <div><strong>Skills:</strong> {selected.skills || "N/A"}</div>
              <div><strong>Location:</strong> {selected.location || "N/A"}</div>
              <div><strong>Contact:</strong> {selected.preferredContact}</div>
              <div><strong>Status:</strong> {selected.status}</div>
            </div>

            {selected.reason && (
              <div className="hp-modal-reason">
                <strong>Reason:</strong>
                <p>{selected.reason}</p>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
