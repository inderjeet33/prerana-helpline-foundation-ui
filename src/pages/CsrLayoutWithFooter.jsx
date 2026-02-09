import NgoNav from "./NgoNav";
import CsrNav from "./CsrNav";
import Footer from "../pages/Footer";
import "./NGOLayoutWithFooter.css";

export default function CSRLayoutWithFooter({ children }) {
  return (
    <div className="ngo-layout-wrapper">
      <CsrNav />
      <div className="ngo-content">
        {children}
      </div>
      <Footer />
    </div>
  );
}
