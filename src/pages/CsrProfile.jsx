import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./CsrProfile.css";

export default function CsrProfile() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/csr/profile", {
        headers: { Authorization: "Bearer " + token }
      });

      if (res.ok) {
        const data = await res.json();
        setForm(data || {});
      }
    } catch {
      // first time profile → ignore
    }
  }

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

      const res = await fetch(
        "http://localhost:8080/csr/profile/complete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify(form)
        }
      );

      if (!res.ok) throw new Error();

      setMessage({
        type: "success",
        text: "Profile submitted successfully. Awaiting moderator approval."
      });
    } catch {
      setMessage({
        type: "error",
        text: "Failed to submit CSR profile."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="csr-profile-page">

      <div className="with-sidebar">
        <div className="csr-container">

          <div className="csr-header">
            <h1>CSR Company Profile</h1>
            <p>
              Complete your company profile to start CSR activities on the
              platform.
            </p>
          </div>

          {message && (
            <div className={`csr-msg ${message.type}`}>
              {message.text}
            </div>
          )}

          <form className="csr-form" onSubmit={handleSubmit}>

            {/* COMPANY */}
            <h3>🏢 Company Details</h3>

            <input name="companyName" placeholder="Company Name"
              value={form.companyName || ""} onChange={handleChange} required />

            <input name="legalCompanyName" placeholder="Legal Company Name"
              value={form.legalCompanyName || ""} onChange={handleChange} />

            <input name="cinNumber" placeholder="CIN Number"
              value={form.cinNumber || ""} onChange={handleChange} />

            <input name="gstNumber" placeholder="GST Number"
              value={form.gstNumber || ""} onChange={handleChange} />

            <input name="panNumber" placeholder="PAN Number"
              value={form.panNumber || ""} onChange={handleChange} />

            {/* AUTH PERSON */}
            <h3>👤 Authorized Person</h3>

            <input name="authorizedPersonName" placeholder="Name"
              value={form.authorizedPersonName || ""} onChange={handleChange} />

            <input name="authorizedPersonDesignation" placeholder="Designation"
              value={form.authorizedPersonDesignation || ""} onChange={handleChange} />

            <input name="authorizedPersonEmail" placeholder="Email"
              value={form.authorizedPersonEmail || ""} onChange={handleChange} />

            <input name="authorizedPersonPhone" placeholder="Phone"
              value={form.authorizedPersonPhone || ""} onChange={handleChange} />

            {/* CONTACT */}
            <h3>📞 Contact</h3>

            <input name="officialEmail" placeholder="Official Email"
              value={form.officialEmail || ""} onChange={handleChange} />

            <input name="officialPhone" placeholder="Official Phone"
              value={form.officialPhone || ""} onChange={handleChange} />

            <input name="website" placeholder="Website"
              value={form.website || ""} onChange={handleChange} />

            {/* ADDRESS */}
            <h3>📍 Address</h3>

            <input name="address" placeholder="Address"
              value={form.address || ""} onChange={handleChange} />

            <div className="csr-row">
              <input name="city" placeholder="City"
                value={form.city || ""} onChange={handleChange} />
              <input name="state" placeholder="State"
                value={form.state || ""} onChange={handleChange} />
              <input name="pincode" placeholder="Pincode"
                value={form.pincode || ""} onChange={handleChange} />
            </div>

            {/* CSR */}
            <h3>🌱 CSR Details</h3>

            <input name="csrFocusAreas"
              placeholder="CSR Focus Areas (Education, Health, etc.)"
              value={form.csrFocusAreas || ""}
              onChange={handleChange}
            />

            <input name="annualCsrBudget"
              type="number"
              placeholder="Annual CSR Budget (₹)"
              value={form.annualCsrBudget || ""}
              onChange={handleChange}
            />

            <input name="csrPolicyUrl"
              placeholder="CSR Policy URL"
              value={form.csrPolicyUrl || ""}
              onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Profile"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
