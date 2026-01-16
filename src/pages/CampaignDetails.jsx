
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./campaign.css";
import { AuthContext } from "../context/AuthContext";

export default function CampaignDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [campaign, setCampaign] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  const [updates, setUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState("");

  useEffect(() => {
    loadCampaign();
    loadUpdates();
  }, []);

  async function loadUpdates() {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/campaigns/${id}/updates`, {
      headers: token ? { Authorization: "Bearer " + token } : {}
    });
    const data = await res.json();
    setUpdates(data);
  }

  async function loadCampaign() {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/campaigns/${id}`, {
      headers: token ? { Authorization: "Bearer " + token } : {},
    });

    const data = await res.json();
    setCampaign(data);
    setEditForm(data);
  }

  async function addUpdate() {
    if (!newUpdate.trim()) return;

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:8080/campaigns/${id}/updates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ message: newUpdate })
    });

    setNewUpdate("");
    loadUpdates();
  }

  async function markCompleted() {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:8080/campaigns/${campaign.id}/complete`, {
      method: "PATCH",
      headers: { Authorization: "Bearer " + token }
    });

    alert("Campaign marked as completed");
    loadCampaign();
  }

  async function saveChanges() {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:8080/campaigns/${campaign.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(editForm)
    });

    alert("Campaign updated successfully");
    setIsEditing(false);
    loadCampaign();
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert("Campaign link copied!");
  }

  if (!campaign) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  const isOwner = campaign.ownerId === user?.id;

  // 🔢 Progress Insights (Demo)
  const today = new Date();
  const deadline = new Date(campaign.deadline);
  const daysLeft = Math.max(0, Math.ceil((deadline - today) / (1000 * 60 * 60 * 24)));

  // const completionPercent = 30; // demo
  // const demoRaised = Math.round((completionPercent / 100) * campaign.targetAmount);
  const raised = campaign.raisedAmount || 0;
const completionPercent = Math.min(100, (raised / campaign.targetAmount) * 100);


  // 🌍 Impact Metrics (Demo)
  const impact = {
    beneficiaries: 320,
    volunteers: 18,
    kits: 150,
    areas: 5
  };

  return (
    <div className="campaign-detail-wrapper">

      {/* TOP SECTION */}
      <div className="campaign-top">

        <div className="campaign-image-box">
          <img
            src={`http://localhost:8080${campaign.imageUrl}`}
            alt={campaign.title}
          />
        </div>

        <div className="campaign-summary">
          <h1>{campaign.title}</h1>

          <span className={`badge status-${campaign.status?.toLowerCase() || "open"}`}>
            {campaign.status || "OPEN"}
          </span>

          <p className="campaign-goal">
            🎯 Target Amount: ₹{campaign.targetAmount}
          </p>

          {/* <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${completionPercent}%` }}
            />
          </div> */}

          <div className="progress-bar">
  <div
    className="progress-bar-fill"
    style={{ width: `${completionPercent}%` }}
  />
</div>


          <p style={{ color: "#666", fontSize: "0.95rem" }}>
            Category: <strong>{campaign.category}</strong> •  
            Urgency: <strong>{campaign.urgency}</strong>
          </p>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button className="campaign-update-btn" onClick={copyLink}>
              Copy Campaign Link
            </button>

            {isOwner && !isEditing && (
              <>
                <button className="campaign-update-btn" onClick={() => setIsEditing(true)}>
                  Edit Campaign
                </button>

                <button className="campaign-update-btn" onClick={markCompleted}>
                  Mark as Completed
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* EDIT FORM */}
      {isEditing && (
        <div className="edit-campaign-card">
          <h4 className="edit-title">Edit Campaign</h4>

          <div className="edit-grid">
            <div className="edit-field">
              <label>Title</label>
              <input
                value={editForm.title || ""}
                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
              />
            </div>

            <div className="edit-field full">
              <label>Description</label>
              <textarea
                value={editForm.description || ""}
                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
              />
            </div>
            <div className="edit-field">
  <label>Collected Amount (₹)</label>
  <input
    type="number"
    value={editForm.raisedAmount || 0}
    onChange={e => setEditForm({ 
      ...editForm, 
      raisedAmount: Number(e.target.value) 
    })}
  />
</div>

            <div className="edit-field">
              <label>Category</label>
              <input
                value={editForm.category || ""}
                onChange={e => setEditForm({ ...editForm, category: e.target.value })}
              />
            </div>

            <div className="edit-field">
              <label>Target Amount</label>
              <input
                type="number"
                value={editForm.targetAmount || ""}
                onChange={e => setEditForm({ ...editForm, targetAmount: e.target.value })}
              />
            </div>

            <div className="edit-field">
              <label>Deadline</label>
              <input
                type="date"
                value={editForm.deadline?.split("T")[0] || ""}
                onChange={e =>
                  setEditForm({ ...editForm, deadline: e.target.value + "T23:59:59" })
                }
              />
            </div>

            <div className="edit-field">
              <label>City</label>
              <input
                value={editForm.city || ""}
                onChange={e => setEditForm({ ...editForm, city: e.target.value })}
              />
            </div>

            <div className="edit-field">
              <label>State</label>
              <input
                value={editForm.state || ""}
                onChange={e => setEditForm({ ...editForm, state: e.target.value })}
              />
            </div>

            <div className="edit-field full">
              <label>Address</label>
              <input
                value={editForm.address || ""}
                onChange={e => setEditForm({ ...editForm, address: e.target.value })}
              />
            </div>
          </div>

          <div className="edit-actions">
            <button className="edit-save-btn" onClick={saveChanges}>
              Save Changes
            </button>
            <button className="edit-cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* DETAILS + PROGRESS + IMPACT */}
      <div className="campaign-detail-main">

        <div className="campaign-left">
          <h3>About this campaign</h3>
          <p className="campaign-desc">{campaign.description}</p>

          <h3 style={{ marginTop: "25px" }}>Progress Overview</h3>
          {/* <p>💰 Raised (Demo): ₹{demoRaised}</p> */}
          <p>💰 Raised: ₹{raised}</p>

          <p>📊 Completion: {completionPercent}%</p>
          <p>📅 Days Left: {daysLeft}</p>
          <p>🎯 Target: ₹{campaign.targetAmount}</p>
          <p>🚨 Urgency: {campaign.urgency}</p>

          <h3 style={{ marginTop: "25px" }}>Impact Metrics</h3>
          <p>👥 Beneficiaries Reached: {impact.beneficiaries}+</p>
          <p>🤝 Volunteers Involved: {impact.volunteers}</p>
          <p>📦 Kits / Supplies Distributed: {impact.kits}</p>
          <p>📍 Areas Covered: {impact.areas}</p>

          <h3 style={{ marginTop: "25px" }}>Campaign Updates</h3>

          {isOwner && (
            <div style={{ marginBottom: "15px" }}>
              <textarea
                placeholder="Share a new update..."
                value={newUpdate}
                onChange={e => setNewUpdate(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
              />
              <button
                className="campaign-update-btn"
                style={{ marginTop: "8px" }}
                onClick={addUpdate}
              >
                Post Update
              </button>
            </div>
          )}

          <ul style={{ paddingLeft: "18px" }}>
            {updates.map((u, i) => (
              <li key={i} style={{ marginBottom: "8px" }}>
                <strong>{new Date(u.createdAt).toLocaleDateString()}:</strong> {u.message}
              </li>
            ))}
          </ul>
        </div>

        <div className="campaign-right">
          <div className="campaign-info-card">

            <h4 className="info-title">Campaign Details</h4>

            <div className="info-row">
              <span>📍 Location</span>
              <strong>{campaign.city}, {campaign.state}</strong>
            </div>

            <div className="info-row">
              <span>⏳ Ends On</span>
              <strong>{new Date(campaign.deadline).toLocaleDateString()}</strong>
            </div>

            <div className="divider-line" />

            <h4 className="info-title">Organizer</h4>

            <div className="info-row">
              <span>👤 NGO</span>
              <strong>{campaign.ownerName}</strong>
            </div>

            <div className="info-row">
              <span>📞 Contact</span>
              <strong>{campaign.mobileNumber}</strong>
            </div>

            <div className="divider-line" />

            <div className="info-row">
              <span>Status</span>
              <strong>{campaign.status}</strong>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
