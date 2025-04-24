import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { I_Dokument } from "../../types/I_Dokument";
import { fetchAllData } from "../../service/axiosFetch";
import { T_RootState } from "../../redux/store";
import { setDokumente } from "../../redux/dokumenteSlice";
import { formatGermanDate, sortList } from "../../service/service";
import { iconsListe } from "../../assets/icons/iconsListe";

const Sonstiges = () => {
  const dispatch = useDispatch();
  const dokumenteList = useSelector((state: T_RootState) => state.dokumente.list);
  const andereDokumente = dokumenteList.filter((dokument) => dokument.kategorie === "Sonstiges");
  const [sortedList, setSortedList] = useState<I_Dokument[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof I_Dokument; direction: "auf" | "ab" } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllData<I_Dokument>('/dokumente');
        dispatch(setDokumente(data)); 
        setSortedList(data);
      } catch (error) {
        console.error("Fehler beim Laden der Dokumente:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleViewDocument = (url: string) => {
    window.open(url, "_blank");
  };

  const handleDownloadDocument = (url: string, titel: string) => {
    if (!url) {
      console.error("L'URL du document est manquante ou invalide.");
      return;
    }
  
    const fileId = url.match(/\/file\/d\/([^\/]+)\//)?.[1];
    if (!fileId) {
      console.error("Impossible d'extraire l'ID du fichier depuis l'URL.");
      return;
    }
  
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = titel || "document";
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

    const sorted = sortList(andereDokumente, key, direction);
    setSortedList(sorted);
  };

  const displayList = sortConfig ? sortedList : andereDokumente;

  return (
    <div className="p-6 bg-gray-100 min-h-screen my-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Diverses</h2>

      {/* Tableau desktop */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("id")}
              >
                <div className="flex items-center">
                  ID <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("titel")}
              >
                <div className="flex items-center">
                  Titel <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("type")}
              >
                <div className="flex items-center">
                  Typ <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort("erstelldatum")}
              >
                <div className="flex items-center">
                  Erstelldatum <span className="ml-2">{iconsListe.Sortieren.icon1}</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayList.map((dokument) => (
              <tr key={dokument.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{dokument.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{dokument.titel}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{dokument.type}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{formatGermanDate(dokument.erstelldatum)}</td>
                <td className="px-6 py-4 text-sm flex items-center space-x-2">
                  <button
                    onClick={() => handleViewDocument(dokument.url)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Ansehen
                  </button>
                  <button
                    onClick={() => handleDownloadDocument(dokument.url, dokument.titel)}
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

      {/* Affichage mobile */}
      <div className="sm:hidden space-y-4">
        {displayList.map((dokument) => (
          <div
            key={dokument.id}
            className="p-4 bg-white rounded-lg shadow-md"
          >
            <div className="text-sm text-gray-900">
              <div className="font-semibold">{dokument.titel}</div>
              <div className="text-gray-700">🗂️ Typ: {dokument.type}</div>
              <div className="text-gray-700">📅 Erstelldatum: {formatGermanDate(dokument.erstelldatum)}</div>
              
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleViewDocument(dokument.url)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
                >
                  👁️ Ansehen
                </button>
                <button
                  onClick={() => handleDownloadDocument(dokument.url, dokument.titel)}
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

export default Sonstiges;