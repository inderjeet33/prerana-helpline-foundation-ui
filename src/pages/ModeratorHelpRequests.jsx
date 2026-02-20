// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./Moderator.css";

// export default function ModeratorHelpRequests() {
//   const [requests, setRequests] = useState([]);
//   const [helpers, setHelpers] = useState([]);
//   const [assignSelection, setAssignSelection] = useState({});
//   const [loading, setLoading] = useState(false);

//   const [page, setPage] = useState(0);
//   const [size] = useState(6);
//   const [totalPages, setTotalPages] = useState(0);

//   const token = localStorage.getItem("token");

//   const loadData = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         "http://localhost:8080/moderator/help-requests",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { page, size }
//         }
//       );

//       setRequests(res.data.content || []);
//       setTotalPages(res.data.totalPages || 0);

//       const helpersRes = await axios.get(
//         "http://localhost:8080/moderator/help-requests/helpers",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setHelpers(helpersRes.data || []);
//     } catch {
//       alert("Failed to load help requests");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, [page]);

//   const approve = async (id) => {
//     console.log("id is ",id);
//     console.log("token is ",token);
//     await axios.post(
//       `http://localhost:8080/moderator/help-requests/${id}/approve`,
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     loadData();
//   };

//   const reject = async (id) => {
//     await axios.post(
//       `http://localhost:8080/moderator/help-requests/${id}/reject`,
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     loadData();
//   };

//   const assignHelper = async (id) => {
//     const helperId = assignSelection[id];
//     if (!helperId) return alert("Select helper");

//     await axios.post(
//       `http://localhost:8080/moderator/help-requests/${id}/assign`,
//       {},
//       {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { helperId }
//       }
//     );
//     loadData();
//   };

//   return (
//     <div className="mod-cards-wrapper">
//       <div className="mod-header">
//         <h2>Help Requests</h2>
//         <p className="mod-sub">Review & route individual help requests</p>
//       </div>

//       {loading && <p>Loading…</p>}

//       {!loading && requests.map(r => (
//         <div key={r.id} className="help-card">
//             {r.priority=="PRIORITY"&& (
//                 <span className="priority-pill"> ⚡ Priority </span>
//             )}

//           {/* LEFT */}
//           <div className="help-card-left">
//             <h3>{r.requesterName}</h3>
//             <p className="muted">{r.requesterMobile}</p>

//             <div className="help-tags">
//               <span>{r.donationCategory}</span>
//               <span>{r.helpType}</span>
//               <span>{r.urgency}</span>
//             </div>

//             <p className="help-reason">
//               {r.reason || "No reason provided"}
//             </p>
//           </div>

//           {/* RIGHT */}
//           <div className="help-card-right">
//             <span className={`status-pill ${r.status.toLowerCase()}`}>
//               {r.status}
//             </span>

//             {r.status === "OPEN" && (
//               <div className="help-actions">
//                 <button className="btn success" onClick={() => approve(r.id)}>
//                   Approve
//                 </button>
//                 <button className="btn danger" onClick={() => reject(r.id)}>
//                   Reject
//                 </button>
//               </div>
//             )}

//             {r.status === "APPROVED" && !r.helperId && (
//               <div className="help-actions">
//                 <select
//                   value={assignSelection[r.id] || ""}
//                   onChange={(e) =>
//                     setAssignSelection(p => ({ ...p, [r.id]: e.target.value }))
//                   }
//                 >
//                   <option value="">Assign helper</option>
//                   {helpers.map(h => (
//                     <option key={h.id} value={h.id}>
//                       {h.name} ({h.type})
//                     </option>
//                   ))}
//                 </select>

//                 <button className="assign-btn" onClick={() => assignHelper(r.id)}>
//                   Assign
//                 </button>
//               </div>
//             )}

//             {r.helperName && (
//               <div className="assigned-box">
//                 <strong>{r.helperName}</strong>
//                 <span className="muted">{r.helperType}</span>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}

