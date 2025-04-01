import React from "react";

interface CompletionModalProps {
  isOpen: boolean;
  message: string;
  redirectPath: string; // Although not used directly here, it's good practice to pass it if the parent needs it for the onClose logic
  onClose: () => void; // Function to call when the modal should close
}

const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  message,
  onClose,
}) => {
  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      {" "}
      {/* Optional: Close on overlay click */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {" "}
        {/* Prevent closing when clicking inside content */}
        <p>{message}</p>
        <button className="modal-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default CompletionModal;
