import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { I_Verein } from "../../types/I_Verein";
import { fetchAllData } from "../../service/axiosFetch";
import { T_RootState } from "../../redux/store";
import { setUnsereVereine } from "../../redux/vereinSlice";
import DetailModal from "../../components/Modals/DetailModal";
import { sortList } from "../../service/service";
import { iconsListe } from "../../assets/icons/iconsListe";

const Vereine = () => {
  const dispatch = useDispatch();
  const vereineList = useSelector(
    (state: T_RootState) => state.vereine.vereineList
  );
  const [selectedVerein, setSelectedVerein] = useState<I_Verein | null>(null);

  const [sortedList, setSortedList] = useState<I_Verein[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof I_Verein | "trainername";
    direction: "auf" | "ab";
  } | null>(null);

  // Charger les données des Vereine au montage du composant
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

  // Afficher les détails d'un Verein
  const handleShowDetails = (verein: I_Verein) => {
    setSelectedVerein(verein);
  };

  // Fonction de tri
  const requestSort = (key: keyof I_Verein) => {
    let direction: "auf" | "ab" = "auf";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "auf"
    ) {
      direction = "ab";
    }
    setSortConfig({ key, direction });

    const sorted = sortList(vereineList, key, direction);
    setSortedList(sorted);
  };

  const displayList = sortConfig ? sortedList : vereineList;

  return (
    <div className="p-6 bg-gray-100 min-h-screen my-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Vereinsübersicht
      </h2>

      {/* Afficher la modal des détails si un Verein est sélectionné */}
      {selectedVerein && (
        <DetailModal
          verein={selectedVerein}
          onClose={() => setSelectedVerein(null)}
        />
      )}

      {/* Tableau des Vereine */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("id")}
              >
                <div className="flex items-center">
                  ID <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("name")}
              >
                <div className="flex items-center">
                  Vereinsname{" "}
                  <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("trainername")}
              >
                <div className="flex items-center">
                  Trainer{" "}
                  <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("telefon")}
              >
                <div className="flex items-center">
                  Telefon{" "}
                  <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("email")}
              >
                <div className="flex items-center">
                  Email{" "}
                  <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayList.map((verein) => (
              <tr
                key={verein.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900">{verein.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {verein.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {verein.trainername}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {verein.telefon}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {verein.email}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleShowDetails(verein)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Details anzeigen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Affichage en cartes pour les petits écrans */}
<div className="sm:hidden space-y-4">
  {displayList.map((verein) => (
    <div
      key={verein.id}
      className="p-4 bg-white rounded-lg shadow-md"
    >
      <div className="text-sm text-gray-900">
        <div className="font-semibold">{verein.name}</div>
        <div className="text-gray-700">Trainer: {verein.trainername}</div>
        <div className="text-gray-700">Telefon: {verein.telefon}</div>
        <div className="text-gray-700">Email: {verein.email}</div>
        
        <div className="flex justify-between items-center mt-2">
          <button
            onClick={() => handleShowDetails(verein)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Details anzeigen
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
