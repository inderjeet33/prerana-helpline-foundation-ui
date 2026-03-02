// import React, { useEffect, useState } from "react";
// import "./CsrHelpRequests.css";

// export default function CsrHelpRequests() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [statusUpdates, setStatusUpdates] = useState({});

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchAssigned();
//   }, []);

//   async function fetchAssigned() {
//     try {
//       const res = await fetch(
//         "http://localhost:8080/csr/help-requests/assigned",
//         { headers: { Authorization: "Bearer " + token } }
//       );
//       const data = await res.json();
//       setRequests(data || []);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const updateStatus = async (assignmentId) => {
//     const newStatus = statusUpdates[assignmentId];
//     if (!newStatus) return;

//     await fetch(
//       `http://localhost:8080/csr/help-requests/${assignmentId}/update-status?status=${newStatus}`,
//       {
//         method: "POST",
//         headers: { Authorization: "Bearer " + token }
//       }
//     );

//     fetchAssigned();
//   };

//   if (loading) return <div className="csr-loader">Loading…</div>;

//   return (
//     <div className="csr-help-container">
//       <div className="csr-header">
//         <h1>Help Requests Assigned to You</h1>
//         <p>Track and fulfill requests as part of your CSR initiatives</p>
//       </div>

//       <table className="csr-table">
//         <thead>
//           <tr>
//             <th>Category</th>
//             <th>Type</th>
//             <th>Details</th>
//             <th>Location</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {requests.map(r => (
//             <tr key={r.assignmentId}>
//               <td>{r.donationCategory}</td>
//               <td>{r.helpType}</td>

//               <td>
//                 {r.amount && <>₹{r.amount}</>}
//                 {r.itemDetails && (
//                   <>
//                     {r.itemDetails}
//                     {r.quantity && ` (Qty: ${r.quantity})`}
//                   </>
//                 )}
//               </td>

//               <td>{r.location}</td>

//               <td>
//                 <span className={`csr-status ${r.assignmentStatus.toLowerCase()}`}>
//                   {r.assignmentStatus.replaceAll("_", " ")}
//                 </span>
//               </td>

//               <td>
//                 <select
//                   value={statusUpdates[r.assignmentId] || r.assignmentStatus}
//                   onChange={(e) =>
//                     setStatusUpdates(prev => ({
//                       ...prev,
//                       [r.assignmentId]: e.target.value
//                     }))
//                   }
//                 >
//                   <option value={r.assignmentStatus}>
//                     {r.assignmentStatus}
//                   </option>

//                   {r.assignmentStatus === "ASSIGNED" && (
//                     <>
//                       <option value="IN_PROGRESS">IN PROGRESS</option>
//                       <option value="HELP_REJECTED_BY_HELPER">REJECT</option>
//                     </>
//                   )}

//                   {r.assignmentStatus === "IN_PROGRESS" && (
//                     <option value="COMPLETED">COMPLETED</option>
//                   )}
//                 </select>

//                 <button
//                   className="csr-update-btn"
//                   disabled = {
//                     !statusUpdates[r.assignmentId] || statusUpdates[r.assignmentId] == r.assignmentStatus
//                   }
//                   onClick={() => updateStatus(r.assignmentId)}
//                 >
//                   Update
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import "./CsrHelpRequests.css";

export default function CsrHelpRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [view, setView] = useState("ACTIVE");

  const token = localStorage.getItem("token");

  const STATUS_TRANSITIONS = {
    ASSIGNED: ["IN_PROGRESS", "HELP_REJECTED_BY_HELPER"],
    IN_PROGRESS: ["COMPLETED"],
    COMPLETED: [],
    HELP_REJECTED_BY_HELPER: []
  };

  useEffect(() => {
    fetchAssigned();
  }, [view]);

  async function fetchAssigned() {
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8080/csr/help-requests/assigned?view=${view}`,
        { headers: { Authorization: "Bearer " + token } }
      );

      const data = await res.json();
      console.log("data ",data);
      setRequests(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const updateStatus = async (assignmentId) => {
    const newStatus = statusUpdates[assignmentId];
    if (!newStatus) return;

    await fetch(
      `http://localhost:8080/csr/help-requests/${assignmentId}/update-status?status=${newStatus}`,
      {
        method: "POST",
        headers: { Authorization: "Bearer " + token }
      }
    );

    fetchAssigned();
  };

  if (loading) return <div className="csr-loader">Loading…</div>;

  return (
    <div className="csr-help-container">
      <div className="csr-header">
        <h1>Help Requests Assigned to You</h1>
        <p>Track and fulfill requests as part of your CSR initiatives</p>
      </div>

      {/* Tabs */}
      <div className="csr-tabs">
        <button
           className={`app-btn app-btn-secondary ${
    view === "ACTIVE" ? "app-btn-active" : ""
  }`}
          onClick={() => setView("ACTIVE")}
        >
          Active
        </button>

        <button
          className={`app-btn app-btn-secondary ${
    view === "ACTIVE" ? "app-btn-active" : ""
  }`}
          onClick={() => setView("HISTORY")}
        >
          History
        </button>
      </div>

      <table className="csr-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Type</th>
            <th>Details</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map(r => {
            const allowed = STATUS_TRANSITIONS[r.assignmentStatus] || [];

            return (
              <tr key={r.assignmentId}>
                <td>{r.donationCategory}</td>
                <td>{r.helpType}</td>

                <td>
                  {r.amount && <>₹{r.amount}</>}
                  {r.itemDetails && (
                    <>
                      {r.itemDetails}
                      {r.quantity && ` (Qty: ${r.quantity})`}
                    </>
                  )}
                </td>

                <td>{r.location}</td>

                <td>
                  <span className={`csr-status ${r.assignmentStatus.toLowerCase()}`}>
                    {r.assignmentStatus.replaceAll("_", " ")}
                  </span>
                </td>

                <td>
                  <select
                    value={statusUpdates[r.assignmentId] || r.assignmentStatus}
                    onChange={(e) =>
                      setStatusUpdates(prev => ({
                        ...prev,
                        [r.assignmentId]: e.target.value
                      }))
                    }
                    disabled={view === "HISTORY" || allowed.length === 0}
                  >
                    <option value={r.assignmentStatus}>
                      {r.assignmentStatus.replaceAll("_", " ")}
                    </option>

                    {allowed.map(s => (
                      <option key={s} value={s}>
                        {s.replaceAll("_", " ")}
                      </option>
                    ))}
                  </select>

                  <button
                    className="csr-update-btn"
                    disabled={
                      view === "HISTORY" ||
                      !statusUpdates[r.assignmentId] ||
                      statusUpdates[r.assignmentId] === r.assignmentStatus
                    }
                    onClick={() => updateStatus(r.assignmentId)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}