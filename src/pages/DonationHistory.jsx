
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import "./DonationHistory.css";

// export default function DonationHistory() {
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     loadOffers();
//   }, []);

//   async function loadOffers() {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch("http://localhost:8080/donations/my-offers", {
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: "Bearer " + token } : {}),
//         },
//       });

//       if (!res.ok) {
//         setError("Failed to load donation history.");
//         setLoading(false);
//         return;
//       }

//       const data = await res.json();
//       setOffers(data);
//     } catch (err) {
//       setError("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   const downloadExcel = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     const response = await fetch(
//       "http://localhost:8080/exports/donations/my",
//       {
//         method: "GET",
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to download excel");
//     }

//     const blob = await response.blob(); // ✅ IMPORTANT
//     const url = window.URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "Prerana-My-Donations.xlsx";
//     document.body.appendChild(a);
//     a.click();

//     a.remove();
//     window.URL.revokeObjectURL(url);
//   } catch (err) {
//     console.error(err);
//     alert("Unable to download excel");
//   }
// };



//   const downloadCertificate = async (offerId) => {
//   try {
//     const token = localStorage.getItem("token");

//     const res = await fetch(
//       `http://localhost:8080/donations/${offerId}/certificate`,
//       {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       }
//     );

//     if (!res.ok) {
//       throw new Error("Unauthorized or failed to download");
//     }

//     const blob = await res.blob();

//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");

//     a.href = url;
//     a.download = `Prerana-Donation-Certificate-${offerId}.pdf`;
//     document.body.appendChild(a);
//     a.click();

//     a.remove();
//     window.URL.revokeObjectURL(url);
//   } catch (err) {
//     alert("Unable to download certificate. Please try again.");
//     console.error(err);
//   }
// };


//   return (
//     <div className="history-page">
//       <Navbar />
//       <Sidebar />
//       <div className="with-sidebar">
//         <div className="hp-container">
//           {/* <div className="hp-header">
//             <h1>Donation History</h1>
//             <p>Your journey of kindness, beautifully organized.</p>
//           </div> */}
//           <div className="hp-header hp-header-row">
//   <div>
//     <h1>Donation History</h1>
//     <p>Your journey of kindness, beautifully organized.</p>
//   </div>

//   {offers.length > 0 && (
//     <button
//       className="hp-excel-btn"
//       onClick={downloadExcel}
//     >
//       ⬇ Download Excel
//     </button>
//   )}
// </div>


//           {loading && <div className="hp-loader">Loading your offers…</div>}
//           {error && <div className="hp-error">{error}</div>}

//           {!loading && offers.length === 0 && (
//             <div className="hp-empty">
//               <img src="/empty.svg" alt="empty" />
//               <h3>No donation offers found</h3>
//               <p>You haven't created any offers yet.</p>
//             </div>
//           )}

//           <div className="hp-list">
//             {offers.map((offer) => (
//               <div className="hp-card" key={offer.id}>
//                 <div className="hp-card-header">
//                   <div>
//                     <h3>₹{offer.amount}</h3>
//                     <span className="hp-category">
//                       {offer.donationCategory}
//                     </span>
//                   </div>
//                   <span className={`hp-status ${offer.status?.toLowerCase()}`}>
//                     {offer.status || "Pending"}
//                   </span>
//                 </div>

//                 <div className="hp-details">
//                   <div className="hp-detail-item">
//                     <span className="hp-label">Type</span>
//                     <span>{offer.type}</span>
//                   </div>

//                   <div className="hp-detail-item">
//                     <span className="hp-label">Timeline</span>
//                     <span>{offer.timeLine}</span>
//                   </div>

//                   <div className="hp-detail-item">
//                     <span className="hp-label">Location</span>
//                     <span>{offer.location || "Not specified"}</span>
//                   </div>
//                 </div>

//                 {offer.reason && (
//                   <div className="hp-reason">
//                     <h4>Reason</h4>
//                     <p>{offer.reason}</p>
//                   </div>
//                 )}

