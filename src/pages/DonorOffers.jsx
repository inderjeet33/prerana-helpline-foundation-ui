

// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./Moderator.css";
// import ModeratorDonationOfferDetailsDrawer from "./ModeratorDonationOfferDetailsDrawer";

// export default function DonorOffers() {
//   const [offers, setOffers] = useState([]);
//   const [ngos, setNgos] = useState([]);
//   const [selectedOffer, setSelectedOffer] = useState(null);
//   const [detailOpen, setDetailOpen] = useState(false);
//   const [assignSelection, setAssignSelection] = useState({});
//   const [loading, setLoading] = useState(false);

//   const [page, setPage] = useState(0);
//   const [size] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);
//     const [view, setView] = useState("ACTIVE");
//     const [sort, setSort] = useState("createdAt,desc");


//   const [filters, setFilters] = useState({
//     search: "",
//     category: "",
//     type: "",
//     status: "",
//   });

//   const token = localStorage.getItem("token");

//   /* ---------- LOAD DATA ---------- */
//   const loadData = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         "http://localhost:8080/moderator/moderator/offers",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { page, size,view,sort, ...filters },
//         }
//       );

//       setOffers(res.data.content || []);
//       setTotalPages(res.data.totalPages || 0);

//       const resNgos = await axios.get(
//         "http://localhost:8080/moderator/moderator/ngos",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { verified: true },
//         }
//       );

//       setNgos(resNgos.data.content || []);
//     } catch (e) {
//       console.error(e);
//       alert("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, [page, filters,sort,view]);

//   /* ---------- ASSIGN ---------- */
//   const assignOffer = async (offerId) => {
//     const receiverId = assignSelection[offerId];
//     if (!receiverId) return alert("Select NGO first");

//     await axios.post(
//       "http://localhost:8080/moderator/assign",
//       { donationRequestId: offerId, receiverId },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     loadData();
//   };

//   /* ---------- MARK EXPIRED ---------- */
//   const markExpired = async (offerId) => {
//     if (!window.confirm("Mark this offer as EXPIRED?")) return;

//     await axios.put(
//       `http://localhost:8080/moderator/offers/${offerId}/expire`,
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     loadData();
//   };

//   /* ---------- UI ---------- */
//   return (
//     <div className="mod-table-wrapper">
//       <div className="mod-header">
//         <div>
//           <h2>Donation Offers</h2>
//           <p className="mod-sub">Review and assign NGOs</p>
//         </div>
//       </div>

// <select onChange={(e) =>{ setPage(0); setSort(e.target.value)}}>
//   <option value="createdAt,desc">Newest First</option>
//   <option value="createdAt,asc">Oldest First</option>
// </select>
//       <div className="mod-tabs">
//   <button
//     className={`app-btn ${view === "ACTIVE" ? "app-btn-active" : "app-btn-secondary"}`}
//     onClick={() => setView("ACTIVE")}
//   >
//     Active
//   </button>

//   <button
//     className={`app-btn ${view === "HISTORY" ? "app-btn-active" : "app-btn-secondary"}`}
//     onClick={() => setView("HISTORY")}
//   >
//     History
//   </button>
// </div>

//       {/* FILTER BAR */}
//       <div className="filter-bar">
//         <input
//           placeholder="Search donor / reason"
//           value={filters.search}
//           onChange={(e) => {
//             setPage(0);
//             setFilters({ ...filters, search: e.target.value });
//           }}
//         />

//         <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
//           <option value="">All Categories</option>
//           <option value="HEALTH">HEALTH</option>
//           <option value="EDUCATION">EDUCATION</option>
//           <option value="ORPHANS">ORPHANS</option>
//           <option value="OLD_AGE">OLD AGE</option>
//           <option value="FOOD_CLOTHING">FOOD & CLOTHING</option>
//           <option value="SHELTER">SHELTER</option>
//           <option value="DISABLED">DISABLED</option>
//           <option value="OTHER">OTHER</option>
//         </select>

