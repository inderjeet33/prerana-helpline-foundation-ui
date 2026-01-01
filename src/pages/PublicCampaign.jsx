import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./publicCampaign.css";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function PublicCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {
    try {
      const res = await fetch("http://localhost:8080/campaigns/public");
      const data = await res.json();
      console.log("campaigns ",data);
      setCampaigns(data);
    } catch (e) {
      console.error("Failed to load campaigns", e);
    } finally {
      setLoading(false);
    }
  }

  const handleDonateClick = (campaignId) => {
    if (!user) {
      navigate("/login", {
        state: { redirectTo: `/campaigns/${campaignId}` }
      });
      return;
    }

    if (user.role !== "INDIVIDUAL") {
      alert("Only individuals can donate to campaigns.");
      return;
    }

    navigate(`/campaigns/${campaignId}`);
  };

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading campaigns...</h3>;
  }

  return (
    <>
    <Navbar/>
    <Sidebar/>
    <div className="public-campaign-container">
      <h1 className="public-heading">Active Campaigns</h1>

      <div className="public-campaign-grid">
        {campaigns.map((c) => {
          const progress =
            Math.min(
              100,
              ((c.collectedAmount || 0) / c.targetAmount) * 100
            );

          return (
            <div className="public-campaign-card" key={c.id}>
              <img
                src={`http://localhost:8080${c.imageUrl}`}
                alt={c.title}
                onClick={() => navigate(`/campaign/${c.id}`)}
                className="public-campaign-img"
              />

              <div className="public-campaign-body">
                <h3>{c.title}</h3>
                <p className="public-desc">{c.description}</p>

                <p className="public-goal">
                  🎯 ₹{c.collectedAmount || 0} raised of ₹{c.targetAmount}
                </p>

                <div className="public-progress-bar">
                  <div
                    className="public-progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                {/* <button
                  className="public-donate-btn"
                  onClick={() => handleDonateClick(c.id)}
                >
                  Donate
                </button> */}
                <button className="public-donate-btn"
  onClick={(e) => {
    e.stopPropagation();
    navigate(`/campaign/${campaign.id}`);
  }}
>
  Donate
</button>

              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}
