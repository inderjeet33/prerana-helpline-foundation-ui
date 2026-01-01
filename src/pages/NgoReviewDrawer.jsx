import "./NgoReviewDrawer.css";

export default function NgoReviewDrawer({
  open,
  ngo,
  onClose,
  onVerify,
  onReject,
}) {
  if (!open || !ngo) return null;

  return (
    <div className="ngo-drawer-backdrop" onClick={onClose}>
      <div className="ngo-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="ngo-drawer-header">
          <h3>{ngo.ngoName}</h3>
          <span className={`status-pill ${ngo.activationStatus}`}>
            {ngo.activationStatus}
          </span>
        </div>

        <section>
          <h4>Basic Information</h4>
          <p><b>Registration No:</b> {ngo.registrationNumber}</p>
          <p><b>PAN:</b> {ngo.pan}</p>
          <p><b>Description:</b> {ngo.description}</p>
          <p><b>Categories:</b> {ngo.categories?.join(", ")}</p>
        </section>

        <section>
          <h4>Contact</h4>
          <p><b>Phone:</b> {ngo.phone}</p>
          <p><b>Email:</b> {ngo.email}</p>
          <p><b>Address:</b> {ngo.address}</p>
          <p><b>City:</b> {ngo.city}, {ngo.state}</p>
        </section>

        <section>
          <h4>Bank Details</h4>
          <p><b>Account Holder:</b> {ngo.accountHolderName}</p>
          <p><b>Bank:</b> {ngo.bankName}</p>
          <p><b>Account No:</b> ****{ngo.bankAccount?.slice(-4)}</p>
          <p><b>IFSC:</b> {ngo.ifsc}</p>
        </section>

        {!ngo.verified && (
          <div className="ngo-drawer-actions">
            <button className="verify-btn" onClick={() => onVerify(ngo.id)}>
              Verify
            </button>
            <button className="reject-btn" onClick={() => onReject(ngo.id)}>
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
