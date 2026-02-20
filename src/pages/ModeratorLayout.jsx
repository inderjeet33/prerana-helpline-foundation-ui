
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import DonorOffers from "./DonorOffers";
import ModeratorCsrApprovals from "./ModeratorCsrApprovals";
import NgoList from "./NgoList";
import AssignmentHistory from "./AssignmentHistory";
import ModeratorDashboard from "./ModeratorDashboard";
import ModeratorCampaigns from "./ModeratorCampaigns";
import VolunteerOffers from "./VolunteerOffers";
import ModeratorHelpRequests from "./ModeratorHelpRequests";


import "./Moderator.css";

export default function ModeratorLayout() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");

  // ----------- PROTECT THE ROUTE -----------
  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/moderator-login");
      return;
    }

    if (user.role !== "MODERATOR") {
      navigate("/");
      return;
    }
  }, [user, loading, navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mod-layout">
      {/* =======================
          SIDEBAR
          ======================= */}
      <aside className="mod-sidebar">
        {/* Profile */}
        <div className="mod-profile">
          {/* <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            className="mod-avatar-img"
          /> */}
          <div className="mod-profile-info">
            <h3 className="mod-name">{user?.name}</h3>
            <p className="mod-role">Moderator</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mod-menu">
          <button
            className={page === "dashboard" ? "active" : ""}
            onClick={() => setPage("dashboard")}
          >
            📊 Dashboard
          </button>

          <button
            className={page === "offers" ? "active" : ""}
            onClick={() => setPage("offers")}
          >
            🎁 Donor Offers
          </button>

          <button
  className={page === "csr" ? "active" : ""}
  onClick={() => setPage("csr")}
>
  🏢 CSR Approvals
</button>


          <button
  className={page === "help-requests" ? "active" : ""}
  onClick={() => setPage("help-requests")}
>
  🆘 Help Requests
</button>


<button
  className={page === "volunteers" ? "active" : ""}
  onClick={() => setPage("volunteers")}
>
  🙋 Volunteer Offers
</button>

          <button
            className={page === "ngos" ? "active" : ""}
            onClick={() => setPage("ngos")}
          >
            🏢 NGO List
          </button>
          <button
  className={page === "campaigns" ? "active" : ""}
  onClick={() => setPage("campaigns")}
>
  📋 Campaign Approvals
</button>


          <button
            className={page === "history" ? "active" : ""}
            onClick={() => setPage("history")}
          >
            📜 Assignment History
          </button>

          {/* Logout */}
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/moderator-login";
            }}
          >
            ⤿ Logout
          </button>
        </nav>
      </aside>

      {/* =======================
          MAIN CONTENT
          ======================= */}
      <main className="mod-content-area">
{page === "dashboard" && (
  <ModeratorDashboard onNavigate={setPage} />
)}
        {page === "offers" && <DonorOffers />}
        {page =="csr" && <ModeratorCsrApprovals/>}
        {page === "ngos" && <NgoList />}
        {page === "history" && <AssignmentHistory />}
        {page === "campaigns" && <ModeratorCampaigns />}
        {page === "volunteers" && <VolunteerOffers />}
        {page === "help-requests" && <ModeratorHelpRequests />}



      </main>
    </div>
  );
}
