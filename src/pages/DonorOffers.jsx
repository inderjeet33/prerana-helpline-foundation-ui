
import { useEffect, useState } from "react";
import axios from "axios";
import "./Moderator.css";
import ModeratorDonationOfferDetailsDrawer from "./ModeratorDonationOfferDetailsDrawer";

export default function DonorOffers() {
  const [offers, setOffers] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [assignSelection, setAssignSelection] = useState({});
  const [loading, setLoading] = useState(false);

  /* ---------- PAGINATION ---------- */
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  /* ---------- FILTERS ---------- */
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    type: "",
    status: "",
  });

  const token = localStorage.getItem("token");

  /* ---------- LOAD DATA ---------- */
  const loadData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:8080/moderator/moderator/offers",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page,
            size,
            ...filters,
          },
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
      alert("Failed to load data");
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
      "http://localhost:8080/moderator/assign",
      { donationRequestId: offerId, receiverId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    loadData();
  };

  /* ---------- UI ---------- */
  return (
    <div className="mod-table-wrapper">
      <div className="mod-header">
        <div>
          <h2>Donation Offers</h2>
          <p className="mod-sub">Review and assign NGOs</p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <input
          placeholder="Search donor / reason"
          value={filters.search}
          onChange={(e) => {
            setPage(0);
            setFilters({ ...filters, search: e.target.value });
          }}
        />

        <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="">All Categories</option>
          <option value="HEALTH">HEALTH</option>
          <option value="EDUCATION">EDUCATION</option>
                    <option value="ORPHANS">Orphans</option>
                    <option value="OLD_AGE">Old Age Support</option>
                    <option value="FOOD_CLOTHING">Food &amp; Clothing</option>
                    <option value="SHELTER">Shelter Support</option>
                    <option value="Disabled">Disabled Support</option>
                    <option value="OTHER">Others</option>

        </select>

        <select onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
          <option value="">All Types</option>
          <option value="FINANCIAL">FINANCIAL</option>
                    <option value="FOOD">FOOD</option>
          <option value="CLOTHES">CLOTHES</option>
          <option value="BOOKS">BOOKS</option>
          <option value="MEDICAL">MEDICAL</option>

          <option value="OTHER">OTHER</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All Status</option>
          <option value="OPEN">OPEN</option>
          <option value="ASSIGNED">ASSIGNED</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="EXPIRED">EXPIRED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <button
          className="btn secondary"
          onClick={() => {
            setPage(0);
            setFilters({ search: "", category: "", type: "", status: "" });
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
              <th>Category</th>
              <th>Donor</th>
              <th>Reason</th>
              <th>Type</th>
              <th>Assigned</th>
              <th>Status</th>
              <th>Assign</th>
            </tr>
          </thead>

          <tbody>
            {offers.map((o) => (
              <tr key={o.id} onClick={() => setDetailOpen(true) || setSelectedOffer(o)}>
                <td>{o.donationCategory}</td>
                <td>{o.user?.fullName}</td>
                <td>{o.reason}</td>
                <td>{o.helpType}</td>
                <td>{o.receiverName || "Not Assigned"}</td>
                <td>{o.status}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <select
                    value={assignSelection[o.id] || ""}
                    onChange={(e) =>
                      setAssignSelection((p) => ({ ...p, [o.id]: e.target.value }))
                    }
                  >
                    <option value="">Select NGO</option>
                    {ngos.map((n) => (
                      <option key={n.user.id} value={n.user.id}>
                        {n.ngoName}
                      </option>
                    ))}
                  </select>
                  <button className="assign-btn" onClick={() => assignOffer(o.id)}>
                    Assign
                  </button>
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

      <ModeratorDonationOfferDetailsDrawer
        open={detailOpen}
        data={selectedOffer}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}
