import "./Moderator.css";

export default function NgoDetailsDrawer({ open, onClose, data }) {
  if (!open || !data) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>

        <h2>NGO Details</h2>

        <p><strong>NGO Name:</strong> {data.ngoName}</p>
        <p><strong>State:</strong> {data.state}</p>
        <p><strong>City:</strong> {data.city}</p>
        <p><strong>Address:</strong> {data.address}</p>

        <p><strong>Contact Person:</strong> {data.user?.fullName}</p>
        <p><strong>Phone:</strong> {data.user?.mobileNumber}</p>
        <p><strong>Email:</strong> {data.user?.email}</p>

        <button className="drawer-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
