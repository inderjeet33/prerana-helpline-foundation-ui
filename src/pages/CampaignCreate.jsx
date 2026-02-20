// import React, { useState } from "react";
// import axios from "axios";
// import SubscriptionBlockerModal from "./SubscriptionBlockerModal";


// const CampaignCreate = () => {
//   const [blocker, setBlocker] = useState({ open: false, message: "" });
//   const [title, setTitle] = useState("");
//   const [goalAmount, setGoalAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [image, setImage] = useState(null);
//   const [message, setMessage] = useState("");

//   const createCampaign = async () => {
//     try {
//       const fd = new FormData();
//       fd.append("title", title);
//       fd.append("goalAmount", goalAmount);
//       fd.append("description", description);
//       fd.append("deadline", deadline);
//       if (image) fd.append("image", image);

//       const token = localStorage.getItem("token");

//       const res = await axios.post("/campaign/create", fd, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data"
//         }
//       });
//       console.log(res);
//       console.log("preinte")

//       if(res.ok){
//       setMessage("Campaign Created Successfully!");
//       }else  if (res.status === 403) {
//     console.log("here");
//     const text = await res.text(); // backend message
//     setBlocker({
//       open: true,
//       message: text || "Upgrade your plan to create more campaigns"
//     });
//     return;
//   }

//     } catch (err) {
//       console.log(err);
//       setMessage("Error creating campaign");
//     }
//   };

//   return (
//     <div className = "campain-create" style={{ padding: 20 }}>
//       <h2>Create Campaign</h2>

//       <input
//         type="text"
//         placeholder="Campaign Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="input-style"
//       /><br/>

//       <input
//         type="number"
//         placeholder="Goal Amount"
//         value={goalAmount}
//         onChange={(e) => setGoalAmount(e.target.value)}
//         className="input-style"
//       /><br/>

//       <textarea
//         placeholder="Campaign Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         className="input-style"
//       /><br/>

//       <input
//         type="date"
//         value={deadline}
//         onChange={(e) => setDeadline(e.target.value)}
//         className="input-style"
//       /><br/>

//       <input
//         type="file"
//         onChange={(e) => setImage(e.target.files[0])}
//         className="input-style"
//       /><br/>

//       <button onClick={createCampaign} className="primary-btn">
//         Create Campaign
//       </button>

//       {message && <p>{message}</p>}
//       <SubscriptionBlockerModal
//         open={blocker.open}
//         message={blocker.message}
//         onUpgrade={() => navigate("/my-plan")}
//         onClose={() => setBlocker({ open: false })}
//       />
//     </div>
//   );
// };

// export default CampaignCreate;
