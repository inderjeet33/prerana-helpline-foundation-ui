import { useContext, useEffect, useState } from "react";
import "./ModeratorDonationOfferDrawer.css";
import { X } from "lucide-react";
import axios from "axios";


export default function ModeratorDonationOfferDetailsDrawer({ open, data, onClose }) {
  if (!open || !data) return null;

  const [assignmentHistory, setAssignmentHistory] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
  if (open && data?.id) {
    axios.get(
      `http://localhost:8080/moderator/donations/${data.id}/assignment-history`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => setAssignmentHistory(res.data));
  }
}, [open, data]);

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div
        className="drawer-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="drawer-header">
          <div>
            <h2>Donation Offer Details</h2>
            <span
              className={`status-pill status-${(data.status || "")
                .toLowerCase()}`}
            >
              {data.status}
            </span>
          </div>

          <button className="drawer-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="drawer-body">
          {/* Donor Section */}
          <Section title="👤 Donor Information">
            <Row label="Name" value={data.user?.fullName} />
            <Row label="Email" value={data.user?.email} />
            <Row label="Phone" value={data.user?.mobileNumber} />
          </Section>

          {/* Donation Section */}
          <Section title="🎁 Donation Details">
            <Row label="Category" value={data.donationCategory} />
            <Row label="Type" value={data.type} />
            <Row label="Amount" value={data.amount ? `₹ ${data.amount}` : "—"} />
            <Row label="Recurring" value={data.recurringHelp ? "Yes" : "No"} />
            <Row label="Timeline" value={data.timeLine} />
            <Row label="Reason" value={data.reason} multiline />
          </Section>

          {/* Receiver Section */}
          <Section title="🏥 Assigned Receiver">
            {data.receiverName ? (
              <>
                <Row label="Name" value={data.receiverName} />
                <Row label="Type" value={data.receiverType} />
                <Row label="Email" value={data.receiverEmail} />
                <Row label="Phone" value={data.receiverMobile} />
                <Row label="City" value={data.receiverCity} />
              </>
            ) : (
              <p className="empty-text">Not assigned yet</p>
            )}
          </Section>
          <Section title="🔄 Assignment History">
  {assignmentHistory.length === 0 ? (
    <p className="empty-text">No assignment history</p>
  ) : (
    <div className="timeline">
      {assignmentHistory.map((h, i) => (
        <div key={i} className="timeline-item">
          <div className="timeline-dot" />
          <div>
            <p className="timeline-title">
              {h.status.replaceAll("_", " ")}
            </p>
            <p className="timeline-meta">
              {h.receiverName} · {new Date(h.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</Section>

        </div>

        {/* Footer */}
        <div className="drawer-footer">
          <button className="secondary-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* Helper Components */
function Section({ title, children }) {
  return (
    <div className="drawer-section">
      <h4>{title}</h4>
      <div className="section-content">{children}</div>
    </div>
  );
}

function Row({ label, value, multiline }) {
  return (
    <div className={`drawer-row ${multiline ? "multiline" : ""}`}>
      <span>{label}</span>
      <p>{value || "—"}</p>
    </div>
  );
}
