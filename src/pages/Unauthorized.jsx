import { useNavigate } from "react-router-dom";
import "./errorPages.css";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="error-wrapper">
      <div className="error-card">
        <h1>403</h1>
        <h2>Access Denied</h2>
        <p>
          You don’t have permission to access this page.
          <br />
          Please check your account type or go back.
        </p>

        <div className="error-actions">
          <button onClick={() => navigate(-1)}>Go Back</button>
          <button className="primary" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