//         <select onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
//           <option value="">All Types</option>
//           <option value="FINANCIAL">FINANCIAL</option>
//           <option value="FOOD">FOOD</option>
//           <option value="CLOTHES">CLOTHES</option>
//           <option value="BOOKS">BOOKS</option>
//           <option value="MEDICAL">MEDICAL</option>
//           <option value="OTHER">OTHER</option>
//         </select>

//         <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
//           <option value="">All Status</option>
//           <option value="OPEN">OPEN</option>
//           <option value="ASSIGNED">ASSIGNED</option>
//           <option value="IN_PROGRESS">IN PROGRESS</option>
//           <option value="DELIVERED">DELIVERED</option>
//           <option value="COMPLETED">COMPLETED</option>
//           <option value="EXPIRED">EXPIRED</option>
//           <option value="CANCELLED">CANCELLED</option>
//           <option value="CANCELLED">UNDER REVIEW</option>

//         </select>

//         <button
//           className="btn secondary"
//           onClick={() => {
//             setPage(0);
//             setFilters({ search: "", category: "", type: "", status: "" });
//           }}
//         >
//           Reset
//         </button>
//       </div>

//       {/* TABLE */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="mod-table">
//           <thead>
//             <tr>
//               <th>Category</th>
//               <th>Donor</th>
//               <th>Reason</th>
//               <th>Type</th>
//               <th>Assigned NGO</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {offers.map((o) => (
//               <tr key={o.id} onClick={() => setDetailOpen(true) || setSelectedOffer(o)}>
//                 <td>{o.donationCategory}</td>
//                 <td>{o.user?.fullName}</td>
//                 <td>{o.reason}</td>
//                 <td>{o.helpType}</td>
//                 <td>{o.receiverName || "Not Assigned"}</td>
//                 <td>
//   <span className={`status-badge status-${o.status.toLowerCase()}`}>
//     {o.status.replaceAll("_", " ")}
//   </span>
// </td>
//                 {/* <td onClick={(e) => e.stopPropagation()}>
//                   {o.status === "OPEN" && (
//                     <>
//                       <select
//                         value={assignSelection[o.id] || ""}
//                         onChange={(e) =>
//                           setAssignSelection((p) => ({
//                             ...p,
//                             [o.id]: e.target.value,
//                           }))
//                         }
//                       >
//                         <option value="">Select NGO</option>
//                         {ngos.map((n) => (
//                           <option key={n.user.id} value={n.user.id}>
//                             {n.ngoName}
//                           </option>
//                         ))}
//                       </select>

//                       <button
//                         className="assign-btn"
//                         onClick={() => assignOffer(o.id)}
//                       >
//                         Assign
//                       </button>

//                       <button
//                         className="btn danger"
//                         onClick={() => markExpired(o.id)}
//                       >
//                         Expire
//                       </button>
//                     </>
//                   )}
//                 </td> */}
//                 <td onClick={(e) => e.stopPropagation()}>
//   {o.status === "OPEN" ? (
//     <>
//       <select
//         value={assignSelection[o.id] || ""}
//         onChange={(e) =>
//           setAssignSelection((p) => ({
//             ...p,
//             [o.id]: e.target.value,
//           }))
//         }
//       >
//         <option value="">Select NGO</option>
//         {ngos.map((n) => (
//           <option key={n.user.id} value={n.user.id}>
//             {n.ngoName}
//           </option>
//         ))}
//       </select>

//       <button
//         className="assign-btn"
//         onClick={() => assignOffer(o.id)}
//       >
//         Assign
//       </button>

//       <button
//         className="btn danger"
//         onClick={() => markExpired(o.id)}
//       >
//         Expire
//       </button>
//     </>
//   ) : (
//     <span className="mod-no-action">—</span>
//   )}
// </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* PAGINATION */}
//       <div className="pagination">
//         <button disabled={page === 0} onClick={() => setPage(page - 1)}>
//           ← Prev
//         </button>

