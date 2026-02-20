import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./SubscriptionPlans.css";

export default function NgoSubscriptionPlans() {
  const [plans, setPlans] = useState([]);
  const [current, setCurrent] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const [p, c] = await Promise.all([
      fetch("http://localhost:8080/subscriptions/plans", {
        headers: { Authorization: "Bearer " + token }
      }),
      fetch("http://localhost:8080/subscriptions/my", {
        headers: { Authorization: "Bearer " + token }
      })
    ]);


    setPlans(await p.json());
    setCurrent(await c.json());
  }

  async function upgrade(code) {
    if (!window.confirm("Proceed with upgrade? (Dummy payment)")) return;

    await fetch(
      `http://localhost:8080/subscriptions/upgrade?planCode=${code}`,
      {
        method: "POST",
        headers: { Authorization: "Bearer " + token }
      }
    );

    alert("Plan upgraded successfully");
    load();
  }

  return (
    <div className="subscription-page">
      <div className="with-sidebar">
        <div className="subscription-container">

          <h1>NGO Subscription Plans</h1>

          <div className="current-plan">
            Current Plan: <strong>{current?.planCode}</strong>
          </div>

          <div className="plan-grid">
            {plans.map(p => (
              <div key={p.code} className="plan-card">
                <h2>{p.code}</h2>
                <h3>₹{p.price}</h3>

                <ul>
                  {Object.entries(p.features || {}).map(([k, v]) => (
                    <li key={k}>{k.replace(/_/g, " ")}: {v}</li>
                  ))}
                </ul>

                <button
                  disabled={current?.planCode === p.code}
                  onClick={() => upgrade(p.code)}
                >
                  {current?.planCode === p.code ? "Current" : "Upgrade"}
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
