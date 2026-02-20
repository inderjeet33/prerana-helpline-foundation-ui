
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./dashboard.css";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import donateIcon from "../assets/donate-icon.png";
// import contributionIcon from "../assets/contributions.png";
// import impactHero from "../assets/impact-hero.jpg";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     loadStats();
//   }, []);

//   async function loadStats() {
//     const token = localStorage.getItem("token");
//     const res = await fetch(
//       "http://localhost:8080/dashboard/individual-stats",
//       {
//         headers: { Authorization: "Bearer " + token }
//       }
//     );
//     const stats = await res.json();
//     console.log(stats);
//     setStats(stats);
//   }

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good Morning ☀️";
//     if (hour < 18) return "Good Afternoon 🌤️";
//     return "Good Evening 🌙";
//   };

//   return (
//     <>
//       <Navbar />
//       <Sidebar />

//       <main className="dashboard-main">

//         {/* TOP SECTION */}
//         <section className="dashboard-top">

//           {/* WELCOME */}
//           <div className="welcome-box welcome-split">
//             <div className="welcome-text">
//               <h1>{getGreeting()}</h1>
//               <p>
//                 Your compassion is creating real impact.  
//                 Let’s continue changing lives together.
//               </p>

//               <button onClick={() => navigate("/donate")}>
//                 Make a Donation
//               </button>
//             </div>

//             {/* <div className="welcome-visual">
//               <img src={impactHero} alt="Community impact" />
//             </div> */}
//           </div>

//           {/* STATS */}
//           <div className="stats-box">
//             <div className="stat">
//               <h2>{stats?.ngosConnected ?? "-"}</h2>
//               <span>NGOs Connected</span>
//             </div>
//             <div className="stat">
//               <h2>{stats?.totalDonations ?? "-"}</h2>
//               <span>Donations Offered</span>
//             </div>
//             <div className="stat">
//               <h2>800+</h2>
//               <span>Lives Impacted</span>
//             </div>
//           </div>
//         </section>

//         {/* ACTIONS */}
//         <section className="dashboard-actions-wrapper">

//           <div className="action-card" onClick={() => navigate("/donate")}>
//             <img src={donateIcon} alt="" />
//             <h3>Donate</h3>
//             <p>Offer financial or material help</p>
//           </div>

//           <div
//             className="action-card"
//             onClick={() => navigate("/donation-history")}
//           >
//             <img src={contributionIcon} alt="" />
//             <h3>Contributions</h3>
//             <p>View your previous contributions</p>
//           </div>

//           <div className="dashboard-impact-panel">
//             <h3>💛 Your Kindness Matters</h3>
//             <p>
//               Every contribution brings hope to someone in need.
//               Together, we are building a compassionate community.
//             </p>

//             <button onClick={() => navigate("/donate")}>
//               Donate Now
//             </button>

//             <div className="impact-quote">
//               “No one has ever become poor by giving.”
//               <span>– Anne Frank</span>
//             </div>
//           </div>

//         </section>
//       </main>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import donateIcon from "../assets/donate-icon.png";
import contributionIcon from "../assets/contributions.png";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    loadStats();
    loadSubscription();
  }, []);

  async function loadStats() {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "http://localhost:8080/dashboard/individual-stats",
      {
        headers: { Authorization: "Bearer " + token }
      }
    );
    const data = await res.json();
    setStats(data);
  }

  async function loadSubscription() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:8080/subscriptions/my",
        {
          headers: { Authorization: "Bearer " + token }
        }
      );

      if (!res.ok) throw new Error();
      setSubscription(await res.json());
    } catch {
      // FREE fallback
      setSubscription({ planCode: "FREE" });
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <main className="dashboard-main">

        {/* TOP SECTION */}
        <section className="dashboard-top">

          {/* WELCOME */}
          <div className="welcome-box welcome-split">
            <div className="welcome-text">
              <h1>{getGreeting()}</h1>
              <p>
                Your compassion is creating real impact.  
                Let’s continue changing lives together.
              </p>

              <button onClick={() => navigate("/donate")}>
                Make a Donation
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="stats-box">

            <div className="stat">
              <h2>{stats?.ngosConnected ?? "-"}</h2>
              <span>NGOs Connected</span>
            </div>

            <div className="stat">
              <h2>{stats?.totalDonations ?? "-"}</h2>
              <span>Donations Offered</span>
            </div>

            {/* ✅ SUBSCRIPTION CARD */}
            <div className="stat">
              <h2>{subscription?.planCode || "FREE"}</h2>
              <span>Current Plan</span>

              {subscription?.endDate && (
                <small style={{ display: "block", marginTop: "4px" }}>
                  Expires on{" "}
                  {new Date(subscription.endDate).toLocaleDateString()}
                </small>
              )}

              {subscription?.planCode === "FREE" && (
                <button
                  style={{ marginTop: "10px" }}
                  onClick={() => navigate("/individual/subscriptions")}
                >
                  Upgrade
                </button>
              )}
            </div>

          </div>
        </section>

        {/* ACTIONS */}
        <section className="dashboard-actions-wrapper">

          <div className="action-card" onClick={() => navigate("/donate")}>
            <img src={donateIcon} alt="" />
            <h3>Donate</h3>
            <p>Offer financial or material help</p>
          </div>

          <div
            className="action-card"
            onClick={() => navigate("/donation-history")}
          >
            <img src={contributionIcon} alt="" />
            <h3>Contributions</h3>
            <p>View your previous contributions</p>
          </div>

          <div className="dashboard-impact-panel">
            <h3>💛 Your Kindness Matters</h3>
            <p>
              Every contribution brings hope to someone in need.
              Together, we are building a compassionate community.
            </p>

            <button onClick={() => navigate("/donate")}>
              Donate Now
            </button>

            <div className="impact-quote">
              “No one has ever become poor by giving.”
              <span>– Anne Frank</span>
            </div>
          </div>

        </section>
      </main>
    </>
  );
}
