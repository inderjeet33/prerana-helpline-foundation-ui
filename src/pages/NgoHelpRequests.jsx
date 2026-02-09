import { useEffect, useState } from "react";
import axios from "axios";
import "./ngoHelpRequests.css";

export default function NgoHelpRequests() {
  const [requests, setRequests] = useState([]);
  const [statusChanges, setStatusChanges] = useState({});
  const [selected, setSelected] = useState(null);

  const token = localStorage.getItem("token");

  const STATUS_TRANSITIONS = {
    ASSIGNED: ["IN_PROGRESS", "CANCELLED_BY_DONOR"],
    IN_PROGRESS: ["COMPLETED"],
    COMPLETED: [],
    CANCELLED_BY_DONOR: []
  };

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const res = await axios.get(
      "http://localhost:8080/ngo/profile/assigned-help-requests",
      { headers: { Authorization: "Bearer " + token } }
    );
    setRequests(res.data || []);
  }

  const updateStatus = async (assignmentId) => {
    const newStatus = statusChanges[assignmentId];
    if (!newStatus) return;

    await axios.post(
      `http://localhost:8080/ngo/profile/assigned-help-requests/${assignmentId}/update-status`,
      {},
      {
        params: { newStatus },
        headers: { Authorization: "Bearer " + token }
      }
    );

    setRequests(prev =>
      prev.map(r =>
        r.assignmentId === assignmentId
          ? { ...r, assignmentStatus: newStatus }
          : r
      )
    );
  };

  return (
    <div className="ngo-table-container">
      <div className="ngo-table-header">
        <h2>Assigned Help Requests</h2>
        <p className="sub">People you’re currently helping</p>
      </div>

      <table className="ngo-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Help Type</th>
            <th>Urgency</th>
            <th>Requester</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map(r => {
            const allowed = STATUS_TRANSITIONS[r.assignmentStatus] || [];

            return (
              <tr key={r.assignmentId}>
                <td>{r.donationCategory}</td>
                <td>{r.helpType}</td>
                <td>
                  <span className={`urgency ${r.urgency?.toLowerCase()}`}>
                    {r.urgency}
                  </span>
                </td>
                <td>
                  {r.requesterName}
                  <div className="muted">{r.requesterMobile}</div>
                </td>

                <td>
                  <span className={`ngo-status status-${r.assignmentStatus.toLowerCase()}`}>
                    {r.assignmentStatus.replace(/_/g, " ")}
                  </span>
                </td>

                <td>
                  <button
                    className="ngo-detail-btn"
                    onClick={() => setSelected(r)}
                  >
                    View
                  </button>

                  <select
                    value={statusChanges[r.assignmentId] || r.assignmentStatus}
                    onChange={(e) =>
                      setStatusChanges(p => ({
                        ...p,
                        [r.assignmentId]: e.target.value
                      }))
                    }
                    disabled={allowed.length === 0}
                  >
                    <option value={r.assignmentStatus}>
                      {r.assignmentStatus.replace(/_/g, " ")}
                    </option>

                    {allowed.map(s => (
                      <option key={s} value={s}>
                        {s.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>

                  <button
                    className="ngo-update-btn"
                    disabled={
                      !statusChanges[r.assignmentId] ||
                      statusChanges[r.assignmentId] === r.assignmentStatus
                    }
                    onClick={() => updateStatus(r.assignmentId)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* DETAILS DRAWER */}
      {selected && (
        <div className="ngo-drawer-overlay" onClick={() => setSelected(null)}>
          <div className="ngo-drawer" onClick={e => e.stopPropagation()}>
            <h3>Help Request Details</h3>

            <p><strong>Reason:</strong> {selected.reason}</p>
            <p><strong>Location:</strong> {selected.location}</p>
            <p><strong>Preferred Contact:</strong> {selected.preferredContact}</p>

            {selected.amount && (
              <p><strong>Amount:</strong> ₹{selected.amount}</p>
            )}

            {selected.itemDetails && (
              <p>
                <strong>Items:</strong> {selected.itemDetails}
                {selected.quantity && ` (Qty: ${selected.quantity})`}
              </p>
            )}

            <button className="ngo-close-btn" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
