import "./Moderator.css";

export default function PopupModal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="mod-modal-overlay" onClick={onClose}>
      <div
        className="mod-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mod-modal-header">
          <h3>{title}</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="mod-modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}
