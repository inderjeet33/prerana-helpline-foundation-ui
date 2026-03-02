// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./ModeratorUserProfile.css";

// export default function ModeratorUserProfile() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     loadProfile();
//   }, [id]);

//   async function loadProfile() {
//     try {
//       const res = await fetch(
//         `http://localhost:8080/moderator/users/${id}`,
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );

//       if (!res.ok) throw new Error("Failed to fetch user profile");

//       const data = await res.json();
//       setUser(data);
//     } catch (err) {
//       console.error(err);
//       alert("Unable to load user profile.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   const formatDate = (date) => {
//     if (!date) return "—";
//     return new Date(date).toLocaleDateString();
//   };

//   if (loading) return <div className="mod-user-loading">Loading...</div>;
//   if (!user) return <div className="mod-user-error">User not found</div>;

//   const cancellationRate = user.donationCancellationRate || 0;
//   const highRisk = cancellationRate > 40;

//   return (
//     <div className="mod-user-page">

//       {/* Back Button */}
//       <div className="mod-user-topbar">
//         <button className="mod-back-btn" onClick={() => navigate(-1)}>
//           ← Back
//         </button>
//       </div>

//       {/* ================= HEADER ================= */}
//       <div className="mod-user-header-card">

//         <div className="mod-user-header-left">
//           <h2>{user.fullName}</h2>

//           <div className="mod-user-badges">
//             <span className="badge type">{user.userType}</span>
//             <span className="badge role">{user.role}</span>

//             {user.verified && (
//               <span className="badge verified">✔ Verified</span>
//             )}

//             {user.profileCompleted && (
//               <span className="badge completed">Profile Complete</span>
//             )}
//           </div>
//         </div>

//         <div className="mod-user-header-right">
//           <p><strong>Email:</strong> {user.email || "—"}</p>
//           <p><strong>Mobile:</strong> {user.mobileNumber}</p>
//           <p><strong>Registered:</strong> {formatDate(user.registeredAt)}</p>
//           <p><strong>Location:</strong> {user.city}, {user.state}</p>
//           {user.profession && (
//             <p><strong>Profession:</strong> {user.profession}</p>
//           )}
//         </div>

//       </div>

//       {/* ================= RISK STRIP ================= */}
//       <div className="mod-risk-strip">

//         <div className="stat-card">
//           <h4>Total Donations</h4>
//           <p>{user.totalDonations}</p>
//         </div>

//         <div className={`stat-card ${highRisk ? "danger" : ""}`}>
//           <h4>Cancellation Rate</h4>
//           <p>{cancellationRate.toFixed(1)}%</p>
//         </div>

//         <div className="stat-card">
//           <h4>Volunteer Offers</h4>
//           <p>{user.totalVolunteerOffers}</p>
//         </div>

//         <div className="stat-card">
//           <h4>Help Requests</h4>
//           <p>{user.totalHelpRequests}</p>
//         </div>

//       </div>

//       {/* ================= ACTIVITY GRID ================= */}
//       <div className="mod-activity-grid">

//         {/* Donations */}
//         <div className="activity-card">
//           <h3>Donations</h3>
//           <div className="activity-row">
//             <span>Total</span>
//             <span>{user.totalDonations}</span>
//           </div>
//           <div className="activity-row">
//             <span>Active</span>
//             <span>{user.activeDonations}</span>
//           </div>
//           <div className="activity-row">
//             <span>Completed</span>
//             <span>{user.completedDonations}</span>
//           </div>
//           <div className="activity-row">
//             <span>Cancelled</span>
//             <span>{user.cancelledDonations}</span>
//           </div>
//         </div>

//         {/* Volunteer */}
//         <div className="activity-card">
//           <h3>Volunteer Offers</h3>
//           <div className="activity-row">
//             <span>Total</span>
//             <span>{user.totalVolunteerOffers}</span>
//           </div>
//           <div className="activity-row">
//             <span>Active</span>
//             <span>{user.activeVolunteerOffers}</span>
//           </div>
//           <div className="activity-row">
//             <span>Completed</span>
//             <span>{user.completedVolunteerOffers}</span>
//           </div>
//           <div className="activity-row">
//             <span>Cancelled</span>
//             <span>{user.cancelledVolunteerOffers}</span>
//           </div>
//         </div>

//         {/* Help Requests */}
//         <div className="activity-card">
//           <h3>Help Requests</h3>
//           <div className="activity-row">
//             <span>Total</span>
//             <span>{user.totalHelpRequests}</span>
//           </div>
//           <div className="activity-row">
//             <span>Active</span>
//             <span>{user.activeHelpRequests}</span>
//           </div>
//           <div className="activity-row">
//             <span>Completed</span>
//             <span>{user.completedHelpRequests}</span>
//           </div>
//           <div className="activity-row">
//             <span>Cancelled</span>
//             <span>{user.cancelledHelpRequests}</span>
//           </div>
//         </div>

