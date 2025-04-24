// Créez un nouveau fichier Popup.tsx
import React from "react";

interface PopupProps {
  message: string;
  onClose: () => void;
  type?: "error" | "info";
}

const Popup: React.FC<PopupProps> = ({ message, onClose, type = "error" }) => {
  const bgColor = type === "error" ? "bg-red-100 border-red-400" : "bg-blue-100 border-blue-400";
  const textColor = type === "error" ? "text-red-700" : "text-blue-700";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className={`relative p-6 rounded-lg shadow-lg max-w-md w-full mx-4 ${bgColor} border`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className={`${textColor}`}>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;