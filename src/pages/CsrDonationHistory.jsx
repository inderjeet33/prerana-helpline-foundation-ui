import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./CsrDonationHistory.css";

export default function CsrDonationHistory() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "http://localhost:8080/donations/my-offers",
      { headers: { Authorization: "Bearer " + token } }
    );
    const data = await res.json();
    setOffers(data || []);
    setLoading(false);
  }

  if (loading) return <div className="csr-loader">Loading…</div>;

  return (
    <>

      <div className="csr-history-page">
        <h1>CSR Donation History</h1>

        <table className="csr-history-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Type</th>
              <th>Amount / Items</th>
              <th>Status</th>
              <th>Assigned To</th>
            </tr>
          </thead>

          <tbody>
            {offers.map(o => (
              <tr key={o.id}>
                <td>{o.donationCategory}</td>
                <td>{o.helpType}</td>

                <td>
                  {o.amount
                    ? `₹${o.amount}`
                    : `${o.itemDetails}${o.quantity ? ` (${o.quantity})` : ""}`}
                </td>

                <td>
                  <span className={`csr-status ${o.status.toLowerCase()}`}>
                    {o.status}
                  </span>
                </td>

                <td>{o.receiverName || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
