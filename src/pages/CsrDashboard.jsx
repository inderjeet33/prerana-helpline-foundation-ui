// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import "./CsrDashboard.css";

// export default function CsrDashboard() {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     // backend later
//     setStats({
//       companyName: "ABC Technologies Pvt Ltd",
//       status: "VERIFIED",

//       totalDonationAmount: 1850000,
//       totalContributions: 42,
//       activeCommitments: 6,
//       ngosPartnered: 8,
//       helpRequestsFulfilled: 19,

//       csrBudget: 5000000,
//       utilized: 1850000
//     });
//   }, []);

//   const remaining =
//     stats ? stats.csrBudget - stats.utilized : 0;

//   return (
//     <div className="csr-dashboard-page">
     

//       <div className="with-sidebar">
//         <div className="csr-container">

//           {/* HEADER */}
//           <div className="csr-header">
//             <div>
//               <h1>{stats?.companyName}</h1>
//               <p>Corporate Social Responsibility Dashboard</p>
//             </div>

//             {stats?.status && (
//               <span className={`csr-status ${stats.status.toLowerCase()}`}>
//                 {stats.status}
//               </span>
//             )}
//           </div>

//           {/* KPI CARDS */}
//           <div className="csr-kpi-grid">
//             <Kpi label="Total CSR Spend" value={`₹${stats?.totalDonationAmount?.toLocaleString()}`} />
//             <Kpi label="Total Contributions" value={stats?.totalContributions} />
//             <Kpi label="Active Commitments" value={stats?.activeCommitments} />
//             <Kpi label="NGOs Partnered" value={stats?.ngosPartnered} />
//             <Kpi label="Help Requests Fulfilled" value={stats?.helpRequestsFulfilled} />
//           </div>

//           {/* CSR UTILIZATION */}
//           <div className="csr-utilization-card">
//             <h3>CSR Budget Utilization</h3>

//             <div className="csr-utilization-numbers">
//               <span>Allocated: ₹{stats?.csrBudget?.toLocaleString()}</span>
//               <span>Utilized: ₹{stats?.utilized?.toLocaleString()}</span>
//               <span>Remaining: ₹{remaining?.toLocaleString()}</span>
//             </div>

//             <div className="csr-progress">
//               <div
//                 className="csr-progress-fill"
//                 style={{
//                   width: `${(stats?.utilized / stats?.csrBudget) * 100}%`
//                 }}
//               />
//             </div>
//           </div>

//           {/* IMPACT SUMMARY */}
//           <div className="csr-impact-grid">
//             <ImpactCard title="Health Initiatives" value="8 Programs" />
//             <ImpactCard title="Education Support" value="6 Programs" />
//             <ImpactCard title="Food & Nutrition" value="11 Programs" />
//             <ImpactCard title="Shelter & Welfare" value="4 Programs" />
//           </div>

//           {/* ACTIVE ENGAGEMENTS */}
//           <div className="csr-table-card">
//             <h3>Active Engagements</h3>

//             <table className="csr-table">
//               <thead>
//                 <tr>
//                   <th>Type</th>
//                   <th>Category</th>
//                   <th>Partner</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 <tr>
//                   <td>Donation</td>
//                   <td>Health</td>
//                   <td>Smile Foundation</td>
//                   <td className="status in_progress">IN PROGRESS</td>
//                 </tr>
//                 <tr>
//                   <td>Help Request</td>
//                   <td>Education</td>
//                   <td>Local Individual</td>
//                   <td className="status assigned">ASSIGNED</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- SMALL COMPONENTS ---------- */

// function Kpi({ label, value }) {
//   return (
//     <div className="csr-kpi-card">
//       <span className="csr-kpi-label">{label}</span>
//       <h2 className="csr-kpi-value">{value ?? "-"}</h2>
//     </div>
//   );
// }

// function ImpactCard({ title, value }) {
//   return (
//     <div className="csr-impact-card">
//       <h4>{title}</h4>
//       <p>{value}</p>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./csrDashboard.css";

export default function CsrDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/dashboard/csr-stats", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(setStats);
  }, []);

  return (
    <div className="csr-wrap">

      {/* HEADER */}
      <div className="csr-header">
        <div>
          <h1>CSR Impact Dashboard</h1>
          <p>
            Monitor contributions, compliance, and social outcomes
          </p>
        </div>

        <button
          className="csr-primary-btn"
          onClick={() => navigate("/csr/donate")}
        >
          + New Contribution
        </button>
      </div>

      {/* KPI ROW */}
      <div className="csr-kpi-grid">
        <div className="csr-kpi">
          <span>Total CSR Spend</span>
          <h2>₹{stats?.totalDonationAmount ?? "—"}</h2>
        </div>

        <div className="csr-kpi">
          <span>Contributions</span>
          <h2>{stats?.totalDonations ?? "—"}</h2>
        </div>

        <div className="csr-kpi">
          <span>Help Requests Fulfilled</span>
          <h2>{stats?.helpRequestsFulfilled ?? "—"}</h2>
        </div>

        <div className="csr-kpi">
          <span>NGOs Partnered</span>
          <h2>{stats?.ngosSupported ?? "—"}</h2>
        </div>
      </div>

      {/* SECTIONS */}
      <div className="csr-sections">

        <div className="csr-section-card">
          <h3>Contributions</h3>
          <p>
            Track financial and non-financial contributions made by your
            organization.
          </p>

          <button onClick={() => navigate("/csr-donations")}>
            View Contributions →
          </button>
        </div>

        <div className="csr-section-card">
          <h3>Assigned Help Requests</h3>
          <p>
            Support individuals or NGOs through assigned help requests.
          </p>

          <button onClick={() => navigate("/csr-help-requests")}>
            View Assignments →
          </button>
        </div>

        <div className="csr-section-card">
          <h3>CSR Profile & Compliance</h3>
          <p>
            Manage company details, CSR profile, and compliance information.
          </p>

          <button onClick={() => navigate("/csr/profile")}>
            Manage Profile →
          </button>
        </div>

      </div>
    </div>
  );
}
