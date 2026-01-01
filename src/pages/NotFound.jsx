import { useNavigate } from "react-router-dom";
import "./errorPages.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="error-wrapper">
      <div className="error-card">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          The page you are looking for doesn’t exist
          or has been moved.
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
