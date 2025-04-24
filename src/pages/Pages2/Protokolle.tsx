// src/pages/Protokolle.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { I_Dokument } from "../../types/I_Dokument";
import { fetchAllData } from "../../service/axiosFetch";
import { T_RootState } from "../../redux/store";
import { setDokumente } from "../../redux/dokumenteSlice";
import { formatGermanDate, sortList } from "../../service/service";
import { iconsListe } from "../../assets/icons/iconsListe";

const Protokolle = () => {
  const dispatch = useDispatch();
  const dokumenteList = useSelector(
    (state: T_RootState) => state.dokumente.list
  );
  const protokolle = dokumenteList.filter(
    (dokument) => dokument.kategorie === "Protokol"
  );
  const [sortedList, setSortedList] = useState<I_Dokument[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof I_Dokument;
    direction: "auf" | "ab";
  } | null>(null);

  // Charger les données des documents au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllData<I_Dokument>("/dokumente");
        dispatch(setDokumente(data));
        setSortedList(data);
      } catch (error) {
        console.error("Fehler beim Laden der Dokumente:", error);
      }
    };
    fetchData();
  }, [dispatch]);

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
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "auf"
    ) {
      direction = "ab";
    }
    setSortConfig({ key, direction });

    const sorted = sortList(protokolle, key, direction);
    setSortedList(sorted);
  };

  // Afficher la liste triée ou non triée
  const displayList = sortConfig ? sortedList : protokolle;

  return (
    <div className="p-6 bg-gray-100 min-h-screen my-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Protokolle</h2>

      {/* Tableau des Protokolle */}
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
                onClick={() => requestSort("titel")}
              >
                <div className="flex items-center">
                  Titel{" "}
                  <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("type")}
              >
                <div className="flex items-center">
                  Typ <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("gueltigab")}
              >
                <div className="flex items-center">
                  Gültig ab{" "}
                  <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("gueltigbis")}
              >
                <div className="flex items-center">
                  Gültig bis{" "}
                  <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("erstelldatum")}
              >
                <div className="flex items-center">
                  Erstelldatum{" "}
                  <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayList.map((dokument) => (
              <tr
                key={dokument.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  {dokument.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {dokument.titel}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {dokument.type}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatGermanDate(dokument.gueltigab)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatGermanDate(dokument.gueltigbis)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatGermanDate(dokument.erstelldatum)}
                </td>
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
                    onClick={() =>
                      handleDownloadDocument(dokument.url, dokument.titel)
                    }
                    className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                  >
                    Herunterladen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Affichage en cartes pour les petits écrans */}
      <div className="sm:hidden space-y-4">
  {displayList.map((dokument) => (
    <div
      key={dokument.id}
      className={`p-4 rounded-lg shadow-md ${
        dokument.kategorie === "Protokol"
          ? "bg-blue-100"
          : dokument.kategorie === "Rechtliches"
          ? "bg-red-100"
          : "bg-gray-100"
      }`}
    >
      <div className="text-sm text-gray-900">
        <div className="font-semibold">{dokument.titel}</div>
        <div className="text-gray-700">🗂️ {dokument.type}</div>
        <div className="text-gray-700">
          📅 Gültig: {formatGermanDate(dokument.gueltigab)} -{" "}
          {dokument.gueltigbis && formatGermanDate(dokument.gueltigbis)}
        </div>
        <div className="text-gray-700">
          🗓️ Erstelldatum: {formatGermanDate(dokument.erstelldatum)}
        </div>
        <div className="mt-4 flex space-x-2">
          {/* Bouton pour voir le document */}
          <button
            onClick={() => handleViewDocument(dokument.url)}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
          >
            👁️ Ansehen
          </button>
          {/* Bouton pour télécharger le document */}
          <button
            onClick={() =>
              handleDownloadDocument(dokument.url, dokument.titel)
            }
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 flex items-center"
          >
            Herunterladen
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Protokolle;

/*
Protokolle
• Dokumente zu Besprechungen, Entscheidungen und Protokollen des Vereins.
• Verantwortliche können Dokumente hinzufügen, liken oder kommentieren (PDF-Dateien hochladen)
*/
