
import { useEffect, useState } from "react";
import axios from "axios";
import PopupModal from "./PopupModal";
import "./Moderator.css";

export default function NgoList() {
  const token = localStorage.getItem("token");

  const [ngos, setNgos] = useState([]);
  const [selectedNgo, setSelectedNgo] = useState(null);

  // FILTERS
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");
  const [verified, setVerified] = useState("");

  // PAGINATION
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // ================= FETCH =================
  const fetchNgos = async (pageNumber = 0) => {
    try {
      const res = await axios.get(
        "http://localhost:8080/moderator/moderator/ngos",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            city: city || null,
            state: state || null,
            category: category || null,
            verified: verified !== "" ? verified : null,
            page: pageNumber,
            size
          }
        }
      );

      setNgos(res.data.content);
      setPage(res.data.number);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to load NGOs", err);
    }
  };

  useEffect(() => {
    fetchNgos(0);
  }, []);

  // ================= VERIFY / REJECT =================
  const verifyNgo = async () => {
    await axios.put(
      `http://localhost:8080/moderator/moderator/ngos/${selectedNgo.id}/verify`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSelectedNgo(null);
    fetchNgos(page);
  };

  const rejectNgo = async () => {
    await axios.put(
      `http://localhost:8080/moderator/moderator/ngos/${selectedNgo.id}/reject`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSelectedNgo(null);
    fetchNgos(page);
  };

  return (
    <div className="mod-content-area">

      {/* ================= FILTER BAR ================= */}
      <div className="mod-table-wrapper" style={{ marginBottom: 20 }}>
        <div className="assign-controls">
          <input
            className="mod-select"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            className="mod-select"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />

          <input
            className="mod-select"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />


          <button className="assign-btn" onClick={() => fetchNgos(0)}>
            Apply Filters
          </button>

          <button
            className="assign-btn"
            style={{ background: "#64748b" }}
            onClick={() => {
              setCity("");
              setState("");
              setCategory("");
              setVerified("");
              fetchNgos(0);
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="mod-table-wrapper">
        <table className="mod-table">
          <thead>
            <tr>
              <th>🏢 NGO Name</th>
              <th>📍 Location</th>
              <th>📞 Contact</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {ngos.map((n) => (
              <tr
                key={n.id}
                className="clickable-row"
                onClick={() => setSelectedNgo(n)}
              >
                <td>{n.ngoName}</td>
                <td>{n.city}, {n.state}</td>
                <td>{n.phone}</td>
                <td>
                  <span
                    className={`status-badge ${
                      n.activationStatus === "VERIFIED"
                        ? "status-completed"
                        : "status-expired"
                    }`}
                  >
                    {n.activationStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ================= PAGINATION ================= */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
          <button
            className="assign-btn"
            disabled={page === 0}
            onClick={() => fetchNgos(page - 1)}
          >
            ⬅ Previous
          </button>

          <span style={{ fontSize: 14 }}>
            Page {page + 1} of {totalPages}
          </span>

          <button
            className="assign-btn"
            disabled={page + 1 >= totalPages}
            onClick={() => fetchNgos(page + 1)}
          >
            Next ➡
          </button>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <PopupModal
        open={!!selectedNgo}
        onClose={() => setSelectedNgo(null)}
        title="NGO Profile"
      >
        {selectedNgo && (
          <>
            <div className="ngo-details-grid">
              <div><span>Name</span>{selectedNgo.ngoName}</div>
              <div><span>City</span>{selectedNgo.city}</div>
              <div><span>State</span>{selectedNgo.state}</div>
              <div><span>Categories</span>{selectedNgo.categories?.join(", ")}</div>
              <div><span>Description</span>{selectedNgo.description}</div>
              <div><span>Status</span>{selectedNgo.activationStatus}</div>
            </div>

            {selectedNgo.activationStatus === "PENDING" && (
              <div className="ngo-action-bar">
                <button className="verify-btn" onClick={verifyNgo}>✅ Verify</button>
                <button className="reject-btn" onClick={rejectNgo}>❌ Reject</button>
              </div>
            )}
          </>
        )}
      </PopupModal>
    </div>
  );
}
