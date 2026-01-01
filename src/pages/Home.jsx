import { Link } from "react-router-dom";
import logo from "../assets/infiniteseva logo.png";
import "./home.css";

export default function Home() {
  return (
    <div className="home-page">
      <div className="hero-container">
        <img
          src={logo}
          alt="Logo"
          className="home-logo"
        />

<div className="floating-orb orb-1"></div>
<div className="floating-orb orb-2"></div>
<div className="floating-orb orb-3"></div>

        <div className="overlay"></div>

        <div className="hero-content">
          <span className="home-badge">🌱 Trusted Social Impact Platform</span>

          <h1 className="title">
            Prerana Helpline <br /> Foundation
          </h1>

          <p className="subtitle">
            Connecting compassion with real needs —  
            empowering lives through verified NGOs and transparent support.
          </p>

          <div className="button-group">
            <Link to="/donor-auth">
              <button className="btn primary">Donate Now</button>
            </Link>

            <Link to="/ngo-auth">
              <button className="btn secondary">NGO Login</button>
            </Link>
          </div>

          <div className="home-stats">
            <div>
              <strong>1000+</strong>
              <span>Lives Impacted</span>
            </div>
            <div>
              <strong>150+</strong>
              <span>Verified NGOs</span>
            </div>
            <div>
              <strong>₹50L+</strong>
              <span>Aid Facilitated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
