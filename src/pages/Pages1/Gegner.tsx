import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { I_Verein } from "../../types/I_Verein";
import { fetchAllData, dataLoeschen } from "../../service/axiosFetch";
import { setUnsereVereine, setGegnerVereine } from "../../redux/vereinSlice";
import { T_RootState } from "../../redux/store";
import DetailModal from "../../components/Modals/DetailModal";
import GegnerModal from "../../components/Modals/GegnerModal";
import { closeModal, openModal } from "../../redux/modalSlice";
import ConfirmationModal from "../../components/Modals/ConfirmationModal";
import { einAdmin, einTrainer } from "../../service/service";
import { sortList } from "../../service/service";
import { iconsListe } from "../../assets/icons/iconsListe";

const Gegner = () => {
  const dispatch = useDispatch();
  const vereineList = useSelector((state: T_RootState) => state.vereine.vereineList).filter((verein) => !verein.istGegner);
  const gegnerList = useSelector((state: T_RootState) => state.vereine.gegnerList);
  const modalTitel = useSelector((state: T_RootState) => state.modal.titel);
  const modalData = useSelector((state: T_RootState) => state.modal.aendern);
  const user = useSelector((state: T_RootState) => state.auth.userState.user!);

  const [selectedTeam, setSelectedTeam] = useState<I_Verein | null>(null);
  const [selectedOpponent, setSelectedOpponent] = useState<I_Verein | null>(null);
  const [isGegnerModalOpen, setIsGegnerModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortedList, setSortedList] = useState<I_Verein[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof I_Verein | "trainername"; direction: "auf" | "ab" } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vereine = await fetchAllData<I_Verein>("/vereine");
        const unsereVereine = vereine.filter((verein) => !verein.istGegner);
        dispatch(setUnsereVereine(unsereVereine));

        const gegner = vereine.filter((verein) => verein.istGegner);
        dispatch(setGegnerVereine(gegner));
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleTeamClick = (team: I_Verein) => {
    setSelectedTeam(team);
    setSelectedOpponent(null);
  };

  const handleOpponentClick = (opponent: I_Verein) => {
    setSelectedOpponent(opponent);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setSelectedOpponent(null);
    setIsGegnerModalOpen(false);
  };

  const handleCreateOpponent = () => {
    setIsGegnerModalOpen(true);
  };

  const handleEditOpponent = (opponent: I_Verein) => {
    setSelectedOpponent(opponent);
    setIsEditing(true);
    setIsGegnerModalOpen(true);
  };

  const handleDeleteOpponent = (id: number) => {
    dispatch(
      openModal({
        titel: "Confirmation",
        aendern: { id, message: "Möchten Sie diesen Verein wirklich löschen?" },
      })
    );
  };

  const handleConfirmDelete = async (id: number) => {
    try {
      await dataLoeschen("/vereine", id);
      const updatedData = await fetchAllData<I_Verein>("/vereine");
      dispatch(setGegnerVereine(updatedData.filter((verein) => verein.istGegner)));
    } catch (error) {
      console.error("Fehler beim Löschen des Gegners:", error);
    }
  };

  const requestSort = (key: keyof I_Verein) => {
    let direction: "auf" | "ab" = "auf";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "auf") {
      direction = "ab";
    }
    setSortConfig({ key, direction });

    const sorted = sortList(gegnerList, key, direction);
    setSortedList(sorted);
  };

  const displayList = sortConfig ? sortedList : gegnerList;

  if (isLoading) {
    return <div className="p-6 text-center">Lade Daten...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen my-10">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Alle Teams von TSV-Langgöns:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vereineList.map((team, index) => (
            <div
              key={index}
              className={`${selectedTeam && selectedTeam.id === team.id ? "shadow-md shadow-blue-300 bg-blue-100" : ""} p-4 rounded-lg shadow-md cursor-pointer transition-colors`}
              onClick={() => handleTeamClick(team)}
            >
              <h4 className="text-lg font-semibold text-gray-800">{team.name}</h4>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 text-gray-800">Gegnerübersicht</h2>

      {selectedTeam && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Liste der Gegner von {selectedTeam.name}</h3>

          {/* Version desktop */}
          <div className="hidden sm:block overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("id")}>
                    <div className="flex items-center">ID <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300" onClick={() => requestSort("name")}>
                    <div className="flex items-center">Name <span className="ml-2">{iconsListe.Sortieren.icon1}</span></div>
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
                {displayList
                  .filter((gegner) => gegner.gegnerid === selectedTeam.id)
                  .map((gegner, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{index+1}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{gegner.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{gegner.trainername}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{gegner.telefon}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{gegner.email}</td>
                      <td className="px-6 py-4 text-sm">
                        {(einAdmin(user) || (einTrainer(user) && gegner.coachid === user.id)) && (
                          <>
                            <button
                              onClick={() => handleEditOpponent(gegner)}
                              className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            >
                              Ändern
                            </button>
                            <button
                              onClick={() => handleDeleteOpponent(gegner.id)}
                              className="mr-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Löschen
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleOpponentClick(gegner)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Mehr
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Version mobile */}
          <div className="sm:hidden space-y-4">
            {displayList
              .filter((gegner) => gegner.gegnerid === selectedTeam.id)
              .map((gegner, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                  <div className="text-sm text-gray-900">
                    <div className="font-semibold">{gegner.name}</div>
                    <div className="text-gray-700">👨‍🏫 Trainername: {gegner.trainername}</div>
                    {gegner.telefon && <div className="text-gray-700">📞 Telefon: {gegner.telefon}</div>} 
                   {gegner.email && <div className="text-gray-700">✉️ Email: {gegner.email}</div>} 
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(einAdmin(user) || (einTrainer(user) && gegner.coachid === user.id)) && (
                        <>
                          <button
                            onClick={() => handleEditOpponent(gegner)}
                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center"
                          >
                            ✏️ Ändern
                          </button>
                          <button
                            onClick={() => handleDeleteOpponent(gegner.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
                          >
                            🗑️ Löschen
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleOpponentClick(gegner)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                      >
                        Mehr
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {(einAdmin(user) || (einTrainer(user) && selectedTeam.coachid === user.id)) && (
            <button
              onClick={handleCreateOpponent}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              + Ein neuer Gegner einsetzen
            </button>
          )}
        </div>
      )}

      {selectedOpponent && !isEditing && (
        <DetailModal verein={selectedOpponent} onClose={handleCloseModal} />
      )}

      {isGegnerModalOpen && (
        <GegnerModal
          selectedTeam={selectedTeam}
          onClose={handleCloseModal}
          gegner={selectedOpponent as I_Verein}
        />
      )}

      {modalTitel === "Confirmation" && modalData && (
        <ConfirmationModal
          message={modalData.message as string}
          onConfirm={() => handleConfirmDelete(modalData.id!)}
          onClose={() => dispatch(closeModal())}
        />
      )}
    </div>
  );
};

export default Gegner;