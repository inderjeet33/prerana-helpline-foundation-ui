import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./ModeratorNavbar.css";

export default function ModeratorNavbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="mod-nav">
      <div className="mod-nav-left" onClick={() => navigate("/moderator")}>
        <h2 className="mod-logo">Moderator Panel</h2>
      </div>

      <div className="mod-nav-links">
        <Link to="/moderator/offers" className="mod-link">Offers</Link>
        <Link to="/moderator/ngos" className="mod-link">NGOs</Link>
        <Link to="/moderator/history" className="mod-link">History</Link>
      </div>

      <div className="mod-nav-right">
        <span className="mod-user">
          {user?.name || "Moderator"}
        </span>

        <button className="mod-logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
