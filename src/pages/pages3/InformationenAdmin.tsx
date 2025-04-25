import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { I_Information } from "../../types/I_Information"; // Mise à jour de l'import
import { dataLoeschen, fetchAllData } from "../../service/axiosFetch";
import { closeModal, openModal } from "../../redux/modalSlice";
import InformationModal from "../../components/Modals/InformationModal";
import ConfirmationModal from "../../components/Modals/ConfirmationModal";
import { T_RootState } from "../../redux/store";
import { setInformationen } from "../../redux/informationenSlice";
import { formatGermanDate, sortList } from "../../service/service";
import { iconsListe } from "../../assets/icons/iconsListe";

const InformationenAdmin = () => {
  const dispatch = useDispatch();
  const informationenList = useSelector((state: T_RootState) => state.informationen.list); // Mise à jour du selector
  const modalTitel = useSelector((state: T_RootState) => state.modal.titel);
  const modalData = useSelector((state: T_RootState) => state.modal.aendern);
const [sortedList, setSortedList] = useState<I_Information[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof I_Information; direction: "auf" | "ab" } | null>(null);

  // Fetch des données des informations au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllData<I_Information>('/infos'); // Mise à jour de l'endpoint
        dispatch(setInformationen(data)); // Mise à jour de l'action
        setSortedList(data);
       } catch (error) {
        console.error("Fehler beim Laden der Informationen:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // Ouvrir la modal pour créer une nouvelle information
  const handleCreate = () => {
    dispatch(openModal({ titel: "Information" })); // Mise à jour du titre
  };

  // Ouvrir la modal pour modifier une information existante
  const handleUpdate = (information: I_Information) => {
    dispatch(openModal({ titel: "Information", aendern: information })); // Mise à jour du titre
  };

  // Ouvrir la modal de confirmation avant suppression
  const handleDelete = (id?: number) => {
    if (id) {
      dispatch(
        openModal({
          titel: "Confirmation",
          aendern: { id, message: "Möchten Sie diese Information wirklich löschen?" },
        })
      );
    }
  };

   const requestSort = (key: keyof I_Information) => {
      let direction: "auf" | "ab" = "auf";
      if (sortConfig && sortConfig.key === key && sortConfig.direction === "auf") {
        direction = "ab";
      }
      setSortConfig({ key, direction });
  
      const sorted = sortList(informationenList, key, direction);
      setSortedList(sorted);
    };

    const displayList = sortConfig ? sortedList : informationenList;

  return (
    <div className="p-6 bg-gray-100 min-h-screen my-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Informationsverwaltung</h2> {/* Mise à jour du titre */}

      {/* Bouton pour ajouter une nouvelle information */}
      <button
        onClick={handleCreate}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Neue Information hinzufügen
      </button>

 

      {/* Affichage de la modal si nécessaire */}
      {modalTitel === "Information" && <InformationModal />} {/* Mise à jour du composant */}
      {modalTitel === "Confirmation" && modalData && (
  <ConfirmationModal
    message={modalData.message as string}
    onConfirm={async () => {
      try {
        await dataLoeschen("/informationen", modalData.id!);
        const updatedData = await fetchAllData<I_Information>('/informationen');
        dispatch(setInformationen(updatedData));
      } catch (error) {
        console.error("Fehler beim Löschen der Information:", error);
      }
    }}
    onClose={() => dispatch(closeModal())}
  />
)}
      
{/* Section d'aide */}
 <div className="bg-gray-200 p-4 rounded mb-6">
        <h3 className="text-lg font-semibold mb-2">Hilfe</h3>
        <p className="text-sm text-gray-700">
          <strong>Grüne Zeilen:</strong> Wichtige Informationen.<br />
          <strong>Weiße Zeilen:</strong> Aktive Informationen.<br />
          <strong>Rote Zeilen:</strong> Inaktive Informationen.
        </p>
      </div>

      {/* Tableau des informations */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
          <tr>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("id")}>
    <div className="flex items-center">n <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("kategorie")}>
    <div className="flex items-center">Kategorie <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("titel")}>
    <div className="flex items-center">Titel <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("beschreibung")}>
    <div className="flex items-center">Beschreibung <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("startdatum")}>
    <div className="flex items-center">Startdatum <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("enddatum")}>
    <div className="flex items-center">Enddatum <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("status")}>
    <div className="flex items-center">Aktiv <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("wichtig")}><div className="flex items-center">
      <span>{iconsListe.Sortieren.icon1}</span>
    </div></th>
</tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayList.map((information, index) => (
              <tr
              key={index}
              className={`hover:bg-gray-50 transition-colors ${information.status === "Inactive" ? "bg-red-100" : (information.status === "Active" && information.wichtig) ? "bg-green-100" : ""}`} // Mettre en évidence les éléments "wichtig"
            >
                <td className="px-6 py-4 text-sm text-gray-900">{index+1}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{information.kategorie}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{information.titel}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{information.beschreibung}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{formatGermanDate(information.startdatum)}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{formatGermanDate(information.enddatum)}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{information.status === "Active" ? "Ja" : "Nein"}</td> {/* Affichage de "Ja" si inactif */}
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleUpdate(information)}
                    className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Ändern
                  </button>
                  <button
                    onClick={() => handleDelete(information.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Löschen
                  </button>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {information.wichtig && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Wichtig
                    </span>
                  )}
                </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InformationenAdmin;