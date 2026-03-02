import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
export default function IndividualLayout({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="with-sidebar">
        {children}
      </div>
    </>
  );
}