//         <span>
//           Page {page + 1} of {totalPages}
//         </span>

//         <button
//           disabled={page + 1 >= totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           Next →
//         </button>
//       </div>

//       <ModeratorDonationOfferDetailsDrawer
//         open={detailOpen}
//         data={selectedOffer}
//         onClose={() => setDetailOpen(false)}
//       />
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Moderator.css";
// import ModeratorDonationOfferDetailsDrawer from "./ModeratorDonationOfferDetailsDrawer";

// export default function DonorOffers() {
//   const navigate = useNavigate();

//   const [offers, setOffers] = useState([]);
//   const [ngos, setNgos] = useState([]);
//   const [selectedOffer, setSelectedOffer] = useState(null);
//   const [detailOpen, setDetailOpen] = useState(false);
//   const [assignSelection, setAssignSelection] = useState({});
//   const [loading, setLoading] = useState(false);

//   const [page, setPage] = useState(0);
//   const [size] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);
//   const [view, setView] = useState("ACTIVE");
//   const [sort, setSort] = useState("createdAt,desc");

//   const [filters, setFilters] = useState({
//     search: "",
//     category: "",
//     type: "",
//     status: "",
//   });

//   const token = localStorage.getItem("token");

//   /* ---------- LOAD DATA ---------- */
//   const loadData = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         "http://localhost:8080/moderator/moderator/offers",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { page, size, view, sort, ...filters },
//         }
//       );

//       setOffers(res.data.content || []);
//       setTotalPages(res.data.totalPages || 0);

//       const resNgos = await axios.get(
//         "http://localhost:8080/moderator/moderator/ngos",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { verified: true },
//         }
//       );

//       setNgos(resNgos.data.content || []);
//     } catch (e) {
//       console.error(e);
//       alert("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, [page, filters, sort, view]);

//   /* ---------- ASSIGN ---------- */
//   const assignOffer = async (offerId) => {
//     const receiverId = assignSelection[offerId];
//     if (!receiverId) return alert("Select NGO first");

//     await axios.post(
//       "http://localhost:8080/moderator/assign",
//       { donationRequestId: offerId, receiverId },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     loadData();
//   };

//   /* ---------- MARK EXPIRED ---------- */
//   const markExpired = async (offerId) => {
//     if (!window.confirm("Mark this offer as EXPIRED?")) return;

//     await axios.put(
//       `http://localhost:8080/moderator/offers/${offerId}/expire`,
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     loadData();
//   };

//   /* ---------- UI ---------- */
//   return (
//     <div className="mod-table-wrapper">

//       <div className="mod-header">
//         <div>
//           <h2>Donation Offers</h2>
//           <p className="mod-sub">Review and assign NGOs</p>
//         </div>
//       </div>

//       {/* SORT */}
//       <select
//         value={sort}
//         onChange={(e) => {
//           setPage(0);
//           setSort(e.target.value);
//         }}
//       >
//         <option value="createdAt,desc">Newest First</option>
//         <option value="createdAt,asc">Oldest First</option>
//       </select>

//       {/* VIEW TABS */}
//       <div className="mod-tabs">
//         <button
//           className={`app-btn ${
//             view === "ACTIVE" ? "app-btn-active" : "app-btn-secondary"
//           }`}
//           onClick={() => {
//             setPage(0);
//             setView("ACTIVE");
//           }}
//         >
//           Active
//         </button>

//         <button
//           className={`app-btn ${
//             view === "HISTORY" ? "app-btn-active" : "app-btn-secondary"
//           }`}
//           onClick={() => {
//             setPage(0);
//             setView("HISTORY");
//           }}
//         >
//           History
//         </button>
//       </div>

//       {/* FILTER BAR */}
//       <div className="filter-bar">
//         <input
//           placeholder="Search donor / reason"
//           value={filters.search}
//           onChange={(e) => {
//             setPage(0);
//             setFilters({ ...filters, search: e.target.value });
//           }}
//         />

