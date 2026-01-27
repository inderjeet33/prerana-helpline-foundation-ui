import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./HelpRequestHistory.css";

function getHelpIcon(type) {
  switch (type) {
    case "FINANCIAL": return "💰";
    case "FOOD": return "🍲";
    case "CLOTHES": return "👕";
    case "BOOKS": return "📚";
    case "MEDICAL": return "🩺";
    default: return "🆘";
  }
}

export default function HelpRequestHistory() {
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
      const res = await fetch("http://localhost:8080/help-requests/my", {
        headers: { Authorization: "Bearer " + token }
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      setRequests(data || []);
    } catch {
      setError("Unable to load your help requests.");
    } finally {
      setLoading(false);
    }
  }

  const cancelRequest = async (id) => {
    if (!window.confirm("Cancel this help request?")) return;

    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8080/help-requests/${id}/cancel`, {
      method: "PUT",
      headers: { Authorization: "Bearer " + token }
    });

    loadRequests();
  };

  return (
    <div className="help-history-page">
      <Navbar />
      <Sidebar />

      <div className="with-sidebar">
        <div className="help-container">

          <div className="help-header">
            <h1>My Help Requests</h1>
            <p>
              Requests you’ve raised for support — we’re here with you.
            </p>
          </div>

          {loading && <div className="help-loader">Loading…</div>}
          {error && <div className="help-error">{error}</div>}

          <div className="help-grid">
            {requests.map(r => (
              <div
                key={r.id}
                className="help-card"
                onClick={() => setSelected(r)}
              >
                <div className="help-card-top">
                  <div className="help-type">
                    {getHelpIcon(r.helpType)} {r.helpType}
                  </div>

                  <span className={`help-status ${r.status?.toLowerCase()}`}>
                    {r.status}
                  </span>
                </div>

                <div className="help-category">
                  {r.donationCategory}
                </div>

                <div className="help-meta">
                  <div>
                    <span>Location</span>
                    <strong>{r.location || "Not specified"}</strong>
                  </div>

                  <div>
                    <span>Timeline</span>
                    <strong>{r.timeLine}</strong>
                  </div>
                </div>

                {r.reason && (
                  <p className="help-reason">
                    “{r.reason.slice(0, 120)}{r.reason.length > 120 && "..."}”
                  </p>
                )}

                {r.status === "OPEN" && (
                  <div className="help-actions">
                    <button
                      className="help-cancel-btn"
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

      {/* DETAIL MODAL */}
      {selected && (
        <div className="help-modal-overlay" onClick={() => setSelected(null)}>
          <div className="help-modal" onClick={e => e.stopPropagation()}>
            <div className="help-modal-header">
              <h2>Help Request Details</h2>
              <button onClick={() => setSelected(null)}>✖</button>
            </div>

            <div className="help-modal-grid">
              <div><strong>Type:</strong> {selected.helpType}</div>
              <div><strong>Category:</strong> {selected.donationCategory}</div>
              <div><strong>Status:</strong> {selected.status}</div>
              <div><strong>Timeline:</strong> {selected.timeLine}</div>
              <div><strong>Location:</strong> {selected.location || "N/A"}</div>
              <div><strong>Preferred Contact:</strong> {selected.preferredContact}</div>

              {selected.amount && (
                <div><strong>Amount:</strong> ₹{selected.amount}</div>
              )}

              {selected.itemDetails && (
                <>
                  <div><strong>Items:</strong> {selected.itemDetails}</div>
                  <div><strong>Quantity:</strong> {selected.quantity || "N/A"}</div>
                </>
              )}
            </div>

            {selected.reason && (
              <div className="help-modal-reason">
                <strong>Reason</strong>
                <p>{selected.reason}</p>
              </div>
            )}

            {selected.receiverName && (
              <div className="help-assigned">
                <h4>Helping You</h4>
                <p>{selected.receiverName}</p>
                {selected.receiverMobile && <p>📞 {selected.receiverMobile}</p>}
                {selected.receiverEmail && <p>📧 {selected.receiverEmail}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
