import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { I_Dokument } from "../../types/I_Dokument";
import { dataLoeschen, fetchAllData } from "../../service/axiosFetch";
import { closeModal, openModal } from "../../redux/modalSlice";
import DokumentModal from "../../components/Modals/DokumentModal";
import ConfirmationModal from "../../components/Modals/ConfirmationModal";
import { T_RootState } from "../../redux/store";
import { setDokumente } from "../../redux/dokumenteSlice";
import { formatGermanDate, sortList } from "../../service/service";
import { iconsListe } from "../../assets/icons/iconsListe";

const Dokumente = () => {
  const dispatch = useDispatch();
  const dokumenteList = useSelector((state: T_RootState) => state.dokumente.list);
  const modalTitel = useSelector((state: T_RootState) => state.modal.titel);
  const modalData = useSelector((state: T_RootState) => state.modal.aendern);
const [sortedList, setSortedList] = useState<I_Dokument[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof I_Dokument; direction: "auf" | "ab" } | null>(null);

  // Fetch des données des documents au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllData<I_Dokument>('/dokumente');
        dispatch(setDokumente(data)); setSortedList(data);
      } catch (error) {
        console.error("Fehler beim Laden der Dokumente:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // Ouvrir la modal pour créer un nouveau document
  const handleCreate = () => {
    dispatch(openModal({ titel: "Dokument" }));
  };

  // Ouvrir la modal pour modifier un document existant
  const handleUpdate = (dokument: I_Dokument) => {
    dispatch(openModal({ titel: "Dokument", aendern: dokument }));
  };

  // Ouvrir la modal de confirmation avant suppression
  const handleDelete = (id?: number) => {
    if (id) {
      dispatch(
        openModal({
          titel: "Confirmation",
          aendern: { id, message: "Möchten Sie dieses Dokument wirklich löschen?" },
        })
      );
    }
  };

  // Ouvrir le document dans un nouvel onglet
  const handleViewDocument = (url: string) => {
    window.open(url, "_blank");
  };

  // Télécharger le document
  const handleDownloadDocument = (url: string, titel: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = titel || "document"; // Nom du fichier téléchargé
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const requestSort = (key: keyof I_Dokument) => {
      let direction: "auf" | "ab" = "auf";
      if (sortConfig && sortConfig.key === key && sortConfig.direction === "auf") {
        direction = "ab";
      }
      setSortConfig({ key, direction });
  
      const sorted = sortList(dokumenteList, key, direction);
      setSortedList(sorted);
    };

  const displayList = sortConfig ? sortedList : dokumenteList;


  return (
    <div className="p-6 bg-gray-100 min-h-screen my-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dokumentenverwaltung</h2>

      {/* Bouton pour ajouter un nouveau document */}
      <button
        onClick={handleCreate}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Neues Dokument hinzufügen
      </button>

      {/* Affichage de la modal si nécessaire */}
      {modalTitel === "Dokument" && <DokumentModal />}
      {modalTitel === "Confirmation" && modalData && (
  <ConfirmationModal
    message={modalData.message as string}
    onConfirm={async () => {
      try {
        await dataLoeschen("/dokumente", modalData.id!);
        const updatedData = await fetchAllData<I_Dokument>('/dokumente');
        dispatch(setDokumente(updatedData));
      } catch (error) {
        console.error("Fehler beim Löschen des Dokuments:", error);
      }
    }}
    onClose={() => dispatch(closeModal())}
  />
)}

      {/* Tableau des documents */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
          <tr>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("id")}>
    <div className="flex items-center">ID <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("titel")}>
    <div className="flex items-center">Titel <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("type")}>
    <div className="flex items-center">Typ <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("kategorie")}>
    <div className="flex items-center">Kategorie <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("gueltigab")}>
    <div className="flex items-center">Gültig ab <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("gueltigbis")}>
    <div className="flex items-center">Gültig bis <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("erstelldatum")}>
    <div className="flex items-center">Erstelldatum <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
</tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayList.map((dokument, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{index}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{dokument.titel}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{dokument.type}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{dokument.kategorie}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{formatGermanDate(dokument.gueltigab)}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{formatGermanDate(dokument.gueltigbis)}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{formatGermanDate(dokument.erstelldatum)}</td>
                <td className="px-6 py-4 text-sm flex items-center space-x-2">
                  {/* Bouton pour voir le document */}
                  <button
                    onClick={() => handleViewDocument(dokument.url)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Ansehen
                  </button>
                  {/* Bouton pour télécharger le document */}
                  <button
                    onClick={() => handleDownloadDocument(dokument.url, dokument.titel)}
                    className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                  >
                    Herunterladen
                  </button>
                  {/* Bouton pour modifier le document */}
                  <button
                    onClick={() => handleUpdate(dokument)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Ändern
                  </button>
                  {/* Bouton pour supprimer le document */}
                  <button
                    onClick={() => handleDelete(dokument.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Löschen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dokumente;