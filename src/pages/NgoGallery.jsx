// import React, { useEffect, useState } from "react";
// import "./ngoGallery.css";

// export default function NgoGallery() {
//   const [images, setImages] = useState([]);
//   const [file, setFile] = useState(null);
//   const [caption, setCaption] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(null);

//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     loadImages();
//   }, []);

//   async function loadImages() {
//     const token = localStorage.getItem("token");
//     const res = await fetch("http://localhost:8080/gallery/ngo/my", {
//       headers: { Authorization: "Bearer " + token },
//     });
//     const images = await res.json();
//     console.log("images are ",images);
//     setImages(images);
//   }

//   async function uploadImage() {
//     if (!file) {
//       alert("Please select an image");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("caption", caption);

//     setLoading(true);

//     await fetch("http://localhost:8080/gallery/upload", {
//       method: "POST",
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("token"),
//       },
//       body: formData,
//     });

//     setFile(null);
//     setCaption("");
//     loadImages();
//     setLoading(false);
//   }

//   return (
//     <div className="ngo-gallery-container">
//       <h2>Impact Gallery</h2>
//       <p>Upload real photos showing your NGO’s impact</p>

//       {/* Upload Box */}
//       <div className="upload-box">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setFile(e.target.files[0])}
//         />

//         <input
//           type="text"
//           placeholder="Caption (optional)"
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//         />

//         <button onClick={uploadImage} disabled={loading}>
//           {loading ? "Uploading..." : "Upload Image"}
//         </button>
//       </div>

//       {/* Gallery */}
//       <div className="gallery-grid">
//         {images.map((img,index) => (
//           <div className="gallery-card" key={img}>
//            <img
//   src={`http://localhost:8080${img.imagePath || img}`}
//   alt="impact"
//   onClick={() => {
//   setSelectedImage(img);
//   setSelectedIndex(index);
// }}

// />
//             <div className="gallery-info">
//               <span>{img.caption}</span>
//               <span className={`status ${true ? "approved" : "pending"}`}>
//                 {img.approved ? "Approved" : "Pending"}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//       {selectedImage && (
//   <div className="lightbox" onClick={() => setSelectedImage(null)}>
//     <img
//       src={`http://localhost:8080${selectedImage.imagePath || selectedImage}`}
//       alt="Large view"
//       onClick={(e) => e.stopPropagation()}
//     />
//     {selectedImage && (
//   <div className="lightbox">
    
//     {/* Close */}
//     <span className="lightbox-close" onClick={() => {
//       setSelectedImage(null);
//       setSelectedIndex(null);
//     }}>
//       ✕
//     </span>

//     {/* Previous */}
//     {selectedIndex > 0 && (
//       <span
//         className="lightbox-nav left"
//         onClick={() => {
//           const newIndex = selectedIndex - 1;
//           setSelectedIndex(newIndex);
//           setSelectedImage(images[newIndex]);
//         }}
//       >
//         ‹
//       </span>
//     )}

//     {/* Image */}
//     <img
//       src={`http://localhost:8080${selectedImage}`}
//       alt="Large view"
//     />

//     {/* Next */}
//     {selectedIndex < images.length - 1 && (
//       <span
//         className="lightbox-nav right"
//         onClick={() => {
//           console.log("selected index is ",selectedIndex);
//           console.log(images);
//           const newIndex = selectedIndex + 1;
//           console.log(newIndex);
//           setSelectedIndex(newIndex);
//           setSelectedImage(images[newIndex]);
//         }}
//       >
//         ›
//       </span>
//     )}

//     {/* Caption */}
//     {selectedImage.caption && (
//       <p className="lightbox-caption">{selectedImage.caption}</p>
//     )}
//   </div>
// )}

//   </div>
// )}

//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import "./ngoGallery.css";

export default function NgoGallery() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/gallery/ngo/my", {
      headers: { Authorization: "Bearer " + token },
    });
    const data = await res.json();
    setImages(data);
  }

  async function uploadImage() {
    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);

    setLoading(true);

    await fetch("http://localhost:8080/gallery/upload", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    });

    setFile(null);
    setCaption("");
    setLoading(false);
    loadImages();
  }

  return (
    <div className="ngo-gallery-container">
      <h2>Impact Gallery</h2>
      <p>Upload real photos showing your NGO’s impact</p>

      {/* Upload Box */}
      <div className="upload-box">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <input
          type="text"
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <button onClick={uploadImage} disabled={loading}>
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      {/* Gallery */}
      <div className="gallery-grid">
        {images.map((img, index) => (
          <div className="gallery-card" key={img || index}>
            <img
              src={`http://localhost:8080${img}`}
              alt="impact"
              onClick={() => {
                setSelectedImage(img);
                setSelectedIndex(index);
              }}
            />
            <div className="gallery-info">
              <span>{img.caption}</span>
              <span className={`status ${true ? "approved" : "pending"}`}>
                {img.approved ? "Approved" : "Pending"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="lightbox"
          onClick={() => {
            setSelectedImage(null);
            setSelectedIndex(null);
          }}
        >
          {/* Close */}
          <span
            className="lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
              setSelectedIndex(null);
            }}
          >
            ✕
          </span>

          {/* Previous */}
          {selectedIndex > 0 && (
            <span
              className="lightbox-nav left"
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = selectedIndex - 1;
                setSelectedIndex(newIndex);
                setSelectedImage(images[newIndex]);
              }}
            >
              ‹
            </span>
          )}

          {/* Image */}
          <img
            src={`http://localhost:8080${selectedImage}`}
            alt="Large view"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {selectedIndex < images.length - 1 && (
            <span
              className="lightbox-nav right"
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = selectedIndex + 1;
                setSelectedIndex(newIndex);
                setSelectedImage(images[newIndex]);
              }}
            >
              ›
            </span>
          )}

          {/* Caption */}
          {selectedImage.caption && (
            <p
              className="lightbox-caption"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImage.caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
