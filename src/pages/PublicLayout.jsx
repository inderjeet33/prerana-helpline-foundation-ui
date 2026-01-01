import Navbar from "../components/PublicNavbar";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "70px" }}>
        {children}
      </div>
    </>
  );
}
