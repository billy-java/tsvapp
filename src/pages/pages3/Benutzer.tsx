import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { I_Benutzer } from "../../types/I_Benutzer";
import { dataLoeschen, fetchAllData } from "../../service/axiosFetch";
import { closeModal, openModal } from "../../redux/modalSlice";
import BenutzerModal from "../../components/Modals/BenutzerModal";
import ConfirmationModal from "../../components/Modals/ConfirmationModal"; // Importez la nouvelle modal
import { T_RootState } from "../../redux/store";
import { setUsers } from "../../redux/benutzerSlice";
import { sortList } from "../../service/service";
import { iconsListe } from "../../assets/icons/iconsListe";

const Benutzer = () => {
  const dispatch = useDispatch();
  const benutzerList = useSelector((state: T_RootState) => state.benutzer.list);
  const modalTitel = useSelector((state: T_RootState) => state.modal.titel);
  const modalData = useSelector((state: T_RootState) => state.modal.aendern);
const [sortedList, setSortedList] = useState<I_Benutzer[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof I_Benutzer; direction: "auf" | "ab" } | null>(null);

  // Fetch des données des utilisateurs au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllData<I_Benutzer>('/benutzer');
        dispatch(setUsers(data));
      } catch (error) {
        console.error("Fehler beim Laden der Benutzerdaten:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // Ouvrir la modal pour créer un nouvel utilisateur
  const handleCreate = () => {
    dispatch(openModal({ titel: "Benutzer" }));
  };

  // Ouvrir la modal pour modifier un utilisateur existant
  const handleUpdate = (benutzer: I_Benutzer) => {
    dispatch(openModal({ titel: "Benutzer", aendern: benutzer }));
  };

  // Ouvrir la modal de confirmation avant suppression
  const handleDelete = (id?: number) => {
    if (id) {
      dispatch(
        openModal({
          titel: "Confirmation",
          aendern: { id, message: "Möchten Sie diesen Benutzer wirklich löschen?" },
        })
      );
    }
  };

   const requestSort = (key: keyof I_Benutzer) => {
      let direction: "auf" | "ab" = "auf";
      if (sortConfig && sortConfig.key === key && sortConfig.direction === "auf") {
        direction = "ab";
      }
      setSortConfig({ key, direction });
  
      const sorted = sortList(benutzerList, key, direction);
      setSortedList(sorted);
    };

    const displayList = sortConfig ? sortedList : benutzerList;


  return (
    <div className="p-6 bg-gray-100 min-h-screen my-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Benutzerverwaltung</h2>

      {/* Bouton pour ajouter un nouvel utilisateur */}
      <button
        onClick={handleCreate}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Neuen Benutzer hinzufügen
      </button>

      {/* Affichage de la modal si nécessaire */}
      {modalTitel === "Benutzer" && <BenutzerModal />}
      {modalTitel === "Confirmation" && modalData && (
  <ConfirmationModal
    message={modalData.message as string}
    onConfirm={async () => {
      try {
        await dataLoeschen("/benutzer", modalData.id!);
        const updatedData = await fetchAllData<I_Benutzer>('/benutzer');
        dispatch(setUsers(updatedData));
      } catch (error) {
        console.error("Fehler beim Löschen des Benutzers:", error);
      }
    }}
    onClose={() => dispatch(closeModal())}
  />
)}

      {/* Tableau des utilisateurs */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
    onClick={() => requestSort("id")}
  >
    <div className="flex items-center">
      n <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
    </div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
    onClick={() => requestSort("nachname")}
  >
    <div className="flex items-center">
      Nachname <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
    </div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
    onClick={() => requestSort("vorname")}
  >
    <div className="flex items-center">
      Vorname <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
    </div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
    onClick={() => requestSort("email")}
  >
    <div className="flex items-center">
      Email <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
    </div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
    onClick={() => requestSort("rolle")}
  >
    <div className="flex items-center">
      Rolle <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
    </div>
  </th>
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    Aktionen
  </th>
</tr>

          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayList.map((benutzer, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{index+1}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{benutzer.nachname}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{benutzer.vorname}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{benutzer.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{benutzer.rolle}</td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleUpdate(benutzer)}
                    className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Ändern
                  </button>
                  <button
                    onClick={() => handleDelete(benutzer.id)}
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

export default Benutzer;