
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./dashboard.css";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import donateIcon from "../assets/donate-icon.png";
// import contributionIcon from "../assets/contributions.png";
// import galleryIcon from "../assets/gallery-icon.png";
// import awardsIcon from "../assets/awards-icon.png";
// import impactHero from "../assets/impact-hero.jpg";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   const [stats, setStats] = useState(null);

// useEffect(() => {
//   loadStats();
// }, []);

// async function loadStats() {
//   const token = localStorage.getItem("token");
//   const res = await fetch(
//     "http://localhost:8080/dashboard/individual-stats",
//     {
//       headers: { Authorization: "Bearer " + token }
//     }
//   );
//   const stats = await res.json();
//   console.log(stats);
//   setStats(stats);
// }

//   const getGreeting = () => {
//   const hour = new Date().getHours();
//   if (hour < 12) return "Good Morning ☀️";
//   if (hour < 18) return "Good Afternoon 🌤️";
//   return "Good Evening 🌙";
// };

//   return (
//     <>
//       <Navbar />
//       <Sidebar />

//       <main className="dashboard-main">

//         {/* TOP SECTION */}
//         <section className="dashboard-top">
// <div className="welcome-box welcome-with-image">
//             <h1>{getGreeting()}</h1>
//             <p>
//               Your compassion is creating real impact.  
//               Let’s continue changing lives together.
//             </p>

//             <button onClick={() => navigate("/donate")}>
//               Make a Donation
//             </button>
//           </div>
//           <div className="welcome-image">
//   <img src={impactHero} alt="Community impact" />
// </div>

//           <div className="stats-box">
//             <div className="stat">
//              <h2>{stats?.ngosConnected ?? "-"}</h2>
//               <span>NGOs Connected</span>
//             </div>
//             <div className="stat">
//              <h2>{stats?.totalDonations ?? "-"}</h2>
//               <span>Donations Offered</span>
//             </div>
//             <div className="stat">
//               <h2>800+</h2>
//               <span>Lives Impacted</span>
//             </div>
//           </div>
//         </section>

//         {/* ACTION CARDS */}
//         <section className="dashboard-actions-wrapper">
//           <div className="action-card" onClick={() => navigate("/donate")}>
//             <img src={donateIcon} alt="" />
//             <h3>Donate</h3>
//             <p>Offer financial or material help</p>
//           </div>

//           <div className="action-card" onClick={() => navigate("/donation-history")}>
//             <img src={contributionIcon} alt="" />
//             <h3>Contributions</h3>
//             <p>View your previous contributions</p>
//           </div>

// <div className="dashboard-impact-panel">
//   <h3>💛 Your Kindness Matters</h3>
//   <p>
//     Every contribution brings hope to someone in need.
//     Together, we are building a compassionate community.
//   </p>

//   <button onClick={() => navigate("/donate")}>
//     Donate Now
//   </button>

//   <div className="impact-quote">
//     “No one has ever become poor by giving.”
//     <span>– Anne Frank</span>
//   </div>
// </div>
//           {/* <div className="action-card" onClick={() => navigate("/gallery")}>
//             <img src={galleryIcon} alt="" />
//             <h3>Gallery</h3>
//             <p>See impact stories & photos</p>
//           </div>

//           <div className="action-card" onClick={() => navigate("/awards")}>
//             <img src={awardsIcon} alt="" />
//             <h3>Awards</h3>
//             <p>Recognitions & milestones</p>
//           </div> */}

          
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
import impactHero from "../assets/impact-hero.jpg";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "http://localhost:8080/dashboard/individual-stats",
      {
        headers: { Authorization: "Bearer " + token }
      }
    );
    const stats = await res.json();
    console.log(stats);
    setStats(stats);
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

            <div className="welcome-visual">
              <img src={impactHero} alt="Community impact" />
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
            <div className="stat">
              <h2>800+</h2>
              <span>Lives Impacted</span>
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
