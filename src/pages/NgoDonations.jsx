
// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./ngoDashboard.css";
// import "./ngoDonations.css";
// import NgoNav from "./NgoNav";

// export default function NgoDonations() {
//   const [offers, setOffers] = useState([]);
//   const [selectedOffer, setSelectedOffer] = useState(null);
//   const [statusChanges, setStatusChanges] = useState({});

//   const NGO_ALLOWED_TRANSITIONS = {
//     ASSIGNED: ["IN_PROGRESS", "REJECTED_BY_RECEIVER"],
//     IN_PROGRESS: ["COMPLETED", "REJECTED_BY_RECEIVER"],
//     COMPLETED: [],
//     REJECTED_BY_RECEIVER: [],
//     CANCELLED_BY_DONOR: []
//   };

//   const token = localStorage.getItem("token");

//   /* ---------------- LOAD DATA ---------------- */
//   useEffect(() => {
//     async function loadOffers() {
//       try {
//         const res = await axios.get(
//           "http://localhost:8080/ngo/profile/assigned-offers",
//           { headers: { Authorization: "Bearer " + token } }
//         );

//         // Ensure assignmentStatus always exists
//         const safeData = (res.data || []).map(o => ({
//           ...o,
//           assignmentStatus: o.assignmentStatus || "ASSIGNED"
//         }));

//         setOffers(safeData);
//       } catch (err) {
//         console.error("Failed fetching offers", err);
//       }
//     }

//     loadOffers();
//   }, []);

//   /* ---------------- STATUS CHANGE ---------------- */
//   const handleStatusChange = (assignmentId, newStatus) => {
//     setStatusChanges(prev => ({
//       ...prev,
//       [assignmentId]: newStatus
//     }));
//   };

//   const updateStatus = async (assignmentId) => {
//     const newStatus = statusChanges[assignmentId];
//     if (!newStatus) return;

//     try {
//       await axios.post(
//         `http://localhost:8080/ngo/profile/assigned-offers/${assignmentId}/update-status?newStatus=${newStatus}`,
//         {},
//         { headers: { Authorization: "Bearer " + token } }
//       );

//       setOffers(prev =>
//         prev.map(o =>
//           o.assignmentId === assignmentId
//             ? { ...o, assignmentStatus: newStatus }
//             : o
//         )
//       );

//       setStatusChanges(prev => ({ ...prev, [assignmentId]: undefined }));
//     } catch (err) {
//       console.error("Failed to update status", err);
//     }
//   };

//   /* ---------------- EXCEL ---------------- */
//   const downloadExcel = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:8080/exports/donations/ngo",
//         { headers: { Authorization: "Bearer " + token } }
//       );

//       if (!response.ok) throw new Error("Failed");

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "Prerana-NGO-Assigned-Donations.xlsx";
//       a.click();

//       window.URL.revokeObjectURL(url);
//     } catch {
//       alert("Unable to download Excel");
//     }
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <>
//       {/* <NgoNav /> */}

//       <div className="ngo-table-container">
//         <div className="ngo-table-header">
//           <h2>Assigned Donation Offers</h2>

//           {offers.length > 0 && (
//             <button className="ngo-excel-btn" onClick={downloadExcel}>
//               ⬇ Download Excel
//             </button>
//           )}
//         </div>

//         <table className="ngo-table">
//           <thead>
//             <tr>
//               <th>Category</th>
//               <th>Amount</th>
//               <th>Donor</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {offers.map(o => {
//               const status = o.assignmentStatus || "ASSIGNED";
//               const allowed = NGO_ALLOWED_TRANSITIONS[status] || [];

//               return (
//                 <tr key={o.assignmentId}>
//                   <td>{o.donationCategory}</td>
//                   <td>{o.amount ? `₹${o.amount}` : "-"}</td>
//                   <td>{o.donorName}</td>

//                   <td>
//                     <span className={`ngo-status status-${status.toLowerCase()}`}>
//                       {status.replace(/_/g, " ")}
//                     </span>
//                   </td>

//                   <td>
//                     <button
//                       className="ngo-detail-btn"
//                       onClick={() => setSelectedOffer(o)}
//                     >
//                       View
//                     </button>

//                     <select
//                       className="ngo-select"
//                       value={statusChanges[o.assignmentId] || status}
//                       onChange={(e) =>
//                         handleStatusChange(o.assignmentId, e.target.value)
//                       }
//                       disabled={allowed.length === 0}
//                     >
//                       <option value={status}>
//                         {status.replace(/_/g, " ")}
//                       </option>

//                       {allowed.map(s => (
//                         <option key={s} value={s}>
//                           {s.replace(/_/g, " ")}
//                         </option>
//                       ))}
//                     </select>

//                     <button
//                       className="ngo-update-btn"
//                       onClick={() => updateStatus(o.assignmentId)}
//                       disabled={
//                         !statusChanges[o.assignmentId] ||
//                         statusChanges[o.assignmentId] === status
//                       }
//                     >
//                       Update
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         {/* DRAWER */}
//         {selectedOffer && (
//           <div className="ngo-drawer-overlay" onClick={() => setSelectedOffer(null)}>
//             <div className="ngo-drawer" onClick={(e) => e.stopPropagation()}>
//               <h2>Donation Offer</h2>

//               <p><strong>Category:</strong> {selectedOffer.donationCategory}</p>
//               <p><strong>Amount:</strong> {selectedOffer.amount || "-"}</p>
//               <p><strong>Reason:</strong> {selectedOffer.reason}</p>
//               <p><strong>Timeline:</strong> {selectedOffer.timeLine}</p>
//               <p><strong>Location:</strong> {selectedOffer.location}</p>

