
import React, { useEffect, useState, useRef } from "react";
import "../donate.css";
import Navbar from "../components/Navbar";
import slide1 from "../assets/charityimage1.jpg";
import slide2 from "../assets/charityimage2.jpg";
import slide3 from "../assets/charityimage3.jpg";
import Sidebar from "../components/Sidebar";

const slides = [slide1, slide2, slide3];


export default function Donate() {

  const [form, setForm] = useState({
    helpType: "FINANCIAL",
    amount: "",
    donationCategory: "HEALTH",
    timeLine: "Immediate",
    ageGroup: "Any",
    gender: "Any",
    location: "",
    preferredContact: "Phone",
    recurringHelp: false,
    reason: "",
    itemDetails: "",
    quantity: ""
  });

  const [blocker, setBlocker] = useState({
  open: false,
  message: ""
});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const slideIndexRef = useRef(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      slideIndexRef.current = (slideIndexRef.current + 1) % slides.length;
      setCurrentSlide(slideIndexRef.current);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("FORM STATE:", form);

    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/donations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
        body: JSON.stringify({
          helpType: form.helpType,
          donationCategory: form.donationCategory,
          amount: form.helpType === "FINANCIAL" ? Number(form.amount) : null,
          itemDetails: form.itemDetails,
          quantity: form.quantity ? Number(form.quantity) : null,   // ✅ NUMBER
          timeLine: form.timeLine,
          recurringHelp: Boolean(form.recurringHelp),
          reason: form.reason,
          ageGroup: form.ageGroup,
          gender: form.gender,
          location: form.location,
          preferredContact: form.preferredContact,
        }),
      });

      // if (res.ok) {
      //   setMessage({ type: "success", text: "Donation offer submitted successfully." });

      //   setForm({
      //     helpType: "FINANCIAL",
      //     amount: "",
      //     donationCategory: "HEALTH",
      //     timeLine: "Immediate",
      //     ageGroup: "Any",
      //     gender: "Any",
      //     location: "",
      //     preferredContact: "Phone",
      //     recurringHelp: false,
      //     reason: "",
      //     itemDetails: "",
      //     quantity: ""
      //   });

      // } else {
      //   const text = await res.text().catch(() => null);
      //   setMessage({ type: "error", text: `Failed: ${res.status} ${text || ""}` });
      // }
      console.log("till");
      if (res.ok) {
        console.log("okay responsee");
  setMessage({
    type: "success",
    text: "Donation offer submitted successfully."
  });

  setForm({
    helpType: "FINANCIAL",
    amount: "",
    donationCategory: "HEALTH",
    timeLine: "Immediate",
    ageGroup: "Any",
    gender: "Any",
    location: "",
    preferredContact: "Phone",
    recurringHelp: false,
    reason: "",
    itemDetails: "",
    quantity: ""
  });

} else if (res.status === 403) {
  console.log("here error");
  setBlocker({
    open: true,
    message: "Upgrade your plan to create more donation offers."
  });
} else {
  const text = await res.text().catch(() => null);
  setMessage({
    type: "error",
    text: text || "Unable to submit donation offer."
  });
}

    } catch (err) {
      console.log("error here here");
      console.error(err);
      setMessage({ type: "error", text: "Network or server error." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="donate-page">
      <Navbar />
      <Sidebar />
      <div className="with-sidebar">
        <div className="donate-outer">

          <div className="donate-left">
            <div
              className="donate-slide"
              style={{ backgroundImage: `url(${slides[currentSlide]})` }}
            >
              <div className="donate-overlay" />
              <div className="donate-hero-text">
                <h1>Make a real difference</h1>
                <p>Small acts of kindness create big change. Share what you can.</p>
              </div>
            </div>
          </div>

          <div className="donate-right">
            <div className="donate-card">
              <h2 className="donate-title">Offer Help</h2>

              {message && (
                <div className={`donate-msg ${message.type === "error" ? "err" : "ok"}`}>
                  {message.text}
                </div>
              )}

              <form className="donate-form" onSubmit={handleSubmit}>

                <label>
                  Who are you helping?
                  <select name="donationCategory" value={form.donationCategory} onChange={handleChange}>
                    <option value="HEALTH">Health</option>
                    <option value="ORPHANS">Orphans</option>
                    <option value="EDUCATION">Education</option>
                    <option value="OLD_AGE">Old Age Support</option>
                    <option value="FOOD_CLOTHING">Food & Clothing</option>
                    <option value="SHELTER">Shelter Support</option>
                    <option value="DISABLED">Disabled Support</option>
                    <option value="OTHER">Other</option>
                  </select>
                </label>

                <div className="row">
                  <label>
                    How would you like to help?
                    <select name="helpType" value={form.helpType} onChange={handleChange}>
                      <option value="FINANCIAL">Financial Support</option>
                      <option value="FOOD">Food Donation</option>
                      <option value="CLOTHES">Clothes Donation</option>
                      <option value="BOOKS">Books</option>
                      <option value="MEDICAL">Medical Supplies</option>
                      <option value="OTHER">Other Goods</option>
                    </select>
                  </label>

                  <label>
                    Preferred Timeline
                    <select name="timeLine" value={form.timeLine} onChange={handleChange}>
                      <option>Immediate</option>
                      <option>This Week</option>
                      <option>This Month</option>
                      <option>Flexible</option>
                    </select>
                  </label>
                </div>

                {form.helpType === "FINANCIAL" ? (
                  <label>
                    Amount (₹)
                    <input name="amount" type="number" value={form.amount} onChange={handleChange} required />
                  </label>
                ) : (
                  <>
                    <label>
                      Item Details
                      <input name="itemDetails" value={form.itemDetails} onChange={handleChange} required />
                    </label>

                    <label>
                      Quantity (optional)
                      <input
                        name="quantity"
                        type="number"     // ✅ NUMBER
                        min="1"
                        value={form.quantity}
                        onChange={handleChange}
                      />
                    </label>
                  </>
                )}

                <label>
                  Why do you want to help?
                  <textarea name="reason" value={form.reason} onChange={handleChange} />
                </label>

                <div className="row">
                  <label>
                    Age Group
                    <select name="ageGroup" value={form.ageGroup} onChange={handleChange}>
                      <option>Any</option>
                      <option>Kids</option>
                      <option>Teens</option>
                      <option>Adults</option>
                      <option>Elderly</option>
                    </select>
                  </label>

                  <label>
                    Gender
                    <select name="gender" value={form.gender} onChange={handleChange}>
                      <option>Any</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </label>
                </div>

                <label>
                  Preferred Location
                  <input name="location" value={form.location} onChange={handleChange} />
                </label>

                <div className="row">
                  <label>
                    Preferred Contact
                    <select name="preferredContact" value={form.preferredContact} onChange={handleChange}>
                      <option>Phone</option>
                      <option>WhatsApp</option>
                      <option>Email</option>
                    </select>
                  </label>

                  <label className="chklabel">
                    <input type="checkbox" name="recurringHelp" checked={form.recurringHelp} onChange={handleChange} />
                    I can provide recurring help
                  </label>
                </div>

                <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Offer"}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
      {blocker.open && (
  <div className="blocker-overlay">
    <div className="blocker-modal">
      <h2>Upgrade Required</h2>
      <p>{blocker.message}</p>

      <div className="blocker-actions">
        <button
          className="upgrade-btn"
          onClick={() => window.location.href = "/individual/subscriptions"}
        >
          View Plans
        </button>

        <button
          className="later-btn"
          onClick={() => setBlocker({ open: false, message: "" })}
        >
          Maybe Later
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