//       {/* PAGINATION */}
//       <div className="pagination">
//         <button disabled={page === 0} onClick={() => setPage(page - 1)}>
//           ← Prev
//         </button>
//         <span>Page {page + 1} of {totalPages}</span>
//         <button
//           disabled={page + 1 >= totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import "./Moderator.css";

const HELPER_TYPES = ["NGO", "CSR", "INDIVIDUAL"];

export default function ModeratorHelpRequests() {
  const [requests, setRequests] = useState([]);
  const [helpers, setHelpers] = useState([]);
  const [assignSelection, setAssignSelection] = useState({});
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(6);
  const [totalPages, setTotalPages] = useState(0);

  const [helperType, setHelperType] = useState("NGO");

  const token = localStorage.getItem("token");

  const loadRequests = async () => {
    const res = await axios.get(
      "http://localhost:8080/moderator/help-requests",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, size }
      }
    );
    setRequests(res.data.content || []);
    setTotalPages(res.data.totalPages || 0);
  };

  const loadHelpers = async (type) => {
    const res = await axios.get(
      "http://localhost:8080/moderator/help-requests/helpers",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { userType: type }
      }
    );
    setHelpers(res.data || []);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadRequests(),
        loadHelpers(helperType)
      ]);
    } catch {
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, helperType]);

  const approve = async (id) => {
    await axios.post(
      `http://localhost:8080/moderator/help-requests/${id}/approve`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadData();
  };

  const reject = async (id) => {
    await axios.post(
      `http://localhost:8080/moderator/help-requests/${id}/reject`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadData();
  };

  const assignHelper = async (id) => {
    const helperId = assignSelection[id];
    if (!helperId) return alert("Select helper");

    await axios.post(
      `http://localhost:8080/moderator/help-requests/${id}/assign`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { helperId }
      }
    );
    loadData();
  };

  return (
    <div className="mod-cards-wrapper">
      <div className="mod-header">
        <h2>Help Requests</h2>
        <p className="mod-sub">Review & assign help requests</p>
      </div>

      {/* 🔹 HELPER TYPE FILTER */}
      <div className="helper-type-tabs">
        {HELPER_TYPES.map(type => (
          <button
            key={type}
            className={`tab-btn ${helperType === type ? "active" : ""}`}
            onClick={() => {
              setHelperType(type);
              setAssignSelection({});
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {loading && <p>Loading…</p>}

      {!loading && requests.map(r => (
        <div key={r.id} className="help-card">
          {r.priority === "PRIORITY" && (
            <span className="priority-pill">⚡ Priority</span>
          )}

          {/* LEFT */}
          <div className="help-card-left">
            <h3>{r.requesterName}</h3>
            <p className="muted">{r.requesterMobile}</p>

            <div className="help-tags">
              <span>{r.donationCategory}</span>
              <span>{r.helpType}</span>
              <span>{r.urgency}</span>
            </div>

            <p className="help-reason">
              {r.reason || "No reason provided"}
            </p>
          </div>

          {/* RIGHT */}
          <div className="help-card-right">
            <span className={`status-pill ${r.status.toLowerCase()}`}>
              {r.status}
            </span>

            {r.status === "OPEN" && (
              <div className="help-actions">
                <button className="btn success" onClick={() => approve(r.id)}>
                  Approve
                </button>
                <button className="btn danger" onClick={() => reject(r.id)}>
                  Reject
                </button>
              </div>
            )}

            {r.status === "APPROVED" && !r.helperId && (
              <div className="help-actions">
                <select
                  value={assignSelection[r.id] || ""}
                  onChange={(e) =>
                    setAssignSelection(p => ({
                      ...p,
                      [r.id]: e.target.value
                    }))
                  }
                >
                  <option value="">Assign {helperType}</option>
                  {helpers.map(h => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>

                <button
                  className="assign-btn"
                  onClick={() => assignHelper(r.id)}
                >
                  Assign
                </button>
              </div>
            )}

            {r.helperName && (
              <div className="assigned-box">
                <strong>{r.helperName}</strong>
                <span className="muted">{r.helperType}</span>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          ← Prev
        </button>
        <span>Page {page + 1} of {totalPages}</span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
