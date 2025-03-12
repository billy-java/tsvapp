import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { I_Information } from "../../types/I_Information";
import { fetchAllData } from "../../service/axiosFetch";
import { T_RootState } from "../../redux/store";
import { setInformationen } from "../../redux/informationenSlice";
import { formatGermanDate, sortList } from "../../service/service";
import { iconsListe } from "../../assets/icons/iconsListe";

const Informationen = () => {
  const dispatch = useDispatch();
  const informationenList = useSelector(
    (state: T_RootState) => state.informationen.list
  );
  const [sortedList, setSortedList] = useState<I_Information[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof I_Information;
    direction: "auf" | "ab";
  } | null>(null);

  // Fetch des données des informations au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllData<I_Information>("/infos");
        dispatch(setInformationen(data));
        setSortedList(data); // Initialiser la liste triée
      } catch (error) {
        console.error("Fehler beim Laden der Informationen:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // Fonction de tri
  const requestSort = (key: keyof I_Information) => {
    let direction: "auf" | "ab" = "auf";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "auf"
    ) {
      direction = "ab";
    }
    setSortConfig({ key, direction });

    const sorted = sortList(informationenList, key, direction);
    setSortedList(sorted);
  };

  // Afficher la liste triée ou non triée
  const displayList = sortConfig ? sortedList : informationenList;

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen my-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Alle Informationen
      </h2>

      {/* Section d'aide */}
      <div className="bg-gray-200 p-4 rounded mb-6">
        <h3 className="text-lg font-semibold mb-2">Hilfe</h3>
        <p className="text-sm text-gray-700">
          <strong>Grüne Zeilen:</strong> Wichtige Informationen.
          <br />
          <strong>Weiße Zeilen:</strong> Aktive Informationen.
          <br />
          <strong>Rote Zeilen:</strong> Inaktive Informationen.
        </p>
      </div>

      {/* Tableau des informations (visible sur les écrans moyens et grands) */}
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
                onClick={() => requestSort("kategorie")}
              >
                <div className="flex items-center">
                  Kategorie{" "}
                  <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("titel")}
              >
                <div className="flex items-center">
                  Titel{" "}
                  <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("beschreibung")}
              >
                <div className="flex items-center">
                  Beschreibung{" "}
                  <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("startdatum")}
              >
                <div className="flex items-center">
                  Startdatum{" "}
                  <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("enddatum")}
              >
                <div className="flex items-center">
                  Enddatum{" "}
                  <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("status")}
              >
                <div className="flex items-center">
                  Aktiv{" "}
                  <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("wichtig")}
              >
                <div className="flex items-center">
                  <span>{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayList.map((information) => (
              <tr
                key={information.id}
                className={`hover:bg-gray-50 transition-colors ${
                  information.status === "Inactive"
                    ? "bg-red-100"
                    : information.status === "Active" && information.wichtig
                    ? "bg-green-100"
                    : ""
                }`}
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  {information.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {information.kategorie}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {information.titel}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {information.beschreibung}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatGermanDate(information.startdatum)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatGermanDate(information.enddatum)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {information.status === "Active" ? "Ja" : "Nein"}
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

      {/* Affichage en cartes pour les petits écrans */}
      <div className="sm:hidden space-y-4">
        {displayList.map((information) => (
          <div
            key={information.id}
            className={`p-4 bg-white rounded-lg shadow-md ${
              information.status === "Inactive"
                ? "bg-red-100"
                : information.status === "Active" && information.wichtig
                ? "bg-green-100"
                : ""
            }`}
          >
            <div className="text-sm text-gray-900">
              <div className="font-semibold">{information.titel}</div>
              <div className="text-gray-700">{information.kategorie}</div>
              <div className="text-gray-700">{information.beschreibung}</div>
              <div className="text-gray-700">
                {formatGermanDate(information.startdatum)} -{" "}
                {formatGermanDate(information.enddatum)}
              </div>
              <div className="text-gray-700">
                {information.status === "Active" ? "Aktiv" : "Inaktiv"}
              </div>
              {information.wichtig && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Wichtig
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Informationen;