//         <select
//           onChange={(e) =>
//             setFilters({ ...filters, category: e.target.value })
//           }
//         >
//           <option value="">All Categories</option>
//           <option value="HEALTH">HEALTH</option>
//           <option value="EDUCATION">EDUCATION</option>
//           <option value="ORPHANS">ORPHANS</option>
//           <option value="OLD_AGE">OLD AGE</option>
//           <option value="FOOD_CLOTHING">FOOD & CLOTHING</option>
//           <option value="SHELTER">SHELTER</option>
//           <option value="DISABLED">DISABLED</option>
//           <option value="OTHER">OTHER</option>
//         </select>

//         <select
//           onChange={(e) =>
//             setFilters({ ...filters, type: e.target.value })
//           }
//         >
//           <option value="">All Types</option>
//           <option value="FINANCIAL">FINANCIAL</option>
//           <option value="FOOD">FOOD</option>
//           <option value="CLOTHES">CLOTHES</option>
//           <option value="BOOKS">BOOKS</option>
//           <option value="MEDICAL">MEDICAL</option>
//           <option value="OTHER">OTHER</option>
//         </select>

//         <select
//           onChange={(e) =>
//             setFilters({ ...filters, status: e.target.value })
//           }
//         >
//           <option value="">All Status</option>
//           <option value="OPEN">OPEN</option>
//           <option value="ASSIGNED">ASSIGNED</option>
//           <option value="IN_PROGRESS">IN_PROGRESS</option>
//           <option value="DELIVERED">DELIVERED</option>
//           <option value="COMPLETED">COMPLETED</option>
//           <option value="EXPIRED">EXPIRED</option>
//           <option value="CANCELLED">CANCELLED</option>
//           <option value="UNDER_REVIEW">UNDER_REVIEW</option>
//         </select>

//         <button
//           className="btn secondary"
//           onClick={() => {
//             setPage(0);
//             setFilters({ search: "", category: "", type: "", status: "" });
//           }}
//         >
//           Reset
//         </button>
//       </div>

//       {/* TABLE */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="mod-table">
//           <thead>
//             <tr>
//               <th>Category</th>
//               <th>Donor</th>
//               <th>Reason</th>
//               <th>Type</th>
//               <th>Assigned NGO</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {offers.map((o) => (
//               <tr
//                 key={o.id}
//                 onClick={() => {
//                   setSelectedOffer(o);
//                   setDetailOpen(true);
//                 }}
//               >
//                 <td>{o.donationCategory}</td>

//                 {/* CLICKABLE DONOR */}
//                 <td
//                   className="mod-link"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     navigate(`/moderator/users/${o.user.id}`);
//                   }}
//                 >
//                   {o.user?.fullName}
//                 </td>

//                 <td>{o.reason}</td>
//                 <td>{o.helpType}</td>

//                 {/* CLICKABLE NGO */}
//                 <td
//                   className="mod-link"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     if (o.receiverId)
//                       navigate(`/moderator/ngos/${o.receiverId}`);
//                   }}
//                 >
//                   {o.receiverName || "Not Assigned"}
//                 </td>

//                 <td>
//                   <span
//                     className={`status-badge status-${o.status.toLowerCase()}`}
//                   >
//                     {o.status.replaceAll("_", " ")}
//                   </span>
//                 </td>

//                 {/* ACTION */}
//                 <td onClick={(e) => e.stopPropagation()}>
//                   {o.status === "OPEN" ? (
//                     <>
//                       <select
//                         value={assignSelection[o.id] || ""}
//                         onChange={(e) =>
//                           setAssignSelection((p) => ({
//                             ...p,
//                             [o.id]: e.target.value,
//                           }))
//                         }
//                       >
//                         <option value="">Select NGO</option>
//                         {ngos.map((n) => (
//                           <option key={n.user.id} value={n.user.id}>
//                             {n.ngoName}
//                           </option>
//                         ))}
//                       </select>

//                       <button
//                         className="assign-btn"
//                         onClick={() => assignOffer(o.id)}
//                       >
//                         Assign
//                       </button>

