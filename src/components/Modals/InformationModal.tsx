import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { I_Information } from "../../types/I_Information"; // Mise à jour de l'import
import { closeModal } from "../../redux/modalSlice";
import { T_RootState } from "../../redux/store";
import { dataErstellen, dataAendern, fetchAllData } from "../../service/axiosFetch";
import { addInformation, setInformationen, updateInformation } from "../../redux/informationenSlice"; // Mise à jour des actions

const InformationModal = () => {
  const dispatch = useDispatch();
  const { titel, aendern } = useSelector((state: T_RootState) => state.modal);
  const userid = useSelector((state : T_RootState) => state.auth.userState.user!.id as number)

  // Ne pas afficher la modal si le titre n'est pas "Information"
  if (titel !== "Information") return null;

  // État local pour gérer les données du formulaire
  const [neueInformation, setNeueInformation] = useState<I_Information>(
    aendern
      ? (aendern as I_Information)
      : {
          senderId: userid, // Valeur par défaut, à adapter selon votre logique
          titel: "",
          beschreibung: "",
          kategorie: "Allgemein",
          startdatum: "",
          enddatum: "",
          ort: "",
          wichtig: false,
          status: "Active",
        }
  );

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNeueInformation({ ...neueInformation, [name]: value });
  };

  // Gérer la case à cocher pour l'attribut "wichtig"
  const handleWichtigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNeueInformation({ ...neueInformation, wichtig: e.target.checked });
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (aendern) {
        // Mettre à jour l'information existante
        const updatedInformation = await dataAendern<I_Information>("/infos/", neueInformation.id!, neueInformation);
        dispatch(updateInformation(updatedInformation));
      } else {
        // Créer une nouvelle information
        const neueInfo = await dataErstellen<I_Information>("/infos/", neueInformation);
        dispatch(addInformation(neueInfo));
      }

      // Rafraîchir les données depuis l'API
      const updatedData = await fetchAllData<I_Information>("/infos");
      dispatch(setInformationen(updatedData));

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
            {aendern ? "Information bearbeiten" : "Neue Information hinzufügen"}
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
                value={neueInformation.titel}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Champ Beschreibung */}
            <div>
              <label htmlFor="beschreibung" className="block text-sm font-medium text-gray-700 mb-1">
                Beschreibung
              </label>
              <textarea
                id="beschreibung"
                name="beschreibung"
                placeholder="Beschreibung"
                value={neueInformation.beschreibung}
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
                value={neueInformation.kategorie}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Allgemein">Allgemein</option>
                <option value="Ereignis">Ereignis</option>
              </select>
            </div>

            {/* Champ Startdatum */}
            {neueInformation.kategorie === "Ereignis" && (
              <>
                <div>
                  <label htmlFor="startdatum" className="block text-sm font-medium text-gray-700 mb-1">
                    Startdatum
                  </label>
                  <input
                    type="datetime-local"
                    id="startdatum"
                    name="startdatum"
                    value={neueInformation.startdatum}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    
                  />
                </div>

                {/* Champ Enddatum */}
                <div>
                  <label htmlFor="enddatum" className="block text-sm font-medium text-gray-700 mb-1">
                    Enddatum (optional)
                  </label>
                  <input
                    type="datetime-local"
                    id="enddatum"
                    name="enddatum"
                    value={neueInformation.enddatum || ""}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Champ Ort */}
                <div>
                  <label htmlFor="ort" className="block text-sm font-medium text-gray-700 mb-1">
                    Ort
                  </label>
                  <input required
                    type="text"
                    id="ort"
                    name="ort"
                    placeholder="Ort"
                    value={neueInformation.ort || ""}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}


            {/* Case à cocher "Wichtig" */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="wichtig"
                name="wichtig"
                checked={neueInformation.wichtig || false}
                onChange={handleWichtigChange}
                className="mr-2"
              />
              <label htmlFor="wichtig" className="text-sm text-gray-700">Wichtig</label>
            </div>

            {/* Champ Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select required
                id="status"
                name="status"
                value={neueInformation.status || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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

export default InformationModal;