//               <button
//                 className="ngo-close-btn"
//                 onClick={() => setSelectedOffer(null)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import "./ngoDashboard.css";
import "./ngoDonations.css";
import NgoNav from "./NgoNav";

export default function NgoDonations() {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [statusChanges, setStatusChanges] = useState({});

  const NGO_ALLOWED_TRANSITIONS = {
    ASSIGNED: ["IN_PROGRESS", "REJECTED_BY_RECEIVER"],
    IN_PROGRESS: ["COMPLETED", "REJECTED_BY_RECEIVER"],
    COMPLETED: [],
    REJECTED_BY_RECEIVER: [],
    CANCELLED_BY_DONOR: []
  };

  const token = localStorage.getItem("token");

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    async function loadOffers() {
      try {
        const res = await axios.get(
          "http://localhost:8080/ngo/profile/assigned-offers",
          { headers: { Authorization: "Bearer " + token } }
        );

        const safeData = (res.data || []).map(o => ({
          ...o,
          assignmentStatus: o.assignmentStatus || "ASSIGNED"
        }));

        setOffers(safeData);
      } catch (err) {
        console.error("Failed fetching offers", err);
      }
    }

    loadOffers();
  }, []);

  /* ---------------- STATUS CHANGE ---------------- */
  const handleStatusChange = (assignmentId, newStatus) => {
    setStatusChanges(prev => ({
      ...prev,
      [assignmentId]: newStatus
    }));
  };

  const updateStatus = async (assignmentId) => {
    const newStatus = statusChanges[assignmentId];
    if (!newStatus) return;

    try {
      await axios.post(
        `http://localhost:8080/ngo/profile/assigned-offers/${assignmentId}/update-status?newStatus=${newStatus}`,
        {},
        { headers: { Authorization: "Bearer " + token } }
      );

      setOffers(prev =>
        prev.map(o =>
          o.assignmentId === assignmentId
            ? { ...o, assignmentStatus: newStatus }
            : o
        )
      );

      setStatusChanges(prev => ({ ...prev, [assignmentId]: undefined }));
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  /* ---------------- EXCEL ---------------- */
  const downloadExcel = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/exports/donations/ngo",
        { headers: { Authorization: "Bearer " + token } }
      );

      if (!response.ok) throw new Error("Failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Prerana-NGO-Assigned-Donations.xlsx";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch {
      alert("Unable to download Excel");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      {/* <NgoNav /> */}

      <div className="ngo-table-container">
        <div className="ngo-table-header">
          <h2>Assigned Donation Offers</h2>

          {offers.length > 0 && (
            <button className="ngo-excel-btn" onClick={downloadExcel}>
              ⬇ Download Excel
            </button>
          )}
        </div>

        <table className="ngo-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Help Type</th>
              <th>Amount / Items</th>
              <th>Donor</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {offers.map(o => {
              const status = o.assignmentStatus || "ASSIGNED";
              const allowed = NGO_ALLOWED_TRANSITIONS[status] || [];

              return (
                <tr key={o.assignmentId}>
                  <td>{o.donationCategory}</td>

                  <td>{o.helpType}</td>

                  <td>
                    {o.helpType === "FINANCIAL"
                      ? `₹${o.amount}`
                      : `${o.itemDetails || "Items"}${o.quantity ? ` (Qty: ${o.quantity})` : ""}`}
                  </td>

                  <td>{o.donorName}</td>

                  <td>
                    <span className={`ngo-status status-${status.toLowerCase()}`}>
                      {status.replace(/_/g, " ")}
                    </span>
                  </td>

                  <td>
                    <button
                      className="ngo-detail-btn"
                      onClick={() => setSelectedOffer(o)}
                    >
                      View
                    </button>

                    <select
                      className="ngo-select"
                      value={statusChanges[o.assignmentId] || status}
                      onChange={(e) =>
                        handleStatusChange(o.assignmentId, e.target.value)
                      }
                      disabled={allowed.length === 0}
                    >
                      <option value={status}>
                        {status.replace(/_/g, " ")}
                      </option>

                      {allowed.map(s => (
                        <option key={s} value={s}>
                          {s.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>

                    <button
                      className="ngo-update-btn"
                      onClick={() => updateStatus(o.assignmentId)}
                      disabled={
                        !statusChanges[o.assignmentId] ||
                        statusChanges[o.assignmentId] === status
                      }
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* DRAWER */}
        {selectedOffer && (
          <div className="ngo-drawer-overlay" onClick={() => setSelectedOffer(null)}>
            <div className="ngo-drawer" onClick={(e) => e.stopPropagation()}>
              <h2>Donation Offer</h2>

              <p><strong>Category:</strong> {selectedOffer.donationCategory}</p>
              <p><strong>Help Type:</strong> {selectedOffer.helpType}</p>

              {selectedOffer.helpType === "FINANCIAL" ? (
                <p><strong>Amount:</strong> ₹{selectedOffer.amount}</p>
              ) : (
                <>
                  <p><strong>Items:</strong> {selectedOffer.itemDetails}</p>
                  <p><strong>Quantity:</strong> {selectedOffer.quantity || "N/A"}</p>
                </>
              )}

              <p><strong>Reason:</strong> {selectedOffer.reason || "Not specified"}</p>
              <p><strong>Timeline:</strong> {selectedOffer.timeLine}</p>
              <p><strong>Location:</strong> {selectedOffer.location}</p>
              <p><strong>Age Group:</strong> {selectedOffer.ageGroup}</p>
              <p><strong>Gender:</strong> {selectedOffer.gender}</p>
              <p><strong>Preferred Contact:</strong> {selectedOffer.preferredContact}</p>
              <p><strong>Recurring Help:</strong> {selectedOffer.recurringHelp ? "Yes" : "No"}</p>

              <button
                className="ngo-close-btn"
                onClick={() => setSelectedOffer(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
