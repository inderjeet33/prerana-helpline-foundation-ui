import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./SubscriptionPlans.css";

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState([]);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const token = localStorage.getItem("token");

    const [plansRes, subRes] = await Promise.all([
      fetch("http://localhost:8080/subscriptions/plans", {
        headers: { Authorization: "Bearer " + token }
      }),
      fetch("http://localhost:8080/subscriptions/my", {
        headers: { Authorization: "Bearer " + token }
      })
    ]);

    setPlans(await plansRes.json());
    setCurrent(await subRes.json());
  }

  async function upgrade(planCode) {
    if (!window.confirm("Proceed to upgrade plan? (Dummy payment)")) return;

    setLoading(true);
    const token = localStorage.getItem("token");


    await fetch(`http://localhost:8080/subscriptions/upgrade?planCode=${planCode}`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token }
    });

    alert("Plan upgraded successfully!");
    loadData();
    setLoading(false);
  }

  return (
    <div className="subscription-page">
      <Navbar />
      <Sidebar />

      <div className="with-sidebar">
        <div className="subscription-container">

          <h1>Choose Your Plan</h1>

          {current && (
            <div className="current-plan">
              Current Plan: <strong>{current.planCode}</strong>
            </div>
          )}

          <div className="plan-grid">
            {plans.map(p => (
              <div key={p.code} className={`plan-card ${p.code}`}>
                <h2>{p.code}</h2>
                <h3>₹{p.price}</h3>

                <ul>
                  {Object.entries(p.features || {}).map(([k, v]) => (
                    <li key={k}>
                      {k.replace(/_/g, " ")}: {v}
                    </li>
                  ))}
                </ul>

                <button
                  disabled={loading || current?.planCode === p.code}
                  onClick={() => upgrade(p.code)}
                >
                  {current?.planCode === p.code ? "Current Plan" : "Upgrade"}
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
