// import "./SubscriptionBlockerModal.css";
import { useNavigate } from "react-router-dom";


// export default function SubscriptionBlockerModal({ open, message, onUpgrade, onClose }) {
//   if (!open) return null;
//   const navigate = useNavigate();

//   return (
//     <div className="sub-blocker-overlay">
//       <div className="sub-blocker-card">
//         <h2>🚫 Limit Reached</h2>

//         <p className="sub-blocker-msg">
//           {message || "You have reached the limit for your current plan."}
//         </p>

//         <div className="sub-blocker-actions">
//           <button className="upgrade-btn" onClick={() => navigate("/individual/subscriptions")}>
//             Upgrade Plan
//           </button>

//           <button className="later-btn" onClick={onClose}>
//             Maybe Later
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import "./SubscriptionBlockerModal.css";

export default function SubscriptionBlockerModal({
  open,
  message,
  onUpgrade,
  onClose
}) {
    const navigate = useNavigate();
  if (!open) return null;

  return (
    <div className="sub-blocker-overlay">
      <div className="sub-blocker-card">
        <h2>🚫 Limit Reached</h2>

        <p className="sub-blocker-msg">
          {message || "You have reached the limit for your current plan."}
        </p>

        <div className="sub-blocker-actions">
          <button className="upgrade-btn" onClick={onUpgrade}>
            Upgrade Plan
          </button>

          <button className="later-btn" onClick={onClose}>
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
