import "./awards.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Awards() {
  const awards = [
    {
      title: "First Donation",
      icon: "🌱",
      description: "Completed your first donation and made a real impact",
      date: "Jan 2025",
    },
    {
      title: "Top Contributor",
      icon: "🏆",
      description: "Recognized as one of the top donors this month",
      date: "Feb 2025",
    },
    {
      title: "₹10,000 Impacted",
      icon: "💛",
      description: "Helped raise over ₹10,000 for social causes",
      date: "Mar 2025",
    },
    {
      title: "Verified Supporter",
      icon: "✔️",
      description: "Profile verified as a trusted individual donor",
      date: "Mar 2025",
    },
  ];

  return (
    <>
    <Navbar/>
    <Sidebar/>
    <div className="page-wrapper">
      <div className="awards-page">
      <h2 className="awards-title">Your Awards & Recognition</h2>
      <p className="awards-subtitle">
        Celebrating your journey of kindness and impact
      </p>

      <div className="awards-grid">
        {awards.map((award, index) => (
          <div className="award-card" key={index}>
            <div className="award-icon">{award.icon}</div>
            <h3>{award.title}</h3>
            <p>{award.description}</p>
            <span className="award-date">{award.date}</span>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
}
