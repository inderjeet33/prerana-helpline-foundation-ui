// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./campaign.css";
// import { AuthContext } from "../context/AuthContext";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// export default function CampaignDetails() {
//   const { id } = useParams();
//   const [campaign, setCampaign] = useState(null);
//   const { user } = useContext(AuthContext);
//   const [donationAmount, setDonationAmount] = useState("");

//   useEffect(() => {
//     loadCampaign();
//   }, []);

//   async function loadCampaign() {
//     const token = localStorage.getItem("token");
//     const res = await fetch(`http://localhost:8080/campaigns/${id}`, {
//       headers: token ? { Authorization: "Bearer " + token } : {},
//     });
//     const data = await res.json();
//     console.log("response is ",data);
//     setCampaign(data);
//   }

//   if (!campaign) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

//   const isOwner = campaign.ownerId === user?.id;

//   return (
//     <>
//    <Navbar/>
//    <Sidebar/>
//     <div className="campaign-detail-wrapper">

//       {/* 🔥 TOP SPLIT SECTION */}
//       <div className="campaign-top">
//         {/* Image */}
//         <div className="campaign-image-box">
//           <img
//             src={`http://localhost:8080${campaign.imageUrl}`}
//             alt={campaign.title}
//           />
//         </div>

//         {/* Summary */}
//         <div className="campaign-summary">
//           <h1>{campaign.title}</h1>

//           <span className="badge status-open">
//             {campaign.status || "OPEN"}
//           </span>

//           <p className="campaign-goal">
//             {/* 🎯 ₹{campaign.collectedAmount || 0} raised of ₹{campaign.targetAmount} */}
//                                     🎯 Amount required ₹{campaign.targetAmount}
//           </p>

//          <div className="progress-bar">
//   <div
//     className="progress-bar-fill"
//     style={{
//       width: `${Math.min(
//         100,
//         30
//       )}%`,
//     }}
//   />
// </div>
// {/* {isOwner && (
//   <button
//     className="campaign-update-btn"
//     onClick={() => {
//       const updatedAmount = prompt(
//         "Enter updated collected amount:",
//         campaign.collectedAmount || 0
//       );
//       if (updatedAmount === null) return;

//       setCampaign({
//         ...campaign,
//         collectedAmount: parseFloat(updatedAmount),
//       });
//     }}
//   >
//     Update Collected Amount
//   </button>
// )} */}

//           {/* {!isOwner && (
//             <>
//               <input
//                 type="number"
//                 placeholder="Enter donation amount"
//                 value={donationAmount}
//                 onChange={(e) => setDonationAmount(e.target.value)}
//               />
//               <button className="campaign-donate-btn">
//                 Donate Now
//               </button>
//             </>
//           )} */}
//         </div>
//       </div>

//       {/* 🔽 DETAILS SECTION */}
//       <div className="campaign-detail-main">
//         <div className="campaign-left">
//           <h3>About this campaign</h3>
//           <p className="campaign-desc">{campaign.description}</p>
//         </div>

//         <div className="campaign-right">
//   <div className="campaign-info-card">
//     <h4 className="info-title">Campaign Details</h4>

//     <div className="info-row">
//       <span>📍 Location</span>
//       <strong>{campaign.city}, {campaign.state}</strong>
//     </div>

//     <div className="info-row">
//       <span>⏳ Ends On</span>
//       <strong>{new Date(campaign.deadline).toLocaleDateString()}</strong>
//     </div>

//     <div className="divider-line"></div>

//     <div className="info-row">
//       <span>👤 Organizer</span>
//       <strong>{campaign.ownerName}</strong>
//     </div>

//     <div className="info-row">
//       <span>🏷 Type</span>
//       <strong>{campaign.ownerType}</strong>
//     </div>

//     <div className="info-row">
//       <span>📞 Contact</span>
//       <strong>{campaign.mobileNumber}</strong>
//     </div>
//   </div>
// </div>


//       </div>
//     </div>
//     </>
//   );
// }
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./campaign.css";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function IndividualCampaignView() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [campaign, setCampaign] = useState(null);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    loadCampaign();
    loadUpdates();
  }, []);

  async function loadCampaign() {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/campaigns/${id}`, {
      headers: token ? { Authorization: "Bearer " + token } : {},
    });
    const data = await res.json();
    setCampaign(data);
  }

  async function loadUpdates() {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/campaigns/${id}/updates`, {
      headers: token ? { Authorization: "Bearer " + token } : {}
    });
    const data = await res.json();
    setUpdates(data);
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert("Campaign link copied!");
  }

  if (!campaign) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  const raised = campaign.raisedAmount || 0;
  console.log("campaign is here ",campaign);
  const completionPercent = Math.round(
    Math.min(100, (raised / campaign.targetAmount) * 100)
  );

  const today = new Date();
  const deadline = new Date(campaign.deadline);
  const daysLeft = Math.max(
    0,
    Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
  );

  // Demo impact metrics (hardcoded for now)
  const impact = {
    beneficiaries: 320,
    volunteers: 18,
    kits: 150,
    areas: 5
  };

  return (
    <>
      <Navbar />
      <Sidebar />

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

            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${completionPercent}%` }}
              />
            </div>

            <p style={{ color: "#666", fontSize: "0.95rem" }}>
              💰 Raised: ₹{raised} • 📊 {completionPercent}% completed
            </p>

            <p style={{ color: "#666", fontSize: "0.95rem" }}>
              Category: <strong>{campaign.category}</strong> •  
              Urgency: <strong>{campaign.urgency}</strong>
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button className="campaign-update-btn" onClick={copyLink}>
                Copy Campaign Link
              </button>

              <a
                href={`tel:${campaign.mobileNumber}`}
                className="campaign-update-btn"
                style={{ textDecoration: "none", textAlign: "center" }}
              >
                Contact NGO
              </a>
            </div>

            <p style={{ fontSize: "0.85rem", color: "#777", marginTop: "8px" }}>
              Support this cause by sharing it with your network.
            </p>
          </div>
        </div>

        {/* DETAILS + IMPACT */}
        <div className="campaign-detail-main">

          <div className="campaign-left">
            <h3>About this campaign</h3>
            <p className="campaign-desc">{campaign.description}</p>

            <h3 style={{ marginTop: "25px" }}>Progress Overview</h3>
            <p>💰 Raised: ₹{raised}</p>
            <p>🎯 Target: ₹{campaign.targetAmount}</p>
            <p>📊 Completion: {completionPercent}%</p>
            <p>📅 Days Left: {daysLeft}</p>

            <h3 style={{ marginTop: "25px" }}>Impact Metrics</h3>
            <p>👥 Beneficiaries Reached: {impact.beneficiaries}+</p>
            <p>🤝 Volunteers Involved: {impact.volunteers}</p>
            <p>📦 Kits / Supplies Distributed: {impact.kits}</p>
            <p>📍 Areas Covered: {impact.areas}</p>

            <h3 style={{ marginTop: "25px" }}>Campaign Updates</h3>

            {updates.length === 0 && (
              <p style={{ color: "#777" }}>No updates posted yet.</p>
            )}

            <ul style={{ paddingLeft: "18px" }}>
              {updates.map((u, i) => (
                <li key={i} style={{ marginBottom: "8px" }}>
                  <strong>{new Date(u.createdAt).toLocaleDateString()}:</strong>{" "}
                  {u.message}
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
    </>
  );
}
