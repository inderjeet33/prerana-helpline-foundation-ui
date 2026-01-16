
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./NgoPublicProfile.css";
import { image } from "framer-motion/client";

export default function NgoPublicProfile() {
  // const { id } = useParams();
  // const [ownerId,setOwner] = useState(null);
  // const [ngo, setNgo] = useState(null);
  // const [images, setImages] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [selectedImage, setSelectedImage] = useState(null);

  const { id } = useParams();
const [ngo, setNgo] = useState(null);
const [ownerId, setOwnerId] = useState(null);
const [images, setImages] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [selectedImage, setSelectedImage] = useState(null);

  // useEffect(() => {
  //   loadNgo();
  //   loadGallery();
  // }, []);
  useEffect(() => {
  loadNgo();
}, []);
useEffect(() => {
  if (ownerId) {
    loadGallery(ownerId);
  }
}, [ownerId]);

  // async function loadNgo() {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await fetch(
  //       `http://localhost:8080/donations/${id}/receiver`,
  //       {
  //         headers: { Authorization: "Bearer " + token }
  //       }
  //     );

  //     if (!res.ok) throw new Error();
  //     const data = await res.json();
  //     console.log("data is ",data);
  //     console.log(data.ownerId);
  //      setOwnerId(data.ownerId);
  //     setNgo(data);
  //   } catch {
  //     setError("You are not authorized to view this NGO.");
  //   }
  // }

  async function loadNgo() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:8080/donations/${id}/receiver`,
      { headers: { Authorization: "Bearer " + token } }
    );

    console.log("response for not seeing ",res);
    if (!res.ok) throw new Error();

    const data = await res.json();

    setNgo(data);
    setOwnerId(data.ownerId); // ✅ NOW STORED SAFELY
  } catch(err) {
    setError("You are not authorized to view this NGO.");
  } finally {
    setLoading(false);
  }
}

  // async function loadGallery() {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const ngoOwnerId = ngo.ownerId;
  //     const res = await fetch(
  //       `http://localhost:8080/gallery/ngo/${ngoOwnerId}/public`,
  //       {
  //         headers: { Authorization: "Bearer " + token }
  //       }
  //     );

  //     if (res.ok) {
  //       const imgs = await res.json();
  //       setImages(imgs);
  //     }
  //   } catch (e) {
  //     console.log("Gallery load failed", e);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function loadGallery(ngoOwnerId) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:8080/gallery/ngo/${ngoOwnerId}/public`,
      { headers: { Authorization: "Bearer " + token } }
    );

    if (res.ok) {
      const imgs = await res.json();
      console.log("images ",imgs);
      setImages(imgs);
    }
  } catch (e) {
    console.log("Gallery load failed", e);
  }
}

  if (loading) return <div className="ngo-public-loading">Loading...</div>;
  if (error) return <div className="ngo-public-error">{error}</div>;

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="ngo-public-container">
        <div className="ngo-public-card">
          <h1>{ngo.name}</h1>
          <p className="ngo-desc">{ngo.description}</p>

          <div className="ngo-info">
            <span>📍 {ngo.address}</span>
            <span>📧 {ngo.receiverEmail}</span>
            <span>📞 {ngo.mobile}</span>
            {ngo.website && (
              <a href={ngo.website} target="_blank" rel="noreferrer">
                🌐 {ngo.website}
              </a>
            )}
          </div>

          <div className="ngo-note">
            You are connected to this NGO through your donation.
          </div>

          {/* 🔥 Impact Gallery */}
          <div className="ngo-gallery-section">
            <h2>Impact Gallery</h2>

            {images.length === 0 ? (
              <p className="ngo-gallery-empty">
                No impact images uploaded yet.
              </p>
            ) : (
              <div className="ngo-gallery-grid">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={`http://localhost:8080${img.imageUrl}`}
                    alt="NGO Impact"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="ngo-lightbox" onClick={() => setSelectedImage(null)}>
          <img
            src={`http://localhost:8080${selectedImage.imageUrl}`}
            alt="Large View"
            onClick={(e) => e.stopPropagation()}
          />
          {selectedImage.caption && (
            <p className="ngo-lightbox-caption">{selectedImage.caption}</p>
          )}
        </div>
      )}
    </>
  );
  
}
