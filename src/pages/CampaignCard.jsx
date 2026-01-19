// import React from "react";
// import "./campaign.css";
// import { useNavigate } from "react-router-dom";

// const CampaignCard = ({ item }) => {
//   const navigate = useNavigate();

//   const raised = item.raisedAmount || 0;
//   const target = item.targetAmount || 1;
//   const percent = Math.min(100, Math.round((raised / target) * 100));

//   return (
//     <div
//       className="campaign-card"
//       onClick={() => navigate(`/campaign/${item.id}`)}
//       style={{ cursor: "pointer" }}
//     >
//       {/* Image */}
//       {item.imageUrl && (
//         <img
//           src={`http://localhost:8080${item.imageUrl}`}
//           alt={item.title}
//           className="campaign-card-image"
//         />
//       )}

//       <h3 className="campaign-card-title">{item.title}</h3>

//       <p className="campaign-card-desc">
//         {item.description?.substring(0, 90)}...
//       </p>

//       <p className="campaign-card-goal">
//         🎯 ₹{raised} raised of ₹{target}
//       </p>

//       {/* Progress */}
//       <div className="progress-bar">
//         <div
//           className="progress-bar-fill"
//           style={{ width: `${percent}%` }}
//         />
//       </div>

//       {/* Status + Percent */}
//       <div className="campaign-card-footer">
//         <span className={`badge status-${item.status?.toLowerCase() || "open"}`}>
//           {item.status || "OPEN"}
//         </span>

//         <span className="campaign-percent">
//           {percent}% funded
//         </span>
//       </div>

//       {/* Emotional line */}
//       <p className="campaign-emotion">
//         💙 Making a difference in {item.city || "your community"}
//       </p>

//       <button className="campaign-card-btn campaign-manage-btn">
//         View & Manage
//       </button>
//     </div>
//   );
// };

// export default CampaignCard;
import React from "react";
import "./campaign.css";
import { useNavigate } from "react-router-dom";

const CampaignCard = ({ item }) => {
  const navigate = useNavigate();

  const raised = item.raisedAmount || 0;
  const target = item.targetAmount || 1;
  const percent = Math.min(100, Math.round((raised / target) * 100));

  return (
    <div
      className="campaign-card"
      onClick={() => navigate(`/campaign/${item.id}`)}
    >
      {item.imageUrl && (
        <img
          src={`http://localhost:8080${item.imageUrl}`}
          alt={item.title}
          className="campaign-card-image"
        />
      )}

      <div className="campaign-card-content">
        <h3 className="campaign-card-title">{item.title}</h3>

        <p className="campaign-card-desc">
          {item.description?.substring(0, 90)}...
        </p>

        <p className="campaign-card-goal">
          🎯 ₹{raised} raised of ₹{target}
        </p>

        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="campaign-card-footer">
          <span className={`badge status-${item.status?.toLowerCase() || "open"}`}>
            {item.status || "OPEN"}
          </span>

          <span className="campaign-percent">{percent}% funded</span>
        </div>

        <p className="campaign-emotion">
          💙 Making a difference in {item.city || "your community"}
        </p>
      </div>

      <button className="campaign-card-btn campaign-manage-btn">
        View & Manage
      </button>
    </div>
  );
};

export default CampaignCard;
