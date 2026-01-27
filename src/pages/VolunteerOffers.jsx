import { useEffect, useState } from "react";
import axios from "axios";
import "./Moderator.css";

export default function VolunteerOffers() {
  const [offers, setOffers] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [assignSelection, setAssignSelection] = useState({});
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    type: "",
  });

  const token = localStorage.getItem("token");

  /* ---------- LOAD DATA ---------- */
  const loadData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:8080/moderator/volunteer/offers",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, size, ...filters },
        }
      );

      setOffers(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);

      const resNgos = await axios.get(
        "http://localhost:8080/moderator/moderator/ngos",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { verified: true },
        }
      );

      setNgos(resNgos.data.content || []);
    } catch (e) {
      console.error(e);
      alert("Failed to load volunteer requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, filters]);

  /* ---------- ASSIGN ---------- */
  const assignOffer = async (offerId) => {
    const receiverId = assignSelection[offerId];
    if (!receiverId) return alert("Select NGO first");

    await axios.post(
      "http://localhost:8080/moderator/assign/volunteers",
      { volunteerRequestId: offerId, receiverId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    loadData();
  };

  /* ---------- UI ---------- */
  return (
    <div className="mod-table-wrapper">
      <div className="mod-header">
        <div>
          <h2>Volunteer Requests</h2>
          <p className="mod-sub">Assign volunteers to NGOs</p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <input
          placeholder="Search volunteer / skills"
          value={filters.search}
          onChange={(e) => {
            setPage(0);
            setFilters({ ...filters, search: e.target.value });
          }}
        />

        <select onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
          <option value="">All Types</option>
          <option value="TEACHING">Teaching</option>
          <option value="CLEANING">Cleaning</option>
          <option value="COOKING">Cooking</option>
          <option value="GARDENING">Gardening</option>
          <option value="EVENT_SUPPORT">Event Support</option>
          <option value="MEDICAL_HELP">Medical</option>
          <option value="OTHER">Other</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All Status</option>
          <option value="OPEN">OPEN</option>
          <option value="ASSIGNED">ASSIGNED</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <button
          className="btn secondary"
          onClick={() => {
            setPage(0);
            setFilters({ search: "", type: "", status: "" });
          }}
        >
          Reset
        </button>
      </div>

      {/* TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="mod-table">
          <thead>
            <tr>
              <th>Volunteer</th>
              <th>Type</th>
              <th>Skills</th>
              <th>Availability</th>
              <th>Location</th>
              <th>Assigned NGO</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {offers.map((o) => (
              <tr key={o.id}>
                <td>{o.user?.fullName}</td>
                <td>{o.volunteerType}</td>
                <td>{o.skills || "-"}</td>
                <td>{o.availability}</td>
                <td>{o.location || "-"}</td>
                <td>{o.receiverName || "Not Assigned"}</td>
                <td>{o.status}</td>

                <td>
                  {o.status === "OPEN" ? (
                    <>
                      <select
                        value={assignSelection[o.id] || ""}
                        onChange={(e) =>
                          setAssignSelection((p) => ({
                            ...p,
                            [o.id]: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select NGO</option>
                        {ngos.map((n) => (
                          <option key={n.user.id} value={n.user.id}>
                            {n.ngoName}
                          </option>
                        ))}
                      </select>

                      <button
                        className="assign-btn"
                        onClick={() => assignOffer(o.id)}
                      >
                        Assign
                      </button>
                    </>
                  ) : (
                    <span className="mod-no-action">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          ← Prev
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
