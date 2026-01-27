import React, { useEffect, useState, useRef } from "react";
import "../donate.css"; // reuse same styles
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import slide1 from "../assets/charityimage1.jpg";
import slide2 from "../assets/charityimage2.jpg";
import slide3 from "../assets/charityimage3.jpg";

const slides = [slide1, slide2, slide3];

export default function Volunteer() {

  const [form, setForm] = useState({
    volunteerType: "TEACHING",
    availability: "Weekends",
    skills: "",
    location: "",
    preferredContact: "Phone",
    reason: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const slideIndexRef = useRef(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  /* ---------- SLIDER ---------- */
  useEffect(() => {
    const t = setInterval(() => {
      slideIndexRef.current = (slideIndexRef.current + 1) % slides.length;
      setCurrentSlide(slideIndexRef.current);
    }, 4500);

    return () => clearInterval(t);
  }, []);

  /* ---------- FORM HANDLER ---------- */
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  /* ---------- SUBMIT ---------- */
  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/volunteer/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {})
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Volunteer request submitted successfully." });

        setForm({
          volunteerType: "TEACHING",
          availability: "Weekends",
          skills: "",
          location: "",
          preferredContact: "Phone",
          reason: ""
        });
      } else {
        setMessage({ type: "error", text: "Failed to submit volunteer request." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error." });
    } finally {
      setLoading(false);
    }
  }

  /* ---------- UI ---------- */
  return (
    <div className="donate-page">
      <Navbar />
      <Sidebar />

      <div className="with-sidebar">
        <div className="donate-outer">

          {/* LEFT IMAGE SLIDER */}
          <div className="donate-left">
            <div
              className="donate-slide"
              style={{ backgroundImage: `url(${slides[currentSlide]})` }}
            >
              <div className="donate-overlay" />
              <div className="donate-hero-text">
                <h1>Volunteer With Purpose</h1>
                <p>Your time can change lives.</p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="donate-right">
            <div className="donate-card">
              <h2 className="donate-title">Become a Volunteer</h2>

              {message && (
                <div className={`donate-msg ${message.type === "error" ? "err" : "ok"}`}>
                  {message.text}
                </div>
              )}

              <form className="donate-form" onSubmit={handleSubmit}>

                <label>
                  How would you like to volunteer?
                  <select name="volunteerType" value={form.volunteerType} onChange={handleChange}>
                    <option value="TEACHING">Teaching</option>
                    <option value="CLEANING">Cleaning</option>
                    <option value="COOKING">Cooking</option>
                    <option value="GARDENING">Gardening</option>
                    <option value="EVENT_SUPPORT">Event Support</option>
                    <option value="MEDICAL_HELP">Medical Help</option>
                    <option value="OTHER">Other</option>
                  </select>
                </label>

                <label>
                  Availability
                  <select name="availability" value={form.availability} onChange={handleChange}>
                    <option>Weekends</option>
                    <option>Weekdays</option>
                    <option>Flexible</option>
                  </select>
                </label>

                <label>
                  Skills (optional)
                  <input
                    name="skills"
                    value={form.skills}
                    onChange={handleChange}
                    placeholder="e.g. Teaching, First Aid, Cooking"
                  />
                </label>

                <label>
                  Preferred Location
                  <input name="location" value={form.location} onChange={handleChange} />
                </label>

                <label>
                  Preferred Contact
                  <select name="preferredContact" value={form.preferredContact} onChange={handleChange}>
                    <option>Phone</option>
                    <option>WhatsApp</option>
                    <option>Email</option>
                  </select>
                </label>

                <label>
                  Why do you want to volunteer?
                  <textarea name="reason" value={form.reason} onChange={handleChange} />
                </label>

                <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Volunteer Request"}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
