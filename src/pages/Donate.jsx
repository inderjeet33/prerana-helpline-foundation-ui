
import React, { useEffect, useState, useRef } from "react";
import "../donate.css";
import Navbar from "../components/Navbar";
import slide1 from "../assets/charityimage1.jpg";
import slide2 from "../assets/charityimage2.jpg";
import slide3 from "../assets/charityimage3.jpg";
import Sidebar from "../components/Sidebar";

const slides = [slide1, slide2, slide3];

export default function Donate() {
  // form state - field names intentionally match your backend DTO
  const [form, setForm] = useState({
    amount: "",
    donationCategory: "Health",
    timeLine: "Immediate",
    ageGroup: "Any",
    gender: "Any",
    location: "",
    type: "Financial Support",
    preferredContact: "Phone",
    recurringHelp: false,
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // slideshow control
  // const slides = [
  //   "../assets/slide1.jpg",
  //   "https://images.unsplash.com/photo-1526040652367-ac003a0475fe?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=6a9c9b8d3f3c6f7c6f1a6f9b8b6b7c2a",
  //   "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=5a3b3f5d4e6f1c7a3b2e4d5f6a7b8c9d"
  // ];
  const slideIndexRef = useRef(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      slideIndexRef.current = (slideIndexRef.current + 1) % slides.length;
      setCurrentSlide(slideIndexRef.current);
    }, 4500);
    return () => clearInterval(t);
  }, []); // eslint-disable-line

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("token"); // can be empty during testing

      const res = await fetch("http://localhost:8080/donations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
        body: JSON.stringify({
          amount: form.amount ? Number(form.amount) : null,
          donationCategory: form.donationCategory,
          timeLine: form.timeLine,
          recurringHelp: Boolean(form.recurringHelp),
          reason: form.reason,
          type: form.type,
          ageGroup: form.ageGroup,
          gender: form.gender,
          location: form.location,
          preferredContact: form.preferredContact,
        }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Donation offer submitted successfully." });
        setForm({
          amount: "",
          donationCategory: "Health",
          timeLine: "Immediate",
          ageGroup: "Any",
          gender: "Any",
          location: "",
          type: "Financial Support",
          preferredContact: "Phone",
          recurringHelp: false,
          reason: "",
        });
      } else {
        const text = await res.text().catch(() => null);
        setMessage({ type: "error", text: `Failed: ${res.status} ${text || ""}` });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Network or server error." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="donate-page">
      <Navbar />
      <Sidebar/>
      <div className = "with-sidebar">
      <div className="donate-outer">
        {/* LEFT: slideshow / emotional */}
        <div className="donate-left">
          <div
            className="donate-slide"
            style={{ backgroundImage: `url(${slides[currentSlide]})` }}
            aria-hidden="true"
          >
            <div className="donate-overlay" />
            <div className="donate-hero-text">
              <h1>Make a real difference</h1>
              <p>Small acts of kindness create big change. Share what you can.</p>
            </div>
          </div>

          <div className="donate-highlights">
            <div className="hl">
              <strong>🎯 Trusted reach</strong>
              <span>Verified NGOs &amp; local partners</span>
            </div>
            <div className="hl">
              <strong>❤️ Transparent</strong>
              <span>We share contact & follow-up details</span>
            </div>
            <div className="hl">
              <strong>⚡ Fast</strong>
              <span>Directly connect to beneficiaries</span>
            </div>
          </div>
        </div>

        {/* RIGHT: form */}
        <div className="donate-right">
          <div className="donate-card">
            <h2 className="donate-title">Offer Help</h2>

            {message && (
              <div className={`donate-msg ${message.type === "error" ? "err" : "ok"}`}>
                {message.text}
              </div>
            )}

            <form className="donate-form" onSubmit={handleSubmit}>

              <div className="row">
                <label>
                  Amount (₹)
                  <input
                    name="amount"
                    type="number"
                    placeholder="Example: 5000"
                    value={form.amount}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Category
                  <select name="donationCategory" value={form.donationCategory} onChange={handleChange}>
                    <option>Health</option>
                    <option>Orphans</option>
                    <option>Education</option>
                    <option>Old Age Support</option>
                    <option>Food &amp; Clothing</option>
                    <option>Shelter Support</option>
                    <option>Disabled Support</option>
                  </select>
                </label>
              </div>

              <div className="row">
                <label>
                  Type of Help
                  <select name="type" value={form.type} onChange={handleChange} disabled>
                    <option>Financial Support</option>
                    <option>Medical Assistance</option>
                    <option>Educational Help</option>
                    <option>Food Donation</option>
                    <option>Clothes Donation</option>
                    <option>Emergency Support</option>
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

              <label>
                Why do you want to help? (optional)
                <textarea
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  placeholder="Short note or message (helps moderators / NGOs reach out)"
                />
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
                Preferred Location (City / Area)
                <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Rohtak" />
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
                  <input
                    type="checkbox"
                    name="recurringHelp"
                    checked={form.recurringHelp}
                    onChange={handleChange}
                  />
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
    </div>
  );
}
