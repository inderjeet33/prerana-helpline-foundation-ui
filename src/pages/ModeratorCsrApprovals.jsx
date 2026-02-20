import { useEffect, useState } from "react";
import axios from "axios";
import "./Moderator.css";

export default function ModeratorCSRProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadProfiles();
  }, [page]);

  async function loadProfiles() {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8080/moderator/csr/profiles",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, size }
        }
      );

      console.log(res.data);
      setProfiles(res.data || []);
      setTotalPages(1);
    } catch (e) {
      alert("Failed to load CSR profiles");
    } finally {
      setLoading(false);
    }
  }

  const approve = async (id) => {
    if (!window.confirm("Approve this CSR profile?")) return;

    await axios.post(
      `http://localhost:8080/moderator/csr/${id}/approve`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setSelected(null);
    loadProfiles();
  };

  const reject = async (id) => {
    const reason = window.prompt("Enter rejection reason");
    if (!reason) return;

    await axios.post(
      `http://localhost:8080/moderator/csr/${id}/reject`,
      { reason },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setSelected(null);
    loadProfiles();
  };

  return (
    <div className="mod-table-wrapper">

      <div className="mod-header">
        <h2>CSR Company Approvals</h2>
        <p className="mod-sub">Review and verify CSR company profiles</p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="mod-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>City</th>
              <th>CSR Budget</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {profiles.map(p => (
              <tr key={p.id}>
                <td>{p.companyName}</td>
                <td>{p.city}</td>
                <td>₹{p.annualCsrBudget || "-"}</td>
                <td>
                  <span className={`status-pill ${p.activationStatus?.toLowerCase()}`}>
                    {p.activationStatus}
                  </span>
                </td>
                <td>
                  <button onClick={() => setSelected(p)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>
          ← Prev
        </button>
        <span>Page {page + 1} of {totalPages}</span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(p => p + 1)}
        >
          Next →
        </button>
      </div>

      {/* ===== CSR DETAIL MODAL ===== */}
      {selected && (
        <div className="mod-modal-overlay" onClick={() => setSelected(null)}>
          <div className="mod-modal" onClick={e => e.stopPropagation()}>

            <div className="mod-modal-header">
              <h2>CSR Profile Details</h2>
              <button onClick={() => setSelected(null)}>✖</button>
            </div>

            <div className="mod-modal-grid">
              <div><strong>Company Name:</strong> {selected.companyName}</div>
              <div><strong>Legal Name:</strong> {selected.legalCompanyName}</div>
              <div><strong>CIN:</strong> {selected.cinNumber}</div>
              <div><strong>GST:</strong> {selected.gstNumber}</div>
              <div><strong>PAN:</strong> {selected.panNumber}</div>

              <div><strong>Authorized Person:</strong> {selected.authorizedPersonName}</div>
              <div><strong>Designation:</strong> {selected.authorizedPersonDesignation}</div>
              <div><strong>Email:</strong> {selected.authorizedPersonEmail}</div>
              <div><strong>Phone:</strong> {selected.authorizedPersonPhone}</div>

              <div><strong>CSR Areas:</strong> {selected.csrFocusAreas}</div>
              <div><strong>Annual Budget:</strong> ₹{selected.annualCsrBudget}</div>

              <div><strong>Website:</strong> {selected.website}</div>
              <div><strong>Address:</strong> {selected.address}</div>
              <div><strong>City:</strong> {selected.city}</div>
              <div><strong>State:</strong> {selected.state}</div>
              <div><strong>Pincode:</strong> {selected.pincode}</div>
            </div>

            {selected.activationStatus === "PENDING" && (
              <div className="mod-modal-actions">
                <button className="approve-btn" onClick={() => approve(selected.id)}>
                  Approve
                </button>
                <button className="reject-btn" onClick={() => reject(selected.id)}>
                  Reject
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
