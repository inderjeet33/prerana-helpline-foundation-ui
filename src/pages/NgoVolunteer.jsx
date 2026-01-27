import { useEffect, useState } from "react";
import axios from "axios";
import "./ngoDashboard.css";
import "./ngoDonations.css";

export default function NgoVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [statusChanges, setStatusChanges] = useState({});

  const NGO_ALLOWED_TRANSITIONS = {
    ASSIGNED: ["IN_PROGRESS", "REJECTED_BY_RECEIVER"],
    IN_PROGRESS: ["COMPLETED", "REJECTED_BY_RECEIVER"],
    COMPLETED: [],
    REJECTED_BY_RECEIVER: []
  };

  const token = localStorage.getItem("token");

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    async function loadVolunteers() {
      try {
        const res = await axios.get(
          "http://localhost:8080/ngo/profile/assigned-volunteers",
          { headers: { Authorization: "Bearer " + token } }
        );

        const safeData = (res.data || []).map(v => ({
          ...v,
          assignmentStatus: v.assignmentStatus || "ASSIGNED"
        }));

        setVolunteers(safeData);
      } catch (err) {
        console.error("Failed fetching volunteer assignments", err);
      }
    }

    loadVolunteers();
  }, []);

  /* ---------------- STATUS CHANGE ---------------- */
  const handleStatusChange = (assignmentId, newStatus) => {
    setStatusChanges(prev => ({
      ...prev,
      [assignmentId]: newStatus
    }));
  };

  const updateStatus = async (assignmentId) => {
    const newStatus = statusChanges[assignmentId];
    if (!newStatus) return;

    try {
      await axios.post(
        `http://localhost:8080/ngo/profile/assigned-volunteers/${assignmentId}/update-status?newStatus=${newStatus}`,
        {},
        { headers: { Authorization: "Bearer " + token } }
      );

      setVolunteers(prev =>
        prev.map(v =>
          v.assignmentId === assignmentId
            ? { ...v, assignmentStatus: newStatus }
            : v
        )
      );

      setStatusChanges(prev => ({ ...prev, [assignmentId]: undefined }));
    } catch (err) {
      console.error("Failed to update volunteer status", err);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="ngo-table-container">
      <div className="ngo-table-header">
        <h2>Assigned Volunteers</h2>
      </div>

      <table className="ngo-table">
        <thead>
          <tr>
            <th>Volunteer Type</th>
            <th>Availability</th>
            <th>Skills</th>
            <th>Volunteer</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {volunteers.map(v => {
            const status = v.assignmentStatus;
            const allowed = NGO_ALLOWED_TRANSITIONS[status] || [];

            return (
              <tr key={v.assignmentId}>
                <td>{v.volunteerType}</td>
                <td>{v.availability}</td>
                <td>{v.skills || "—"}</td>
                <td>{v.userName}</td>

                <td>
                  <span className={`ngo-status status-${status.toLowerCase()}`}>
                    {status.replace(/_/g, " ")}
                  </span>
                </td>

                <td>
                  <button
                    className="ngo-detail-btn"
                    onClick={() => setSelected(v)}
                  >
                    View
                  </button>

                  <select
                    className="ngo-select"
                    value={statusChanges[v.assignmentId] || status}
                    onChange={(e) =>
                      handleStatusChange(v.assignmentId, e.target.value)
                    }
                    disabled={allowed.length === 0}
                  >
                    <option value={status}>
                      {status.replace(/_/g, " ")}
                    </option>

                    {allowed.map(s => (
                      <option key={s} value={s}>
                        {s.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>

                  <button
                    className="ngo-update-btn"
                    onClick={() => updateStatus(v.assignmentId)}
                    disabled={
                      !statusChanges[v.assignmentId] ||
                      statusChanges[v.assignmentId] === status
                    }
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* DRAWER */}
      {selected && (
        <div className="ngo-drawer-overlay" onClick={() => setSelected(null)}>
          <div className="ngo-drawer" onClick={(e) => e.stopPropagation()}>
            <h2>Volunteer Details</h2>

            <p><strong>Volunteer:</strong> {selected.userName}</p>
            <p><strong>Email:</strong> {selected.userEmail}</p>
            <p><strong>Mobile:</strong> {selected.userMobile}</p>
            <p><strong>Type:</strong> {selected.volunteerType}</p>
            <p><strong>Availability:</strong> {selected.availability}</p>
            <p><strong>Skills:</strong> {selected.skills || "N/A"}</p>
            <p><strong>Location:</strong> {selected.location}</p>
            <p><strong>Preferred Contact:</strong> {selected.preferredContact}</p>
            <p><strong>Reason:</strong> {selected.reason || "—"}</p>

            <button
              className="ngo-close-btn"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
