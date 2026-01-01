import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./gallery.css";

export default function Gallery() {

  // list of images (you can replace with real images later)
  const images = [
    "/gallery/img1.jpg",
    "/gallery/img2.jpg",
    "/gallery/img3.jpg",
    "/gallery/img4.jpg",
    "/gallery/img5.jpg",
    "/gallery/img6.jpg",
    "/gallery/img7.jpg",
    "/gallery/img8.jpg",
    "/gallery/img9.jpg",
    "/gallery/img10.jpg",
  ];

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="with-sidebar gallery-container">
        <h1 className="gallery-title">📸 Our Gallery</h1>
        <p className="gallery-subtitle">
          Capturing the moments of service, compassion, and hope.
        </p>

        <div className="gallery-grid">
          {images.map((img, i) => (
            <div key={i} className="gallery-card">
              <img src={img} alt="gallery" className="gallery-img" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
