import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SubscriptionBlockerModal from "./SubscriptionBlockerModal";
import "./NeedHelp.css";

export default function NeedHelp() {
  const [form, setForm] = useState({
    helpType: "FINANCIAL",
    donationCategory: "HEALTH",
    amount: "",
    itemDetails: "",
    quantity: "",
    urgency: "Immediate",
    location: "",
    preferredContact: "Phone",
    reason: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [blocker, setBlocker] = useState({ open: false, message: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8080/help-requests/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: "Bearer " + token } : {})
    },
    body: JSON.stringify(form)
  });

  console.log("till here",res);
  if (res.ok) {
    setMessage({
      type: "success",
      text: "Your request has been submitted. We’ll work to connect you with support."
    });

    setForm({
      helpType: "FINANCIAL",
      donationCategory: "HEALTH",
      amount: "",
      itemDetails: "",
      quantity: "",
      urgency: "Immediate",
      location: "",
      preferredContact: "Phone",
      reason: ""
    });
    return;
  }

  // 🔥 HANDLE FORBIDDEN HERE
  if (res.status === 403) {
    console.log("here");
    const text = await res.text(); // backend message
    setBlocker({
      open: true,
      message: text || "Upgrade your plan to create more help requests"
    });
    return;
  }

  // other errors
  setMessage({ type: "error", text: "Unable to submit request." });

} catch (err) {
  // 🚨 only network / CORS / DNS errors come here
  console.error(err);
  setMessage({ type: "error", text: "Network error." });
} finally {
  setLoading(false);
}

    // try {
    //   const token = localStorage.getItem("token");

    //   const res = await fetch("http://localhost:8080/help-requests/create", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       ...(token ? { Authorization: "Bearer " + token } : {})
    //     },
    //     body: JSON.stringify(form)
    //   });

    //   if (res.ok) {
    //     setMessage({
    //       type: "success",
    //       text: "Your request has been submitted. We’ll work to connect you with support."
    //     });

    //     setForm({
    //       helpType: "FINANCIAL",
    //       donationCategory: "HEALTH",
    //       amount: "",
    //       itemDetails: "",
    //       quantity: "",
    //       urgency: "Immediate",
    //       location: "",
    //       preferredContact: "Phone",
    //       reason: ""
    //     });
    //   } else {
    //     setMessage({ type: "error", text: "Unable to submit request." });
    //   }
    // } catch(err) {
    //     console.log("here");
    //     console.log(err);   
    //     if(err.status == 403){
    //         setBlocker({
    //             open:true,
    //             message:"Upgrade your plan to create more help requests"
    //         });
    //     }
    //     else{
    //   setMessage({ type: "error", text: "Network error." });
    //     }
    // } finally {
    //   setLoading(false);
    // }
  }

  return (
    <div className="need-help-page">
      <Navbar />
      <Sidebar />

      <div className="with-sidebar">
        <div className="need-help-wrapper">

          {/* LEFT INFO PANEL */}
          <aside className="need-help-info">
            <div className="info-card">
              <h1>Request Help</h1>
              <p className="subtitle">
                Everyone needs support sometimes.  
                Share what you’re going through — we’ll try to help responsibly.
              </p>

              <ul className="info-points">
                <li>✔ Your request is reviewed carefully</li>
                <li>✔ NGOs and individuals may respond</li>
                <li>✔ You control what you share</li>
              </ul>

              <div className="info-note">
                <strong>Note:</strong> This platform connects you with help,
                but cannot guarantee immediate assistance.
              </div>
            </div>
          </aside>

          {/* RIGHT FORM PANEL */}
          <section className="need-help-form">

            <div className="form-card">
              <h2>Tell us what you need</h2>

              {message && (
                <div className={`form-msg ${message.type}`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* SECTION 1 */}
                <div className="form-section">
                  <h3>Type of help</h3>

                  <div className="grid-2">
                    <label>
                      Category
                      <select
                        name="donationCategory"
                        value={form.donationCategory}
                        onChange={handleChange}
                      >
                        <option value="HEALTH">Health</option>
                        <option value="EDUCATION">Education</option>
                        <option value="FOOD_CLOTHING">Food & Clothing</option>
                        <option value="SHELTER">Shelter</option>
                        <option value="DISABLED">Disability Support</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </label>

                    <label>
                      Support type
                      <select
                        name="helpType"
                        value={form.helpType}
                        onChange={handleChange}
                      >
                        <option value="FINANCIAL">Financial</option>
                        <option value="FOOD">Food</option>
                        <option value="CLOTHES">Clothes</option>
                        <option value="BOOKS">Books</option>
                        <option value="MEDICAL">Medical</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </label>
                  </div>
                </div>

                {/* SECTION 2 */}
                <div className="form-section">
                  <h3>Details</h3>

                  {form.helpType === "FINANCIAL" ? (
                    <label>
                      Approximate amount (₹)
                      <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                      />
                    </label>
                  ) : (
                    <>
                      <label>
                        Items/help needed
                        <input
                          name="itemDetails"
                          value={form.itemDetails}
                          onChange={handleChange}
                        />
                      </label>

                      <label>
                        Quantity (optional)
                        <input
                          type="number"
                          name="quantity"
                          value={form.quantity}
                          onChange={handleChange}
                        />
                      </label>
                    </>
                  )}

                  <label>
                    Urgency
                    <select
                      name="urgency"
                      value={form.urgency}
                      onChange={handleChange}
                    >
                      <option>Immediate</option>
                      <option>This Week</option>
                      <option>This Month</option>
                      <option>Not Urgent</option>
                    </select>
                  </label>
                </div>

                {/* SECTION 3 */}
                <div className="form-section">
                  <h3>Contact & context</h3>

                  <label>
                    Location
                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                    />
                  </label>

                  <label>
                    Preferred contact
                    <select
                      name="preferredContact"
                      value={form.preferredContact}
                      onChange={handleChange}
                    >
                      <option>Phone</option>
                      <option>WhatsApp</option>
                      <option>Email</option>
                    </select>
                  </label>

                  <label>
                    Brief explanation
                    <textarea
                      name="reason"
                      value={form.reason}
                      onChange={handleChange}
                      placeholder="Share only what you’re comfortable with"
                    />
                  </label>
                </div>

                <button className="primary-btn" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </div>

          </section>
        </div>
      </div>
      <SubscriptionBlockerModal
  open={blocker.open}
  message={blocker.message}
  onUpgrade={() => navigate("/individual/subscriptions")}
  onClose={() => setBlocker({ open: false })}
/>

    </div>
    
  );
}
