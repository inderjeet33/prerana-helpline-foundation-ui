import { useEffect, useState } from "react";
import "./Moderator.css";

export default function ModeratorCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:8080/moderator/campaigns?status=PENDING_FOR_APPROVAL",
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      const data = await res.json();
      setCampaigns(data || []);
    } catch (e) {
      console.error("Failed to load campaigns", e);
    } finally {
      setLoading(false);
    }
  }

  async function approveCampaign(id) {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:8080/moderator/campaigns/${id}/approve`, {
      method: "PATCH",
      headers: { Authorization: "Bearer " + token },
    });

    alert("Campaign approved");
    setSelected(null);
    loadCampaigns();
  }

  async function rejectCampaign(id) {
    if (!rejectReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:8080/moderator/campaigns/${id}/reject`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ reason: rejectReason }),
    });

    alert("Campaign rejected");
    setSelected(null);
    setRejectReason("");
    loadCampaigns();
  }

  if (loading) return <p>Loading campaigns...</p>;

  return (
    <div className="mod-table-wrapper">
      <div className="mod-header">
        <h2>Campaign Approvals</h2>
        <p>Review NGO campaigns before they go public</p>
      </div>

      <table className="mod-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>NGO</th>
            <th>Goal</th>
            <th>City</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={c.id} className="clickable-row">
              <td>{c.title}</td>
              <td>{c.ownerName}</td>
              <td>₹{c.targetAmount}</td>
              <td>{c.city}</td>
              <td>
                <span className="status-badge status-in_progress">
                  {c.status}
                </span>
              </td>
              <td
                className="view-cell view-link"
                onClick={() => setSelected(c)}
              >
                Review →
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {selected && (
        <div className="mod-modal-overlay">
          <div className="mod-modal">
            <div className="mod-modal-header">
              <h3>Campaign Review</h3>
              <button onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className="mod-modal-content">
              <h4>{selected.title}</h4>
              <p className="wrap-text">{selected.description}</p>

              <div className="ngo-details-grid">
                <div>
                  <span>NGO</span>
                  {selected.ownerName}
                </div>
                <div>
                  <span>Contact</span>
                  {selected.mobileNumber}
                </div>
                <div>
                  <span>City</span>
                  {selected.city}
                </div>
                <div>
                  <span>Target</span>
                  ₹{selected.targetAmount}
                </div>
              </div>

              {selected.imageUrl && (
                <>
                  <h4 className="section-title">Campaign Image</h4>
                  <div className="impact-gallery">
                    <img
                      src={`http://localhost:8080${selected.imageUrl}`}
                      alt="campaign"
                    />
                  </div>
                </>
              )}

              <div className="ngo-action-bar">
                <button
                  className="verify-btn"
                  onClick={() => approveCampaign(selected.id)}
                >
                  Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() => rejectCampaign(selected.id)}
                >
                  Reject
                </button>
              </div>

              <textarea
                placeholder="Rejection reason (required if rejecting)"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
