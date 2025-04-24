import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { I_Dokument } from "../../types/I_Dokument";
import { closeModal } from "../../redux/modalSlice";
import { T_RootState } from '../../redux/store';
import { dataErstellen, dataAendern, fetchAllData } from "../../service/axiosFetch";
import { addDokument, setDokumente, updateDokument } from "../../redux/dokumenteSlice";

const DokumentModal = () => {
  const dispatch = useDispatch();
  const { titel, aendern } = useSelector((state: T_RootState) => state.modal);
  const userid = useSelector((state : T_RootState) => state.auth.userState.user!.id as number)

  // Ne pas afficher la modal si le titre n'est pas "Dokument"
  if (titel !== "Dokument") return null;

  // État local pour gérer les données du formulaire
  const [neuesDokument, setNeuesDokument] = useState<I_Dokument>(
    aendern
      ? (aendern as I_Dokument)
      : {
          id: 0, // Ajout de l'ID avec une valeur par défaut
          senderid: userid,
          titel: "",
          kategorie: "Protokol",
          type: "PDF",
          gueltigbis: "",
          gueltigab: new Date().toISOString(),
          erstelldatum: new Date().toISOString(),
          url: "",
        }
  );

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNeuesDokument({ ...neuesDokument, [name]: value });
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (aendern) {
        // Mettre à jour le document existant
        const updatedDokument = await dataAendern<I_Dokument>("/dokumente/", neuesDokument.id, neuesDokument);
        dispatch(updateDokument(updatedDokument));
      } else {
        // Créer un nouveau document
        const neuesD = await dataErstellen<I_Dokument>("/dokumente/", neuesDokument);
        dispatch(addDokument(neuesD));
      }

      // Rafraîchir les données depuis l'API
      const updatedData = await fetchAllData<I_Dokument>("/dokumente");
      dispatch(setDokumente(updatedData));

      // Fermer la modal
      dispatch(closeModal());
    } catch (error) {
      console.error("Fehler:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* En-tête de la modal */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {aendern ? "Dokument bearbeiten" : "Neues Dokument hinzufügen"}
          </h2>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            {/* Champ Titel */}
            <div>
              <label htmlFor="titel" className="block text-sm font-medium text-gray-700 mb-1">
                Titel
              </label>
              <input
                type="text"
                id="titel"
                name="titel"
                placeholder="Titel"
                value={neuesDokument.titel}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

             {/* Champ Kategorie */}
             <div>
              <label htmlFor="kategorie" className="block text-sm font-medium text-gray-700 mb-1">
                Kategorie
              </label>
              <select
                id="kategorie"
                name="kategorie"
                value={neuesDokument.kategorie}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Protokol">Protokol</option>
                <option value="Rechtliches">Rechtliches</option>
                <option value="Sonstiges">Sonstiges</option>
              </select>
            </div>

            {/* Champ Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Typ
              </label>
              <select
                id="type"
                name="type"
                value={neuesDokument.type}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="PDF">PDF</option>
                <option value="Word">Word</option>
                <option value="Bild">Bild</option>
              </select>
            </div>

{/* Champ Bild (affiché uniquement si le type est "Bild") */}
{neuesDokument.type === "Bild" && (
              <div>
                <label htmlFor="bild" className="block text-sm font-medium text-gray-700 mb-1">
                  Bildtyp
                </label>
                <select
                  id="bild"
                  name="bild"
                  value={neuesDokument.bild || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Bildtyp auswählen</option>
                  <option value="JPG">JPG</option>
                  <option value="PNG">PNG</option>
                </select>
              </div>
            )}

           

            {/* Champ Gültig bis */}
            <div>
              <label htmlFor="gueltigbis" className="block text-sm font-medium text-gray-700 mb-1">
                Gültig bis (optional)
              </label>
              <input
                type="date"
                id="gueltigbis"
                name="gueltigbis"
                value={neuesDokument.gueltigbis || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Champ Gültig ab */}
            <div>
              <label htmlFor="gueltigab" className="block text-sm font-medium text-gray-700 mb-1">
                Gültig ab
              </label>
              <input
                type="date"
                id="gueltigab"
                name="gueltigab"
                value={neuesDokument.gueltigab || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Champ URL */}
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <input
                type="url"
                id="url"
                name="url"
                placeholder="URL"
                value={neuesDokument.url}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => dispatch(closeModal())}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {aendern ? "Speichern" : "Erstellen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default DokumentModal;