//       </div>

//       {/* ================= QUICK ACTIONS ================= */}
//       <div className="mod-user-actions">

//         <button
//           onClick={() => navigate(`/moderator/offers?userId=${user.id}`)}
//         >
//           View Donations
//         </button>

//         <button
//           onClick={() => navigate(`/moderator/volunteers?userId=${user.id}`)}
//         >
//           View Volunteer Offers
//         </button>

//         <button
//           onClick={() => navigate(`/moderator/help-requests?userId=${user.id}`)}
//         >
//           View Help Requests
//         </button>

//       </div>

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import "./Moderator.css";

export default function ModeratorUserProfile({ userId }) {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId) return;
    loadProfile();
  }, [userId]);

  async function loadProfile() {
    try {
      const res = await axios.get(
        `http://localhost:8080/moderator/users/${userId}/full-profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data);
    } catch (e) {
      console.error(e);
      alert("Failed to load user profile");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="mod-table-wrapper">Loading...</div>;
  if (!profile) return null;

  return (
    <div className="mod-table-wrapper">

      {/* =======================
         BASIC INFO
      ======================== */}
      <div className="mod-header">
        <div>
          <h2>{profile.fullName}</h2>
          <p className="mod-sub">
            {profile.userType} • {profile.role}
          </p>
        </div>
      </div>

      <div className="ngo-details-grid">
        <div><span>Email</span>{profile.email || "—"}</div>
        <div><span>Mobile</span>{profile.mobileNumber}</div>
        <div><span>City</span>{profile.city || "—"}</div>
        <div><span>State</span>{profile.state || "—"}</div>
        <div><span>Profession</span>{profile.profession || "—"}</div>
        <div><span>Verified</span>{profile.verified ? "Yes" : "No"}</div>
        <div><span>Profile Completed</span>{profile.profileCompleted ? "Yes" : "No"}</div>
        <div><span>Registered</span>{new Date(profile.registeredAt).toLocaleDateString()}</div>
      </div>

      {/* =======================
         DONATION STATS
      ======================== */}
      <div className="section-title">Donation Activity</div>

      <div className="ngo-details-grid">
        <div><span>Total</span>{profile.totalDonations || 0}</div>
        <div><span>Active</span>{profile.activeDonations || 0}</div>
        <div><span>Completed</span>{profile.completedDonations || 0}</div>
        <div><span>Cancelled</span>{profile.cancelledDonations || 0}</div>
        <div>
          <span>Cancellation Rate</span>
          {profile.donationCancellationRate
            ? `${profile.donationCancellationRate.toFixed(2)}%`
            : "0%"}
        </div>
      </div>

      {/* =======================
         VOLUNTEER STATS
      ======================== */}
      <div className="section-title">Volunteer Activity</div>

      <div className="ngo-details-grid">
        <div><span>Total</span>{profile.totalVolunteerOffers || 0}</div>
        <div><span>Active</span>{profile.activeVolunteerOffers || 0}</div>
        <div><span>Completed</span>{profile.completedVolunteerOffers || 0}</div>
        <div><span>Cancelled</span>{profile.cancelledVolunteerOffers || 0}</div>
      </div>

      {/* =======================
         HELP REQUEST STATS
      ======================== */}
      <div className="section-title">Help Request Activity</div>

      <div className="ngo-details-grid">
        <div><span>Total</span>{profile.totalHelpRequests || 0}</div>
        <div><span>Active</span>{profile.activeHelpRequests || 0}</div>
        <div><span>Completed</span>{profile.completedHelpRequests || 0}</div>
        <div><span>Cancelled</span>{profile.cancelledHelpRequests || 0}</div>
      </div>

      {/* =======================
         NGO PROFILE (IF EXISTS)
      ======================== */}
      {profile.ngoProfile && (
        <>
          <div className="section-title">NGO Profile Details</div>
          <div className="ngo-details-grid">
            <div><span>NGO Name</span>{profile.ngoProfile.ngoName}</div>
            <div><span>Registration No.</span>{profile.ngoProfile.registrationNumber}</div>
            <div><span>Category</span>{profile.ngoProfile.category}</div>
            <div><span>Status</span>{profile.ngoProfile.status}</div>
          </div>
        </>
      )}

      {/* =======================
         CSR PROFILE (IF EXISTS)
      ======================== */}
      {profile.csrProfile && (
        <>
          <div className="section-title">CSR Profile Details</div>
          <div className="ngo-details-grid">
            <div><span>Company Name</span>{profile.csrProfile.companyName}</div>
            <div><span>Registration No.</span>{profile.csrProfile.registrationNumber}</div>
            <div><span>Industry</span>{profile.csrProfile.industry}</div>
            <div><span>Status</span>{profile.csrProfile.status}</div>
          </div>
        </>
      )}

    </div>
  );
}