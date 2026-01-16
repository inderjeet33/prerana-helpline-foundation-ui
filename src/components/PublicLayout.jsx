import Footer from "../pages/Footer";
import "./PublicLayout.css";

export default function PublicLayout({ children }) {
  return (
    <div className="public-layout">
      <div className="public-content">
        {children}
      </div>
      <Footer />
    </div>
  );
}