// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const CampaignList = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [selectedCampaign, setSelectedCampaign] = useState(null);

//   useEffect(() => {
//     loadCampaigns();
//   }, []);

//   const loadCampaigns = async () => {
//     const token = localStorage.getItem("ngoTempToken");
//     const res = await axios.get("/campaign/my-campaigns", {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setCampaigns(res.data);
//   };

//   return (
//     <div className="ngo-table-container">
//       <h2>My Campaigns</h2>

//       <table className="ngo-table">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Goal</th>
//             <th>Collected</th>
//             <th>Status</th>
//             <th>Deadline</th>
//             <th>View</th>
//           </tr>
//         </thead>

//         <tbody>
//           {campaigns.map((c) => (
//             <tr key={c.id}>
//               <td>{c.title}</td>
//               <td>₹{c.goalAmount}</td>
//               <td>₹{c.collectedAmount}</td>

//               <td>
//                 <span className="ngo-status status-accepted">
//                   {c.status}
//                 </span>
//               </td>

//               <td>{c.deadline}</td>

//               <td>
//                 <button
//                   className="ngo-detail-btn"
//                   onClick={() => setSelectedCampaign(c)}
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Drawer */}
//       {selectedCampaign && (
//         <div className="ngo-drawer-overlay">
//           <div className="ngo-drawer">

//             <h3>{selectedCampaign.title}</h3>
//             <p><strong>Description:</strong> {selectedCampaign.description}</p>
//             <p><strong>Goal Amount:</strong> ₹{selectedCampaign.goalAmount}</p>
//             <p><strong>Collected:</strong> ₹{selectedCampaign.collectedAmount}</p>
//             <p><strong>Status:</strong> {selectedCampaign.status}</p>
//             <p><strong>Deadline:</strong> {selectedCampaign.deadline}</p>

//             {selectedCampaign.imageUrl && (
//               <img
//                 src={selectedCampaign.imageUrl}
//                 alt="Campaign"
//                 width="100%"
//                 style={{ borderRadius: 8, marginTop: 10 }}
//               />
//             )}

//             <button
//               className="ngo-close-btn"
//               onClick={() => setSelectedCampaign(null)}
//             >
//               Close
//             </button>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CampaignList;
