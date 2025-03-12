// src/components/Modals/DetailModal.tsx
import React from "react";
import { I_Verein } from "../../types/I_Verein";

interface DetailModalProps {
  verein: I_Verein;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ verein, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Details des Vereins</h2>

        {/* Conteneur du contenu avec ascenseur */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name des Vereins</label>
            <p className="text-gray-900">{verein.name}</p>
          </div>

          {verein.trainername && <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{!verein.istGegner ? "Name des Trainers" : "Name des Trainers (Gegner)"}</label>
            <p className="text-gray-900">{verein.trainername}</p>
          </div>}

      { verein.telefon &&   <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
            <p className="text-gray-900">{verein.telefon}</p>
          </div> } 
       {verein.email &&  <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
            <p className="text-gray-900">{verein.email}</p>
          </div>}
        { verein.adresse &&   <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            <p className="text-gray-900">{verein.adresse}</p>
          </div>}
        {verein.beschreibung && <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
            <p className="text-gray-900 whitespace-pre-line">{verein.beschreibung}</p>
          </div>}  
          {verein.zusatzinformation && <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zusatzinformation</label>
            <p className="text-gray-900 whitespace-pre-line">{verein.zusatzinformation}</p>
          </div>}
          {verein.regeln && <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Regeln</label>
            <p className="text-gray-900 whitespace-pre-line">{verein.regeln}</p>
          </div>}
          
        </div>

        {/* Bouton de fermeture */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
