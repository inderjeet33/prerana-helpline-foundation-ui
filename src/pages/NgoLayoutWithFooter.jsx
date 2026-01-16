import NgoNav from "./NgoNav";
import Footer from "../pages/Footer";
import "./NGOLayoutWithFooter.css";

export default function NGOLayoutWithFooter({ children }) {
  return (
    <div className="ngo-layout-wrapper">
      <NgoNav />
      <div className="ngo-content">
        {children}
      </div>
      <Footer />
    </div>
  );
}
