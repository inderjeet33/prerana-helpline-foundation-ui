import "./Moderator.css";

export default function OfferDetailsDrawer({ open, onClose, data }) {
  if (!open || !data) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        
        <h2>Offer Details</h2>

        <p><strong>Category:</strong> {data.donationCategory}</p>
        <p><strong>Donor:</strong> {data.user.fullName}</p>
        <p><strong>Type:</strong> {data.type}</p>
        <p><strong>Reason:</strong> {data.reason}</p>
        <p><strong>Status:</strong> {data.status}</p>
        <p><strong>Category:</strong>{data.donationCategory}</p>
        <p><strong>Location:</strong>{data.location}</p>
        {data.receiverName && (
          <p><strong>Assigned To:</strong> {data.receiverName}</p>
        )}

        <button className="drawer-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