//                 {(offer.status === "ASSIGNED" ||
//                   offer.status === "IN_PROGRESS" ||
//                   offer.status === "COMPLETED") &&
//                   offer.receiverId && (
//                     <div className="hp-receiver">
//                       <div className="hp-receiver-left">
//                         <h4>Assigned NGO</h4>
//                         <p className="hp-ngo-name">
//                           {offer.receiverName}
//                         </p>

//                         <div className="hp-ngo-contacts">
//                           {offer.receiverEmail && (
//                             <span>📧 {offer.receiverEmail}</span>
//                           )}
//                           {offer.receiverMobile && (
//                             <span>📞 {offer.receiverMobile}</span>
//                           )}
//                         </div>
//                       </div>

//                       <div className="hp-receiver-actions">
//                         <button
//                           onClick={() =>
//                             navigate(`/donations/${offer.id}/ngo`)
//                           }
//                         >
//                           View NGO
//                         </button>

//                         {/* ⭐ Download Certificate Button */}
//                         {offer.status === "COMPLETED" && (
//                           <button
//                             className="hp-certificate-btn"
//                             onClick={() =>
//                               downloadCertificate(offer.id)
//                             }
//                           >
//                             Download Certificate
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./DonationHistory.css";

export default function DonationHistory() {
  const [offers, setOffers] = useState([]);
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
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  // 🔴 NEW: Cancel donation
  const cancelDonation = async (offerId) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this donation offer?"
    );
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8080/donations/${offerId}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!res.ok) {
        alert("Unable to cancel donation.");
        return;
      }

      loadOffers(); // refresh list
    } catch (err) {
      alert("Something went wrong while cancelling.");
    }
  };

  const downloadCertificate = async (offerId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8080/donations/${offerId}/certificate`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

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
              <h1>Donation History</h1>
              <p>Your journey of kindness, beautifully organized.</p>
            </div>
          </div>

          {loading && <div className="hp-loader">Loading your offers…</div>}
          {error && <div className="hp-error">{error}</div>}

          <div className="hp-list">
            {offers.map((offer) => (
              <div className="hp-card" key={offer.id}>
                <div className="hp-card-header">
                  <div>
                    <h3>₹{offer.amount}</h3>
                    <span className="hp-category">
                      {offer.donationCategory}
                    </span>
                  </div>
                  <span className={`hp-status ${offer.status?.toLowerCase()}`}>
                    {offer.status}
                  </span>
                </div>

                <div className="hp-details">
                  <div className="hp-detail-item">
                    <span className="hp-label">Type</span>
                    <span>{offer.type}</span>
                  </div>

                  <div className="hp-detail-item">
                    <span className="hp-label">Timeline</span>
                    <span>{offer.timeLine}</span>
                  </div>

                  <div className="hp-detail-item">
                    <span className="hp-label">Location</span>
                    <span>{offer.location || "Not specified"}</span>
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
                        <p className="hp-ngo-name">
                          {offer.receiverName}
                        </p>

                        <div className="hp-ngo-contacts">
                          {offer.receiverEmail && (
                            <span>📧 {offer.receiverEmail}</span>
                          )}
                          {offer.receiverMobile && (
                            <span>📞 {offer.receiverMobile}</span>
                          )}
                        </div>
                      </div>

                      <div className="hp-receiver-actions">
                        <button
                          onClick={() =>
                            navigate(`/donations/${offer.id}/ngo`)
                          }
                        >
                          View NGO
                        </button>

                        {offer.status === "COMPLETED" && (
                          <button
                            className="hp-certificate-btn"
                            onClick={() =>
                              downloadCertificate(offer.id)
                            }
                          >
                            Download Certificate
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                {/* 🔴 NEW: Cancel button (NO layout change) */}
                {(offer.status === "OPEN" || offer.status === "ASSIGNED") && (
                  <div className="hp-cancel-wrapper">
                    <button
                      className="hp-cancel-btn"
                      onClick={() => cancelDonation(offer.id)}
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
    </div>
  );
}
