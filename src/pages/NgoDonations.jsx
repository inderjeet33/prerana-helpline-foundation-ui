import { useEffect, useState } from "react";
import axios from "axios";
import "./ngoDashboard.css";   // contains your .ngo-table etc
import "./ngoDonations.css";
import NgoNav from "./NgoNav";


export default function NgoDonations() {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [statusChanges, setStatusChanges] = useState({}); // store temp selected status per assignment

  const NGO_ALLOWED_TRANSITIONS = {
  ASSIGNED: ["IN_PROGRESS", "REJECTED_BY_RECEIVER"],
  IN_PROGRESS: ["COMPLETED", "REJECTED_BY_RECEIVER"],
  COMPLETED: [],
  REJECTED_BY_RECEIVER: [],
  CANCELLED_BY_DONOR:[]
};
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadOffers() {
      try {
        const res = await axios.get("http://localhost:8080/ngo/profile/assigned-offers", {
          headers: { Authorization: "Bearer " + token }
        });
        console.log(res);
        setOffers(res.data);
      } catch (err) {
        console.error("Failed fetching offers", err);
      }
    }
    loadOffers();
  }, []);

  // Handle status selection
  const handleStatusChange = (assignmentId, newStatus) => {
    setStatusChanges(prev => ({
      ...prev,
      [assignmentId]: newStatus
    }));
  };

  const downloadExcel = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8080/exports/donations/ngo",
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to download excel");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Prerana-NGO-Assigned-Donations.xlsx";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert("Unable to download Excel");
    console.error(err);
  }
};

  // Update status when button clicked
  const updateStatus = async (assignmentId) => {
    const newStatus = statusChanges[assignmentId];
    if (!newStatus) return;

    try {
      console.log(token);
      await axios.post(
        `http://localhost:8080/ngo/profile/assigned-offers/${assignmentId}/update-status?newStatus=${newStatus}`,
        {},
        { headers: { Authorization: "Bearer " + token } }
      );

      // Update UI instantly
      setOffers(prev =>
        prev.map(o =>
          o.assignmentId === assignmentId
            ? { ...o, assignmentStatus: newStatus }
            : o
        )
      );

      // Clear selected status for that assignment
      setStatusChanges(prev => ({ ...prev, [assignmentId]: undefined }));

    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <>
    <div className="ngo-table-container">
<div className="ngo-table-header">
  <h2>Assigned Donation Offers</h2>

  {offers.length > 0 && (
    <button
      className="ngo-excel-btn"
      onClick={downloadExcel}
    >
      ⬇ Download Excel
    </button>
  )}
</div>

      <table className="ngo-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Donor</th>
            <th>Assignment Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {offers.map((o) => (
            <tr key={o.assignmentId}>
              <td>{o.donationCategory}</td>
              <td>{o.amount ? `₹${o.amount}` : "-"}</td>
              <td>{o.donorName}</td>

              <td>
                <span className={`ngo-status status-${o.assignmentStatus.toLowerCase()}`}>
                  {o.assignmentStatus.replace(/_/g, " ")}
                </span>
              </td>

              <td>
                {/* Drawer Button */}
                <button
                  className="ngo-detail-btn"
                  onClick={() => setSelectedOffer(o)}
                >
                  View
                </button>

                {/* Status dropdown */}
                {/* <select
                  className="ngo-select"
                  value={statusChanges[o.assignmentId] || o.assignmentStatus}
                  onChange={(e) => handleStatusChange(o.assignmentId, e.target.value)}
                >
                  <option value="ASSIGNED">Assigned</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select> */}
                <select
  className="ngo-select"
  value={statusChanges[o.assignmentId] || o.assignmentStatus}
  onChange={(e) => handleStatusChange(o.assignmentId, e.target.value)}
  disabled={NGO_ALLOWED_TRANSITIONS[o.assignmentStatus].length === 0}
>
  <option value={o.assignmentStatus}>
    {o.assignmentStatus.replace(/_/g, " ")}
  </option>

  {NGO_ALLOWED_TRANSITIONS[o.assignmentStatus].map(status => (
    <option key={status} value={status}>
      {status.replace(/_/g, " ")}
    </option>
  ))}
</select>



                {/* Update button */}
                {/* <button
                  className="ngo-update-btn"
                  onClick={() => updateStatus(o.assignmentId)}
                  disabled={!statusChanges[o.assignmentId]} // disable if no change
                >
                  Update
                </button> */}
                <button
  className="ngo-update-btn"
  onClick={() => updateStatus(o.assignmentId)}
  disabled={
    !statusChanges[o.assignmentId] ||
    statusChanges[o.assignmentId] === o.assignmentStatus
  }
>
  Update
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Drawer */}
      {/* {selectedOffer && (
        <div className="ngo-drawer-overlay" onClick={() => setSelectedOffer(null)}>
          <div className="ngo-drawer" onClick={(e) => e.stopPropagation()}>
            <h2>Offer Details</h2>

            <p><strong>Category:</strong> {selectedOffer.donationCategory}</p>
            <p><strong>Amount:</strong> {selectedOffer.amount || "-"}</p>
            <p><strong>Reason:</strong> {selectedOffer.reason}</p>
            <p><strong>Timeline:</strong> {selectedOffer.timeline}</p>
            <p><strong>Donor Name:</strong> {selectedOffer.donorName}</p>
            <p><strong>Donor Phone:</strong> {selectedOffer.donorPhone}</p>
            <p><strong>Location:</strong> {selectedOffer.location}</p>
            <p><strong>Assignment Status:</strong> {selectedOffer.assignmentStatus}</p>

            <button className="ngo-close-btn" onClick={() => setSelectedOffer(null)}>
              Close
            </button>
          </div>
        </div>
      )} */}
      {selectedOffer && (
  <div className="ngo-drawer-overlay" onClick={() => setSelectedOffer(null)}>
    <div className="ngo-drawer" onClick={(e) => e.stopPropagation()}>

      <h2>Donation Offer</h2>

      {/* Offer Info */}
      <div className="drawer-section">
        <p><strong>Category:</strong> {selectedOffer.donationCategory}</p>
        <p><strong>Amount:</strong> {selectedOffer.amount || "-"}</p>
        <p><strong>Reason:</strong> {selectedOffer.reason}</p>
        <p><strong>Timeline:</strong> {selectedOffer.timeLine}</p>
        <p><strong>Offer Created :</strong>{selectedOffer.offerCreatedAt}</p>
        <p><strong>Location:</strong> {selectedOffer.location}</p>

        <span className={`ngo-status status-${selectedOffer.assignmentStatus.toLowerCase()}`}>
          {selectedOffer.assignmentStatus.replace(/_/g, " ")}
        </span>
      </div>

      {/* Donor Contact Card */}
      <div className="drawer-section donor-card">
        <h3>Donor Contact</h3>

        <div className="donor-row">
          <span>👤</span>
          <span>{selectedOffer.donorName}</span>
        </div>

        <div className="donor-row">
          <span>📞</span>
          <a href={`tel:${selectedOffer.donorPhone}`}>
            {selectedOffer.donorPhone}
          </a>
        </div>

        {selectedOffer.donorEmail && (
          <div className="donor-row">
            <span>✉️</span>
            <a href={`mailto:${selectedOffer.donorEmail}`}>
              {selectedOffer.donorEmail}
            </a>
          </div>
        )}
      </div>

      <button className="ngo-close-btn" onClick={() => setSelectedOffer(null)}>
        Close
      </button>

    </div>
  </div>
)}

    </div>
    </>
  );
}