//                       <button
//                         className="btn danger"
//                         onClick={() => markExpired(o.id)}
//                       >
//                         Expire
//                       </button>
//                     </>
//                   ) : (
//                     <span className="mod-no-action">—</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* PAGINATION */}
//       <div className="pagination">
//         <button disabled={page === 0} onClick={() => setPage(page - 1)}>
//           ← Prev
//         </button>

//         <span>
//           Page {page + 1} of {totalPages}
//         </span>

//         <button
//           disabled={page + 1 >= totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           Next →
//         </button>
//       </div>

//       {/* DRAWER */}
//       <ModeratorDonationOfferDetailsDrawer
//         open={detailOpen}
//         data={selectedOffer}
//         onClose={() => setDetailOpen(false)}
//       />
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import "./Moderator.css";
import ModeratorDonationOfferDetailsDrawer from "./ModeratorDonationOfferDetailsDrawer";

export default function DonorOffers({ onOpenUserProfile }) {

  const [offers, setOffers] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [assignSelection, setAssignSelection] = useState({});
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [view, setView] = useState("ACTIVE");
  const [sort, setSort] = useState("createdAt,desc");

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    type: "",
    status: "",
  });

  const token = localStorage.getItem("token");

  /* ---------- LOAD DATA ---------- */
  const loadData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:8080/moderator/moderator/offers",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, size, view, sort, ...filters },
        }
      );

      setOffers(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);

      const resNgos = await axios.get(
        "http://localhost:8080/moderator/moderator/ngos",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { verified: true },
        }
      );

      setNgos(resNgos.data.content || []);
    } catch (e) {
      console.error(e);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, filters, sort, view]);

  /* ---------- ASSIGN ---------- */
  const assignOffer = async (offerId) => {
    const receiverId = assignSelection[offerId];
    if (!receiverId) return alert("Select NGO first");

    await axios.post(
      "http://localhost:8080/moderator/assign",
      { donationRequestId: offerId, receiverId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    loadData();
  };

  /* ---------- UI ---------- */
  return (
    <div className="mod-table-wrapper">

      <div className="mod-header">
        <div>
          <h2>Donation Offers</h2>
          <p className="mod-sub">Review and assign NGOs</p>
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="mod-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Donor</th>
              <th>Reason</th>
              <th>Type</th>
              <th>Assigned NGO</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {offers.map((o) => (
              <tr
                key={o.id}
                onClick={() => {
                  setSelectedOffer(o);
                  setDetailOpen(true);
                }}
              >
                <td>{o.donationCategory}</td>

                {/* CLICK DONOR → PROFILE */}
                <td
                  className="view-cell"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenUserProfile(o.user.id);
                  }}
                >
                  {o.user?.fullName}
                </td>

                <td>{o.reason}</td>
                <td>{o.helpType}</td>

                <td>{o.receiverName || "Not Assigned"}</td>

                <td>
                  <span
                    className={`status-badge status-${o.status.toLowerCase()}`}
                  >
                    {o.status.replaceAll("_", " ")}
                  </span>
                </td>

                <td onClick={(e) => e.stopPropagation()}>
                  {o.status === "OPEN" ? (
                    <>
                      <select
                        value={assignSelection[o.id] || ""}
                        onChange={(e) =>
                          setAssignSelection((p) => ({
                            ...p,
                            [o.id]: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select NGO</option>
                        {ngos.map((n) => (
                          <option key={n.user.id} value={n.user.id}>
                            {n.ngoName}
                          </option>
                        ))}
                      </select>

                      <button
                        className="assign-btn"
                        onClick={() => assignOffer(o.id)}
                      >
                        Assign
                      </button>
                    </>
                  ) : (
                    <span className="mod-no-action">—</span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          ← Prev
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next →
        </button>
      </div>

      <ModeratorDonationOfferDetailsDrawer
        open={detailOpen}
        data={selectedOffer}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}