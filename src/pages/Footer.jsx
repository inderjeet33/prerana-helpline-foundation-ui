import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">

        <div className="footer-col">
          <h4>Prerana</h4>
          <p className="footer-text">
            Connecting donors, NGOs, and communities to create real impact.
          </p>
        </div>

        <div className="footer-col">
          <h4>Platform</h4>
          <Link to="/about">About</Link>
          <Link to="/how-it-works">How it Works</Link>
        </div>

        <div className="footer-col">
          <h4>Users</h4>
          <Link to="/ngo-login">For NGOs</Link>
          <Link to="/donor-auth">For Individuals</Link>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms</Link>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Prerana Helpline Foundation. All rights reserved.
      </div>
    </footer>
  );
}
