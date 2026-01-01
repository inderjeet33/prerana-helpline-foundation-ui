import React from "react";
import "./campaign.css";
import { useNavigate } from "react-router-dom";

const CampaignCard = ({ item }) => {
  const navigate = useNavigate();
  console.log("in item id ",item.id); 
  return (
    <div className="campaign-card">
      <h3 className="campaign-card-title">{item.title}</h3>

      <p className="campaign-card-desc">
        {item.description.substring(0, 100)}...
      </p>

      <p className="campaign-card-goal">🎯 Goal: ₹{item.targetAmount}</p>

      <button
        className="campaign-card-btn"
        onClick={() => navigate(`/campaign/${item.id}`)}
      >
        View Details
      </button>
    </div>
  );
};

export default CampaignCard;
