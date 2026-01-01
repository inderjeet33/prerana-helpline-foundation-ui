import { useEffect, useState } from "react";
import axios from "axios";
import "./Moderator.css";

export default function AssignmentHistory() {
  const [assignments, setAssignments] = useState([]);
  const [statusFilter, setStatusFilter] = useState(""); // <-- selected filter
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssignments();
  }, [statusFilter]); // <-- refresh when filter changes

  const downloadAssignmentHistoryExcel = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8080/exports/moderator/assignments",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to download assignment history excel");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Prerana-Assignment-History.xlsx";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    alert("Unable to download assignment history");
  }
};


  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const url =
        statusFilter.trim() === ""
          ? "http://localhost:8080/moderator/moderator/assignments/history"
          : `http://localhost:8080/moderator/moderator/assignments/history?status=${statusFilter}`;

      const res = await axios.get(url,{ // Configuration object (3rd argument)
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

      if (Array.isArray(res.data.content)) {
        setAssignments(res.data.content);
      }
    } catch (err) {
      console.error("Failed to fetch assignments:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mod-table-wrapper">

    <div className="mod-header">
      {/* STATUS FILTER DROPDOWN */}
      <div className="filter-container">
        <label>Status Filter: </label>
        <select
          className="mod-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="REJECTED_BY_RECEIVER">Rejected by Receiver</option>
          <option value="CANCELLED_BY_DONOR">Cancelled by Donor</option>
          <option value="EXPIRED">Expired</option>
          <option value="REASSIGNED">REASSIGNED</option>
        </select>
      </div>

       <button
      className="excel-btn"
      onClick={downloadAssignmentHistoryExcel}
    >
      ⬇ Download Excel
    </button>
    </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="mod-table">
          <thead>
            <tr>
              <th>Request</th>
              <th>Donor</th>
              <th>Receiver</th>
              <th>Status</th>
              <th>Assigned On</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((a) => (
              <tr key={a.id}>
                <td>{a.donationRequest.type || "---"}</td>
                <td>{a.donor.fullName}</td>
                <td>{a.receiver.fullName}</td>

                <td>
                  <span className={`status-badge status-${a.status.toLowerCase()}`}>
                    {a.status}
                  </span>
                </td>

                <td>{a.createdAt?.substring(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}
