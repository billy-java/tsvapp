import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { I_Verein } from "../../types/I_Verein";
import { fetchAllData, dataLoeschen } from "../../service/axiosFetch";
import { T_RootState } from "../../redux/store";
import { setUnsereVereine } from "../../redux/vereinSlice";
import DetailModal from "../../components/Modals/DetailModal";
import VereinModal from "../../components/Modals/VereinModal";
import ConfirmationModal from "../../components/Modals/ConfirmationModal";
import { einAdmin, sortList } from "../../service/service";
import { iconsListe } from "../../assets/icons/iconsListe";
import { closeModal, openModal } from "../../redux/modalSlice";
import { einTrainer } from "../../service/service";

const Vereine = () => {
  const dispatch = useDispatch();
  const vereineList = useSelector((state: T_RootState) => state.vereine.vereineList);
  const user = useSelector((state: T_RootState) => state.auth.userState.user);
  const modalTitel = useSelector((state: T_RootState) => state.modal.titel);
  const modalData = useSelector((state: T_RootState) => state.modal.aendern);
  
  const [selectedVerein, setSelectedVerein] = useState<I_Verein | null>(null);
  const [sortedList, setSortedList] = useState<I_Verein[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof I_Verein | "trainername";
    direction: "auf" | "ab";
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = (await fetchAllData<I_Verein>("/vereine")).filter(
          (verein) => !verein.istGegner
        );
        dispatch(setUnsereVereine(data));
      } catch (error) {
        console.error("Fehler beim Laden der Vereinsdaten:", error);
      }
    };
    fetchData();
  }, [dispatch, vereineList.length]);

  const handleCreate = () => {
    dispatch(openModal({ titel: "Verein" }));
  };

  const handleUpdate = (verein: I_Verein) => {
    if (canManageVerein(verein)) {
      dispatch(openModal({ titel: "Verein", aendern: verein }));
    }
  };

  const handleDelete = (id?: number) => {
    if (id) {
      const verein = vereineList.find(v => v.id === id);
      if (verein && canManageVerein(verein)) {
        dispatch(
          openModal({
            titel: "Confirmation",
            aendern: { id, message: "Möchten Sie diesen Verein wirklich löschen?" },
          })
        );
      }
    }
  };

  const handleShowDetails = (verein: I_Verein) => {
    setSelectedVerein(verein);
  };

  const requestSort = (key: keyof I_Verein) => {
    let direction: "auf" | "ab" = "auf";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "auf") {
      direction = "ab";
    }
    setSortConfig({ key, direction });
    const sorted = sortList(vereineList, key, direction);
    setSortedList(sorted);
  };

  const canManageVerein = (verein: I_Verein): boolean => {
    return !!user && (einAdmin(user) || (einTrainer(user) && user.id === verein.coachid));
  };

  const displayList = sortConfig ? sortedList : vereineList;

  return (
    <div className="p-6 bg-gray-100 min-h-screen my-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {einTrainer(user!) ? "Vereinsverwaltung" : "Vereinsübersicht"}
      </h2>

      {(einAdmin(user!) || einTrainer(user!)) && (
        <button
          onClick={handleCreate}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Neuen Verein hinzufügen
        </button>
      )}

      {modalTitel === "Verein" && <VereinModal />}
      {modalTitel === "Confirmation" && modalData && (
        <ConfirmationModal
          message={modalData.message as string}
          onConfirm={async () => {
            try {
              await dataLoeschen("/vereine", modalData.id!);
              const updatedData = (await fetchAllData<I_Verein>('/vereine')).filter((verein) => !verein.istGegner);
              dispatch(setUnsereVereine(updatedData));
            } catch (error) {
              console.error("Fehler beim Löschen des Vereins:", error);
            }
          }}
          onClose={() => dispatch(closeModal())}
        />
      )}

      {selectedVerein && (
        <DetailModal
          verein={selectedVerein}
          onClose={() => setSelectedVerein(null)}
        />
      )}

      <div className="hidden sm:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("id")}>
                <div className="flex items-center">ID <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("name")}>
                <div className="flex items-center">Vereinsname <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("trainername")}>
                <div className="flex items-center">Trainer <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("telefon")}>
                <div className="flex items-center">Telefon <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("email")}>
                <div className="flex items-center">Email <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayList.map((verein, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{index+1}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{verein.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{verein.trainername}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{verein.telefon}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{verein.email}</td>
                <td className="px-6 py-4 text-sm">
                  {(einAdmin(user!) || canManageVerein(verein)) && (
                    <>
                      <button
                        onClick={() => handleUpdate(verein)}
                        className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Ändern
                      </button>
                      <button
                        onClick={() => handleDelete(verein.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Löschen
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleShowDetails(verein)}
                    className={`px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 ${(einAdmin(user!) || canManageVerein(verein)) ? "ml-2" : ""}`}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Affichage mobile avec emojis */}
      <div className="sm:hidden space-y-4">
        {displayList.map((verein) => (
          <div key={verein.id} className="p-4 bg-white rounded-lg shadow-md">
            <div className="text-sm text-gray-900">
              <div className="font-semibold">{verein.name}</div>
              <div className="text-gray-700">👨‍🏫 Trainername: {verein.trainername}</div>
              <div className="text-gray-700">📞 Telefon: {verein.telefon}</div>
              <div className="text-gray-700">✉️ Email: {verein.email}</div>
              
              <div className="flex justify-between items-center mt-2 space-x-2">
                {(einAdmin(user!) || canManageVerein(verein)) && (
                  <>
                    <button
                      onClick={() => handleUpdate(verein)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center"
                    >
                      ✏️ Ändern
                    </button>
                    <button
                      onClick={() => handleDelete(verein.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
                    >
                      🗑️ Löschen
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleShowDetails(verein)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vereine;