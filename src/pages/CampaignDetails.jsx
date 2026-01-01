import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./campaign.css";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function CampaignDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const { user } = useContext(AuthContext);
  const [donationAmount, setDonationAmount] = useState("");

  useEffect(() => {
    loadCampaign();
  }, []);

  async function loadCampaign() {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/campaigns/${id}`, {
      headers: token ? { Authorization: "Bearer " + token } : {},
    });
    const data = await res.json();
    console.log("response is ",data);
    setCampaign(data);
  }

  if (!campaign) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  const isOwner = campaign.ownerId === user?.id;

  return (
    <>
    <Navbar/>
    <Sidebar/>
    <div className="campaign-detail-wrapper">

      {/* 🔥 TOP SPLIT SECTION */}
      <div className="campaign-top">
        {/* Image */}
        <div className="campaign-image-box">
          <img
            src={`http://localhost:8080${campaign.imageUrl}`}
            alt={campaign.title}
          />
        </div>

        {/* Summary */}
        <div className="campaign-summary">
          <h1>{campaign.title}</h1>

          <span className="badge status-open">
            {campaign.status || "OPEN"}
          </span>

          <p className="campaign-goal">
            {/* 🎯 ₹{campaign.collectedAmount || 0} raised of ₹{campaign.targetAmount} */}
                                    🎯 Amount required ₹{campaign.targetAmount}
          </p>

         <div className="progress-bar">
  <div
    className="progress-bar-fill"
    style={{
      width: `${Math.min(
        100,
        30
      )}%`,
    }}
  />
</div>
{/* {isOwner && (
  <button
    className="campaign-update-btn"
    onClick={() => {
      const updatedAmount = prompt(
        "Enter updated collected amount:",
        campaign.collectedAmount || 0
      );
      if (updatedAmount === null) return;

      setCampaign({
        ...campaign,
        collectedAmount: parseFloat(updatedAmount),
      });
    }}
  >
    Update Collected Amount
  </button>
)} */}

          {/* {!isOwner && (
            <>
              <input
                type="number"
                placeholder="Enter donation amount"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
              <button className="campaign-donate-btn">
                Donate Now
              </button>
            </>
          )} */}
        </div>
      </div>

      {/* 🔽 DETAILS SECTION */}
      <div className="campaign-detail-main">
        <div className="campaign-left">
          <h3>About this campaign</h3>
          <p className="campaign-desc">{campaign.description}</p>
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

    <div className="divider-line"></div>

    <div className="info-row">
      <span>👤 Organizer</span>
      <strong>{campaign.ownerName}</strong>
    </div>

    <div className="info-row">
      <span>🏷 Type</span>
      <strong>{campaign.ownerType}</strong>
    </div>

    <div className="info-row">
      <span>📞 Contact</span>
      <strong>{campaign.mobileNumber}</strong>
    </div>
  </div>
</div>


      </div>
    </div>
    </>
  );
}
