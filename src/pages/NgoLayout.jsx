import NgoNav from "./NgoNav";

export default function NGOLayout({ children }) {
  return (
    <div className="ngo-layout">
      <NgoNav />
      <div className="ngo-content">{children}</div>
    </div>
  );
}
