import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./AppLayout.css";

export default function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="app-content">
        {children}
      </div>
    </>
  );
}
