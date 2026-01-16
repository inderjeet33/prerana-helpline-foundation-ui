
import { useEffect, useState } from "react";
import axios from "axios";
import PopupModal from "./PopupModal";

import "./Moderator.css";

export default function NgoList() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
const [previewImageId, setPreviewImageId] = useState(null);

const [imageRejectReason, setImageRejectReason] = useState("");
const [selectedImageId, setSelectedImageId] = useState(null);


  const token = localStorage.getItem("token");

  const [ngos, setNgos] = useState([]);
  const [selectedNgo, setSelectedNgo] = useState(null);

  // FILTERS
  const [city, setCity] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  const [state, setState] = useState("");
  const [category, setCategory] = useState("");
  const [verified, setVerified] = useState("");
  const [loading, setLoading] = useState(false);

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
  if (!selectedNgo) return;
    console.log("selected ngo is ",selectedNgo.user.id);

  const fetchGallery = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/moderator/gallery/pending/${selectedNgo.user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("response is ",res);
      setGalleryImages(res.data);
    } catch (err) {
      console.error("Failed to load gallery images", err);
    }
  };

  fetchGallery();
}, [selectedNgo]);

  useEffect(() => {
    fetchNgos(0);
  }, []);

  const approveImage = async (imageId) => {
  await axios.post(
    `http://localhost:8080/moderator/gallery/${imageId}/approve`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  setGalleryImages(prev => prev.filter(img => img.id !== imageId));
};

const rejectImage = async (imageId) => {
  await axios.post(
    `http://localhost:8080/moderator/gallery/${imageId}/reject`,
    { reason: imageRejectReason },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  setImageRejectReason("");
  setSelectedImageId(null);
  setGalleryImages(prev => prev.filter(img => img.id !== imageId));
};

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

  // const rejectNgo = async () => {
  //   await axios.put(
  //     `http://localhost:8080/moderator/moderator/ngos/${selectedNgo.id}/reject`,
  //     {},
  //     { headers: { Authorization: `Bearer ${token}` } }
  //   );
  //   setSelectedNgo(null);
  //   fetchNgos(page);
  // };

  const rejectNgo = async () => {
  await axios.put(
    `http://localhost:8080/moderator/moderator/ngos/${selectedNgo.id}/reject`,
    { reason: rejectReason },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  setRejectReason("");
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
        title="NGO Verification Details"
      >
        {selectedNgo && (
          <>
            <h4 className="section-title">🏢 NGO Information</h4>
            <div className="ngo-details-grid">
              <div><span>Name</span>{selectedNgo.ngoName}</div>
              <div><span>Email</span>{selectedNgo.email}</div>
              <div><span>Phone</span>{selectedNgo.phone}</div>
              <div><span>Status</span>{selectedNgo.activationStatus}</div>
            </div>

            <h4 className="section-title">📍 Address</h4>
            <div className="ngo-details-grid">
              <div><span>Address</span>{selectedNgo.address}</div>
              <div><span>City</span>{selectedNgo.city}</div>
              <div><span>District</span>{selectedNgo.district}</div>
              <div><span>State</span>{selectedNgo.state}</div>
              <div><span>Pincode</span>{selectedNgo.pincode}</div>
            </div>

            <h4 className="section-title">🏦 Bank Details</h4>
            <div className="ngo-details-grid">
              <div><span>Account Holder</span>{selectedNgo.accountHolderName}</div>
              <div><span>Bank</span>{selectedNgo.bankName}</div>
              <div><span>Account No</span>{selectedNgo.bankAccount}</div>
              <div><span>IFSC</span>{selectedNgo.ifsc}</div>
            </div>

            <h4 className="section-title">📄 Legal</h4>
            <div className="ngo-details-grid">
              <div><span>Registration No</span>{selectedNgo.registrationNumber}</div>
            </div>

           <h4 className="section-title">📸 Impact Gallery (Pending Approval)</h4>

<div className="impact-gallery">
  {galleryImages.length ? (
    galleryImages.map((img) => (
<div className="gallery-card" key={img.id}>
        {/* <img                 src={`http://localhost:8080${img.imageUrl}`}
 alt="impact" /> */}
 {/* <img
  src={`http://localhost:8080${img.imageUrl}`}
  alt="impact"
  onClick={() => setPreviewImage(`http://localhost:8080${img.imageUrl}`)}
  style={{ cursor: "zoom-in" }}
/> */}
<img
  src={`http://localhost:8080${img.imageUrl}`}
  alt="impact"
  onClick={() => {
    setPreviewImage(`http://localhost:8080${img.imageUrl}`);
    setPreviewImageId(img.id);
    setImageRejectReason("");
  }}
  style={{ cursor: "zoom-in" }}
/>


        <p className="wrap-text">{img.caption || "No caption"}</p>

        {selectedImageId === img.id && (
          <textarea
            placeholder="Reason for rejection"
            value={imageRejectReason}
            onChange={(e) => setImageRejectReason(e.target.value)}
            style={{
              width: "100%",
              minHeight: 60,
              marginTop: 8,
              padding: 8,
              borderRadius: 8,
              border: "1px solid #cbd5e1"
            }}
          />
        )}

        {/* <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button
            className="verify-btn"
            onClick={() => approveImage(img.id)}
          >
            ✅ 
          </button>

          <button
            className="reject-btn"
            onClick={() => {
              if (selectedImageId === img.id) {
                rejectImage(img.id);
              } else {
                setSelectedImageId(img.id);
              }
            }}
          >
            ❌ 
          </button>
        </div> */}

      </div>
    ))
  ) : (
    <p>No pending images for this NGO</p>
  )}
</div>


            {selectedNgo.activationStatus === "PENDING" && (<>
            <textarea
      placeholder="Enter remarks "
      value={rejectReason}
      onChange={(e) => setRejectReason(e.target.value)}
      style={{
        width: "100%",
        minHeight: 80,
        marginTop: 12,
        padding: 10,
        borderRadius: 8,
        border: "1px solid #cbd5e1"
      }}
    />
              <div className="ngo-action-bar">
                <button className="verify-btn" onClick={verifyNgo}>✅ Verify</button>
                <button className="reject-btn" onClick={rejectNgo}>❌ Reject</button>
              </div>
              </>
            )}
          </>
        )}
      </PopupModal>
      {/* {previewImage && (
  <div className="image-preview-overlay" onClick={() => setPreviewImage(null)}>
    <div className="image-preview-box" onClick={(e) => e.stopPropagation()}>
      <button className="image-preview-close" onClick={() => setPreviewImage(null)}>
        ✕
      </button>
      <img src={previewImage} alt="Preview" />
    </div>
  </div>
)} */}

{previewImage && (
  <div
    className="image-preview-overlay"
    onClick={() => setPreviewImage(null)}
  >
    <div
      className="image-preview-box"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="image-preview-close"
        onClick={() => setPreviewImage(null)}
      >
        ✕
      </button>

      <img src={previewImage} alt="Preview" />

      {/* ACTION BAR */}
      <div className="image-preview-actions">
        <textarea
          placeholder="Reason for rejection (optional)"
          value={imageRejectReason}
          onChange={(e) => setImageRejectReason(e.target.value)}
        />

        <div className="image-action-buttons">
          <button
            className="verify-btn"
            onClick={() => {
              approveImage(previewImageId);
              setPreviewImage(null);
            }}
          >
            ✅ Approve
          </button>

          <button
            className="reject-btn"
            onClick={() => {
              rejectImage(previewImageId);
              setPreviewImage(null);
            }}
          >
            ❌ Reject
          </button>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
