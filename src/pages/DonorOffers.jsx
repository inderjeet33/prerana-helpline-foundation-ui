
import { useEffect, useState } from "react";
import axios from "axios";
import "./Moderator.css";
import OfferDetailsDrawer from "./OfferDetailsDrawer";
import ModeratorDonationOfferDetailsDrawer from "./ModeratorDonationOfferDetailsDrawer";

export default function DonorOffers() {
  const [offers, setOffers] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [assignSelection, setAssignSelection] = useState({}); // selected NGO per row
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // loadData is extracted so we can call it after assignment
  async function loadData() {

    try {
      setLoading(true);
      const resOffers = await axios.get(
        "http://localhost:8080/moderator/moderator/offers",
        { // Configuration object (3rd argument)
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
      );

      console.log(resOffers);
      if (Array.isArray(resOffers.data.content)) {
        setOffers(resOffers.data.content);
      } else {
        setOffers([]);
      }

      const resNgos = await axios.get(
        "http://localhost:8080/moderator/moderator/ngos",
        { // Configuration object (3rd argument)
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params:{
          verified:true
        }
    }
      );

      if (Array.isArray(resNgos.data.content)) {
        setNgos(resNgos.data.content);
      } else {
        setNgos([]);
      }
    } catch (err) {
      console.error("Error fetching moderator data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const downloadModeratorExcel = async () => {
  try {
    setLoading(true);

    const response = await axios.get(
      "http://localhost:8080/exports/moderator/donations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Prerana-Moderator-DonatinoOffers.xlsx";
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (err) {
    console.error("Excel download failed", err);
    alert("Failed to download Excel");
  } finally {
    setLoading(false);
  }
};

  const openDetails = (offer) => {
    setSelectedOffer(offer);
    setDetailOpen(true);
  };

  const assignOffer = async (donationRequestId) => {
    const receiverId = assignSelection[donationRequestId];

    if (!receiverId) {
      alert("Please select an NGO before assigning.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/moderator/assign", {
        donationRequestId,
        receiverId,
      },
      { // Configuration object (3rd argument)
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    );

      // refresh list without full page reload
      await loadData();
      alert("Assigned Successfully!");
    } catch (err) {
      console.error("Failed to assign:", err);
      alert("Error assigning NGO.");
    }
  };

  return (
    <div className="mod-table-wrapper">
       {/* Header row */}
  <div className="mod-header">
  <div>
    <h2 style={{ margin: 0 }}>Donation Offers</h2>
    <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "14px" }}>
      Review donor offers and assign NGOs
    </p>
  </div>

  <button
    className="excel-btn"
    onClick={downloadModeratorExcel}
    disabled={loading}
  >
    ⬇ Export Excel
  </button>
</div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="mod-table">
          <thead>
            <tr>
              <th>🎁 Category</th>
              <th>Donor</th>
              <th>Details</th>
              <th>Type</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Assign</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {offers.map((o) => (
<tr
  key={o.id}
  className="clickable-row"
  onClick={() => openDetails(o)}
>
                <td>{o.donationCategory}</td>
                <td>{o.user?.fullName}</td>

                <td className="wrap-text">{o.reason}</td>

                <td>{o.type}</td>

                {/* Already assigned receiver name */}
                <td>
                  {o.receiverName ? (
                    <span className="assigned-pill">{o.receiverName}</span>
                  ) : (
                    <span className="unassigned">Not Assigned</span>
                  )}
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`status-badge status-${
                      (o.status || "none").toString().toLowerCase()
                    }`}
                  >
                    {o.status || "No Status"}
                  </span>
                </td>

                {/* Assign controls */}
                <td className="assign-controls">
                  <select
                    className="mod-select"
                    value={assignSelection[o.id] || ""}
                    onChange={(e) =>
                      setAssignSelection((prev) => ({
                        ...prev,
                        [o.id]: e.target.value,
                      }))
                    }
                    // prevent row click when interacting with select
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="">Select NGO</option>

                    {ngos.map((n) => {
                      // support responses where ngo object could be { id, ngoName, userDto } or { user:{id, fullName}, ngoName }
                      const userId = n.user?.id || n.userDto?.id || n.userId || n.userId;
                      const label =
                        n.ngoName || n.user?.fullName || n.userDto?.fullName || n.name;
                      return (
                        <option key={userId} value={userId}>
                          {label}
                        </option>
                      );
                    })}
                  </select>

                  <button
                    className="assign-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      assignOffer(o.id);
                    }}
                  >
                    Assign
                  </button>
                </td>
                <td
  className="view-cell"
  onClick={(e) => {
    e.stopPropagation();
    openDetails(o);
  }}
>
  <span className="view-link">
    View →
  </span>
</td>
<td className="chevron-cell">
  →
</td>


              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ModeratorDonationOfferDetailsDrawer
        open={detailOpen}
        data={selectedOffer}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}
