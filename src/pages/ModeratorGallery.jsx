import { useEffect, useState } from "react";
import axios from "axios";
import "./ModeratorGallery.css";

export default function ModeratorGallery() {
  const [images, setImages] = useState([]);
  const [rejectReason, setRejectReason] = useState("");
  const token = localStorage.getItem("token");

  const loadImages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/moderator/moderator/gallery/pending",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setImages(res.data);
    } catch (err) {
      console.error("Failed to load images", err);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const approve = async (id) => {
    await axios.post(
      `http://localhost:8080/moderator/gallery/${id}/approve`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadImages();
  };

  const reject = async (id) => {
    if (!rejectReason.trim()) {
      alert("Please enter rejection reason");
      return;
    }

    await axios.post(
      `http://localhost:8080/moderator/gallery/${id}/reject`,
      { reason: rejectReason },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    setRejectReason("");
    loadImages();
  };

  return (
    <div className="mod-gallery">
      <h1>NGO Image Approvals</h1>

      {images.length === 0 && (
        <p className="empty-msg">No pending images for review.</p>
      )}

      <div className="gallery-grid">
        {images.map(img => (
          <div className="gallery-card" key={img.id}>
            <img src={img.imageUrl} alt="NGO upload" />

            <div className="gallery-info">
              <h4>{img.ngoName}</h4>
              <p>{img.caption || "No caption provided"}</p>
            </div>

            <div className="gallery-actions">
              <button className="approve-btn" onClick={() => approve(img.id)}>
                ✅ Approve
              </button>

              <input
                type="text"
                placeholder="Rejection reason..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />

              <button className="reject-btn" onClick={() => reject(img.id)}>
                ❌ Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
