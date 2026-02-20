import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./CsrDonate.css";

export default function CsrDonate() {
  const [form, setForm] = useState({
    helpType: "FINANCIAL",
    donationCategory: "EDUCATION",
    amount: "",
    itemDetails: "",
    quantity: "",
    location: "",
    preferredContact: "Email",
    reason: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/donations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          ...form,
          amount:
            form.helpType === "FINANCIAL"
              ? Number(form.amount)
              : null,
          quantity:
            form.quantity ? Number(form.quantity) : null
        })
      });

      if (!res.ok) throw new Error();

      setMessage("Donation offer submitted successfully.");

      setForm({
        helpType: "FINANCIAL",
        donationCategory: "EDUCATION",
        amount: "",
        itemDetails: "",
        quantity: "",
        location: "",
        preferredContact: "Email",
        reason: ""
      });

    } catch {
      setMessage("Failed to submit donation.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>

      <div className="csr-donate-page">
        <div className="csr-donate-card">

          <h1>CSR Donation Offer</h1>
          <p className="csr-sub">
            Submit a donation offer as part of your corporate responsibility
          </p>

          {message && <div className="csr-msg">{message}</div>}

          <form onSubmit={submit}>

            <label>
              Donation Category
              <select
                name="donationCategory"
                value={form.donationCategory}
                onChange={handleChange}
              >
                <option>EDUCATION</option>
                <option>HEALTH</option>
                <option>FOOD_CLOTHING</option>
                <option>SHELTER</option>
                <option>DISABLED</option>
                <option>OTHER</option>
              </select>
            </label>

            <label>
              Help Type
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

            {form.helpType === "FINANCIAL" ? (
              <label>
                Amount (₹)
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  required
                />
              </label>
            ) : (
              <>
                <label>
                  Item Details
                  <input
                    name="itemDetails"
                    value={form.itemDetails}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Quantity
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
              Location
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
              />
            </label>

            <label>
              Preferred Contact
              <select
                name="preferredContact"
                value={form.preferredContact}
                onChange={handleChange}
              >
                <option>Email</option>
                <option>Phone</option>
                <option>WhatsApp</option>
              </select>
            </label>

            <label>
              Purpose / Notes
              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? "Submitting…" : "Submit Donation"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}
