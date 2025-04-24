import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { I_Information } from "../../types/I_Information";
import { fetchAllData } from "../../service/axiosFetch";
import { T_RootState } from "../../redux/store";
import { setInformationen } from "../../redux/informationenSlice";
import { formatGermanDate } from "../../service/service";

const Informationen = () => {
  const dispatch = useDispatch();
  const informationenList = useSelector(
    (state: T_RootState) => state.informationen.list
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "important" | "inactive">("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "ereignis" | "allgemein">("all");

  // Fetch des données
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllData<I_Information>("/infos");
        dispatch(setInformationen(data));
      } catch (error) {
        console.error("Fehler beim Laden der Informationen:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // Fonction de recherche et filtre
  const filteredInfos = informationenList
    .filter(info => {
      const matchesSearch = info.titel.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          info.beschreibung.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = () => {
        switch(activeFilter) {
          case "active": 
            return info.status === "Active";
          case "important":
            return info.wichtig && info.status === "Active";
          case "inactive":
            return info.status === "Inactive";
          default:
            return true;
        }
      };

      const matchesCategory = () => {
        switch(categoryFilter) {
          case "ereignis":
            return info.kategorie === "Ereignis";
          case "allgemein":
            return info.kategorie === "Allgemein";
          default:
            return true;
        }
      };

      return matchesSearch && matchesStatus() && matchesCategory();
    })
    .sort((a, b) => new Date(b.startdatum!).getTime() - new Date(a.startdatum!).getTime());

  // Grouper par importance/statut
  const importantInfos = filteredInfos.filter(info => info.wichtig && info.status === "Active");
  const activeInfos = filteredInfos.filter(info => !info.wichtig && info.status === "Active");
  const inactiveInfos = filteredInfos.filter(info => info.status === "Inactive");

  return (
    <div className="p-6 bg-gray-100 min-h-screen my-10">
      <div className="max-w-5xl mx-auto">
        {/* Header avec titre et recherche */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span className="bg-blue-100 p-2 rounded-lg">📰</span>
            <span>Aktuelles</span>
          </h1>
          
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                🔍
              </div>
              <input
                type="text"
                placeholder="Suche nach Informationen..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-3 mb-6">
          {/* Filtres de statut */}
          <div className="flex gap-2 bg-white p-2 rounded-lg border border-gray-200">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1 rounded-lg text-sm ${activeFilter === "all" ? "bg-indigo-400 text-white" : "bg-white border border-gray-300"}`}
            >
              Alle
            </button>
            <button
              onClick={() => setActiveFilter("important")}
              className={`px-3 py-1 rounded-lg text-sm ${activeFilter === "important" ? "bg-blue-600 text-white" : "bg-white border border-gray-300"}`}
            >
              ⚠️ Wichtig
            </button>
            <button
              onClick={() => setActiveFilter("active")}
              className={`px-3 py-1 rounded-lg text-sm ${activeFilter === "active" ? "bg-green-600 text-white" : "bg-white border border-gray-300"}`}
            >
              Aktiv
            </button>
            <button
              onClick={() => setActiveFilter("inactive")}
              className={`px-3 py-1 rounded-lg text-sm ${activeFilter === "inactive" ? "bg-gray-600 text-white" : "bg-white border border-gray-300"}`}
            >
              Archiv
            </button>
          </div>

          {/* Filtres de catégorie */}
          <div className="flex gap-2 bg-white p-2 rounded-lg border border-gray-200">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${categoryFilter === "all" ? "bg-indigo-400 text-white" : "bg-white border border-gray-300"}`}
            >
              <span>📋</span>
              <span>Alle Kategorien</span>
            </button>
            <button
              onClick={() => setCategoryFilter("ereignis")}
              className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${categoryFilter === "ereignis" ? "bg-purple-600 text-white" : "bg-white border border-gray-300"}`}
            >
              <span>📅</span>
              <span>Ereignisse</span>
            </button>
            <button
              onClick={() => setCategoryFilter("allgemein")}
              className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${categoryFilter === "allgemein" ? "bg-blue-600 text-white" : "bg-white border border-gray-300"}`}
            >
              <span>ℹ️</span>
              <span>Allgemein</span>
            </button>
          </div>
        </div>

        {/* Affichage des résultats */}
        {filteredInfos.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
            <p className="text-gray-500 text-lg">🔎 Keine Informationen gefunden</p>
            {(searchTerm || activeFilter !== "all" || categoryFilter !== "all") && (
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("all");
                  setCategoryFilter("all");
                }}
                className="mt-4 text-blue-600 hover:text-blue-800 text-sm"
              >
                Alle Filter zurücksetzen
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Section des informations importantes */}
            {importantInfos.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
                  <span className="bg-blue-100 p-1.5 rounded-lg">⚠️</span>
                  <span>Wichtige Informationen</span>
                </h2>
                <div className="flex flex-wrap gap-4">
                  {importantInfos.map((info) => (
                    <div className="w-full md:w-[calc(50%-0.5rem)]">
                      <InfoCard key={info.id} info={info} isImportant={true} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section des informations actives */}
            {activeInfos.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
                  <span className="bg-blue-100 p-1.5 rounded-lg">📌</span>
                  <span>Aktuelle Informationen</span>
                </h2>
                <div className="grid gap-4">
                  {activeInfos.map((info) => (
                    <InfoCard key={info.id} info={info} isImportant={false} />
                  ))}
                </div>
              </section>
            )}

            {/* Section des informations archivées */}
            {inactiveInfos.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-500 flex items-center gap-2">
                  <span className="bg-gray-100 p-1.5 rounded-lg">🗄️</span>
                  <span>Archivierte Informationen</span>
                </h2>
                <div className="grid gap-4">
                  {inactiveInfos.map((info) => (
                    <InfoCard key={info.id} info={info} isImportant={false} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Composant de carte d'information amélioré
const InfoCard = ({ info, isImportant }: { info: I_Information; isImportant: boolean }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-xl shadow-sm overflow-hidden border transition-all duration-200 hover:shadow-md ${
        isImportant
          ? "bg-blue-50 border-blue-100 hover:border-blue-200"
          : info.status === "Inactive"
          ? "border-gray-200 hover:border-gray-300"
          : "border-blue-100 hover:border-blue-200"
      }`}
    >
      <div
        className="p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                info.kategorie === "Ereignis" 
                  ? "bg-purple-100 text-purple-800"
                  : "bg-blue-100 text-blue-800"
              }`}>
                {info.kategorie === "Ereignis" ? "📅 Ereignis" : "ℹ️ Allgemein"}
              </span>
              {info.wichtig && !isImportant && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ⚠️ Wichtig
                </span>
              )}
              {info.status === "Inactive" && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  🗄️ Archiv
                </span>
              )}
            </div>
            
            <h3 className="font-bold text-lg text-gray-800 mb-1">{info.titel}</h3>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mt-2">
              {info.startdatum && (
                <span className="flex items-center">
                  📅 <span className="ml-1">{formatGermanDate(info.startdatum)}</span>
                </span>
              )}
              {info.ort && (
                <span className="flex items-center">
                  📍 <span className="ml-1">{info.ort}</span>
                </span>
              )}
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            {expanded ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 pt-0 animate-fadeIn">
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-700 mb-4 whitespace-pre-line">{info.beschreibung}</p>
            
            <div className="flex flex-wrap gap-3 text-sm">
              {info.startdatum && info.enddatum && (
                <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  📅 <span className="ml-1">{formatGermanDate(info.startdatum)} bis {formatGermanDate(info.enddatum)}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Informationen;