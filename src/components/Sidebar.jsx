import { useNavigate } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-menu">

        <div className="sidebar-item" onClick={() => navigate("/dashboard")}>
          🏠 <span>Dashboard</span>
        </div>

        <div className="sidebar-item" onClick={() => navigate("/donate")}>
          🤲 <span>Donate</span>
        </div>

        <div className="sidebar-item" onClick={() => navigate("/donation-history")}>
          📜 <span>Contributions</span>
        </div>

        {/* <div className="sidebar-item" onClick={() => navigate("/gallery")}>
          🖼️ <span>Gallery</span>
        </div>

        <div className="sidebar-item" onClick={() => navigate("/awards")}>
          🏆 <span>Awards</span>
        </div> */}

        <div className="sidebar-item" onClick={() => navigate("/campaigns")}>
          📢 <span>Campaigns</span>
        </div>
      </div>
    </div>
  );
}
