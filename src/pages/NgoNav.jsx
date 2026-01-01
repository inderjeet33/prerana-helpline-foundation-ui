// import { NavLink } from "react-router-dom";
// import "./ngoNav.css";

// export default function NgoNav() {
//   return (
//     <header className="ngo-nav-container">
//       <div className="ngo-nav-left">
//         <h2 className="ngo-logo">Prerana</h2>
        
//         <nav className="ngo-nav">
//           <NavLink to="/ngo-donations" className="ngo-nav-item">
//             Donations
//           </NavLink>

//           <NavLink to="/ngo/assigned-offers" className="ngo-nav-item">
//             Assigned Offers
//           </NavLink>

//           <div className="ngo-dropdown">
//             <span className="ngo-dropdown-title">Campaigns ▾</span>
//             <div className="ngo-dropdown-menu">
//               <NavLink to="/campaign/create" className="ngo-dropdown-item">
//                 Create Campaign
//               </NavLink>
//               <NavLink to="/campaign/my-campaigns" className="ngo-dropdown-item">
//                 My Campaigns
//               </NavLink>
//             </div>
//           </div>
//         </nav>
//       </div>

//       <div className="ngo-nav-right">
//         <span className="ngo-user-badge">NGO Panel</span>
//       </div>
//     </header>
//   );
// }
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./ngoNav.css";

export default function NgoNav() {
  const { user, loading } = useContext(AuthContext);
  
  if (loading || !user) return null;
  console.log("user in nav bar "+user);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("in logout method of ngo dashboard navbar");
    console.log("token "+localStorage.getItem("token"));
    localStorage.removeItem("token");
        navigate("/ngo-login");
  };

  return (
    <header className="ngo-header">
      <div className="ngo-left">
        <h2 className="ngo-logo">Prerana</h2>

        <nav className="ngo-nav">
          <NavLink to="/ngo-dashboard" className="ngo-link">
            Dashboard
          </NavLink>

          <NavLink to="/ngo-donations" className="ngo-link">
            Donations
          </NavLink>

          <div className="ngo-dropdown">
            <span className="ngo-dropdown-title">Requests ▾</span>
            <div className="ngo-dropdown-content">
              <NavLink to="/campaign/create" className="ngo-dropdown-item">
                Raise Requests
              </NavLink>
              <NavLink to="/campaign/my-campaigns" className="ngo-dropdown-item">
                My Requests
              </NavLink>
            </div>
          </div>
        </nav>
      </div>

      <div className="ngo-right">
        <div
          className="ngo-user-section"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="ngo-username">{user?.name || "NGO User"}</span>
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
