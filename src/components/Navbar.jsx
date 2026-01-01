
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import profileIcon from "../assets/profile-icon.png";
import "../pages/navbar.css";

export default function Navbar() {
  const { user, loading, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  if (loading || !user) return null;

  const handleLogout = () => {
    logout();
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">Prerana Helpline</span>
      </div>

      <div className="navbar-right" style={{ position: "relative" }}>
        <div
          className="user-info"
          onClick={(e) => {
            e.stopPropagation(); // VERY IMPORTANT
            setOpen((prev) => !prev);
          }}
          style={{ cursor: "pointer" }}
        >
          <img src={profileIcon} alt="Profile" className="profile-img" />
          <span className="user-name">{user.fullName || user.name}</span>
        </div>

        {open && (
          <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
            <div
              className="dropdown-item"
              onClick={() => (window.location.href = "/profile")}
            >
              👤 Profile
            </div>

            <div
              className="dropdown-item logout"
              onClick={handleLogout}
            >
              🚪 Logout
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
