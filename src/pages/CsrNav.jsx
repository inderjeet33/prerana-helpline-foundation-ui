
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./ngoNav.css";

export default function CsrNav() {
  const { user, loading } = useContext(AuthContext);
  if (loading || !user) return null;

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/csr-login");
  };

  return (
    <header className="ngo-header">
      <div className="ngo-left">
        <h2 className="ngo-logo">Prerana</h2>

        <nav className="ngo-nav">
          <NavLink to="/csr-dashboard" className="ngo-link">Dashboard</NavLink>
          <NavLink to="/csr/profile" className="ngo-link">Profile</NavLink>
          <NavLink to="/csr-donations" className="ngo-link">Donations</NavLink>
{/* 
          <div className="ngo-dropdown">
            <span className="ngo-dropdown-title">Requests ▾</span>
            <div className="ngo-dropdown-content">
              <NavLink to="/campaign/create" className="ngo-dropdown-item">Raise Requests</NavLink>
              <NavLink to="/campaign/my-campaigns" className="ngo-dropdown-item">My Requests</NavLink>
            </div> */}
          {/* </div> */}
        </nav>
      </div>

      <div className="ngo-right">
        <div
          className={`ngo-user-section ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="ngo-username">{user?.name || "NGO User"}</span>
          <span className="ngo-chevron">▾</span>
        </div>

        {menuOpen && (
          <div className="ngo-user-menu">
            <NavLink to="/ngo/profile" className="ngo-user-menu-item">
              Profile
            </NavLink>

            <span className="ngo-user-menu-item logout" onClick={handleLogout}>
              Logout
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
