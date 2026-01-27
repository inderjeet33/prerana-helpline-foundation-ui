import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./DonationHistory.css";

function getHelpIcon(type) {
  switch (type) {
    case "FOOD": return "🍱 Food";
    case "CLOTHES": return "👕 Clothes";
    case "BOOKS": return "📚 Book";
    case "MEDICAL": return "💊 Medical";
    case "OTHER": return "🎁 Other";
    default: return "🤝 Support";
  }
}

export default function DonationHistory() {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadOffers();
  }, []);

  async function loadOffers() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/donations/my-offers", {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
      });

      if (!res.ok) {
        setError("Failed to load donation history.");
        return;
      }

      const data = await res.json();
      setOffers(data);
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const cancelDonation = async (offerId) => {
    const confirm = window.confirm("Are you sure you want to cancel this donation offer?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:8080/donations/${offerId}/cancel`, {
        method: "PUT",
        headers: { Authorization: "Bearer " + token },
      });

      if (!res.ok) {
        alert("Unable to cancel donation.");
        return;
      }

      loadOffers();
    } catch {
      alert("Something went wrong while cancelling.");
    }
  };

  const downloadCertificate = async (offerId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8080/donations/${offerId}/certificate`,
        { headers: { Authorization: "Bearer " + token } }
      );

      console.log("response is ",res);
      if (!res.ok) throw new Error();

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Prerana-Donation-Certificate-${offerId}.pdf`;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Unable to download certificate.");
    }
  };

  return (
    <div className="history-page">
      <Navbar />
      <Sidebar />

      <div className="with-sidebar">
        <div className="hp-container">

          <div className="hp-header hp-header-row">
            <div>
              <h1>My Contributions</h1>
              <p>Your journey of kindness, beautifully organized.</p>
            </div>
          </div>

          {loading && <div className="hp-loader">Loading your offers…</div>}
          {error && <div className="hp-error">{error}</div>}

          <div className="hp-list">
            {offers.map((offer) => (
              <div
                className="hp-card clickable"
                key={offer.id}
                onClick={() => setSelectedOffer(offer)}
              >

                <div className="hp-card-header">
                  <div>
                    <h3>
                      {offer.helpType === "FINANCIAL"
                        ? `₹${offer.amount}`
                        : getHelpIcon(offer.helpType)}
                    </h3>
                    <span className="hp-category">{offer.donationCategory}</span>
                  </div>

                  <span className={`hp-status ${offer.status?.toLowerCase()}`}>
                    {offer.status}
                  </span>
                </div>

                <div className="hp-details">

                  <div className="hp-detail-item">
                    <span className="hp-label">Help Type</span>
                    <span className="hp-text">{offer.helpType}</span>
                  </div>

                  {offer.helpType !== "FINANCIAL" && (
                    <div className="hp-detail-item">
                      <span className="hp-label">Items</span>
                      <span className="hp-text">
                        {offer.itemDetails || "Not specified"}
                        {offer.quantity && ` (Qty: ${offer.quantity})`}
                      </span>
                    </div>
                  )}

                  <div className="hp-detail-item">
                    <span className="hp-label">Timeline</span>
                    <span className="hp-text">{offer.timeLine}</span>
                  </div>

                  <div className="hp-detail-item">
                    <span className="hp-label">Location</span>
                    <span className="hp-text">
                      {offer.location || "Not specified"}
                    </span>
                  </div>
                </div>

                {offer.reason && (
                  <div className="hp-reason">
                    <h4>Reason</h4>
                    <p>{offer.reason}</p>
                  </div>
                )}

                {(offer.status === "ASSIGNED" ||
                  offer.status === "IN_PROGRESS" ||
                  offer.status === "COMPLETED") &&
                  offer.receiverId && (

                    <div className="hp-receiver">
                      <div className="hp-receiver-left">
                        <h4>Assigned NGO</h4>
                        <p className="hp-ngo-name">{offer.receiverName}</p>

                        <div className="hp-ngo-contacts">
                          {offer.receiverEmail && <span>📧 {offer.receiverEmail}</span>}
                          {offer.receiverMobile && <span>📞 {offer.receiverMobile}</span>}
                        </div>
                      </div>

                      <div className="hp-receiver-actions">
                        <button onClick={(e) => { 
                          e.stopPropagation(); 
                          navigate(`/donations/${offer.id}/ngo`);
                        }}>
                          View NGO
                        </button>

                        {offer.status === "COMPLETED" && (
                          <button
                            className="hp-certificate-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadCertificate(offer.id);
                            }}
                          >
                            Download Certificate
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                {(offer.status === "OPEN" || offer.status === "ASSIGNED") && (
                  <div className="hp-cancel-wrapper">
                    <button
                      className="hp-cancel-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        cancelDonation(offer.id);
                      }}
                    >
                      Cancel Donation
                    </button>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FULL DETAIL MODAL */}
      {selectedOffer && (
        <div className="hp-modal-overlay" onClick={() => setSelectedOffer(null)}>
          <div className="hp-modal" onClick={(e) => e.stopPropagation()}>

            <div className="hp-modal-header">
              <h2>Contribution Details</h2>
              <button onClick={() => setSelectedOffer(null)}>✖</button>
            </div>

            <div className="hp-modal-grid">
              <div><strong>Help Type:</strong> {selectedOffer.helpType}</div>
              <div><strong>Category:</strong> {selectedOffer.donationCategory}</div>
              <div><strong>Timeline:</strong> {selectedOffer.timeLine}</div>
              <div><strong>Location:</strong> {selectedOffer.location || "N/A"}</div>
              <div><strong>Age Group:</strong> {selectedOffer.ageGroup}</div>
              <div><strong>Gender:</strong> {selectedOffer.gender}</div>
              <div><strong>Preferred Contact:</strong> {selectedOffer.preferredContact}</div>
              <div><strong>Recurring:</strong> {selectedOffer.recurringHelp ? "Yes" : "No"}</div>

              {selectedOffer.helpType === "FINANCIAL" ? (
                <div><strong>Amount:</strong> ₹{selectedOffer.amount}</div>
              ) : (
                <>
                  <div><strong>Items:</strong> {selectedOffer.itemDetails}</div>
                  <div><strong>Quantity:</strong> {selectedOffer.quantity || "N/A"}</div>
                </>
              )}
            </div>

            {selectedOffer.reason && (
              <div className="hp-modal-reason">
                <strong>Reason:</strong>
                <p>{selectedOffer.reason}</p>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
