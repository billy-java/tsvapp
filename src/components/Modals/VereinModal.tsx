// src/components/Modals/VereinModal.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { I_Verein } from "../../types/I_Verein";
import { closeModal } from "../../redux/modalSlice";
import { T_RootState } from "../../redux/store";
import { dataErstellen, dataAendern, fetchAllData, fetchTrainer, updateTeamCoach  } from "../../service/axiosFetch";
import { setUnsereVereine } from "../../redux/vereinSlice";
import { einAdmin, formatTelefon, validateTelefon } from "../../service/service"; // Importez les fonctions nécessaires
import { I_Benutzer } from "../../types/I_Benutzer";
import { setTrainerListSlice } from "../../redux/benutzerSlice";

const VereinModal = () => {
  const dispatch = useDispatch();
  const { titel, aendern } = useSelector((state: T_RootState) => state.modal);
  const userIch = useSelector((state : T_RootState) => state.auth.userState.user!)
  const trainerListTemp = useSelector(
    (state: T_RootState) => state.benutzer.trainerList
  );
  const [trainerList, setTrainerList] = useState<I_Benutzer[]>(trainerListTemp || []);
  const [altTrainerId, setAltTrainerId] = useState<number | null>(null)

  if (titel !== "Verein") return null;

  useEffect(() => {
    const fetchData = async () => {
      try {
          const trainer = await fetchTrainer();
            setTrainerList(trainer);
            dispatch(setTrainerListSlice(trainer));
    
      } catch (error) {
        console.error("Fehler beim Laden der Vereinsdaten:", error);
      }
    };
    
   
      fetchData();
  }, [dispatch, trainerListTemp.length]);

  

  const [neuerVerein, setNeuerVerein] = useState<I_Verein>(
    aendern
      ? (aendern as I_Verein)
      : {
          id: 0,
          name: "",
          trainername: userIch.nachname + " " + userIch.vorname,
          coachid: userIch.id,
          istGegner: false,
          telefon: "", // Ajoutez une valeur par défaut
        email: "", // Ajoutez une valeur par défaut
        adresse: "", // Ajoutez une valeur par défaut
        beschreibung: "", // Ajoutez une valeur par défaut
        zusatzinformation: "", // Ajoutez une valeur par défaut
        regeln: "",
        }
  );

  useEffect(() => {
    if(neuerVerein  && neuerVerein.coachid) {
      setAltTrainerId(neuerVerein.coachid)
    } else return;
    
  }, []);

 


  const [telefonError, setTelefonError] = useState(""); // État pour gérer les erreurs de téléphone

  const handleCoachChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const coachid = parseInt(e.target.value, 10);

    // Trouver le coach sélectionné dans la liste des coachs
    const selectedCoach = trainerList.find((trainer) => trainer.id === coachid);
  
    if (selectedCoach) { 
      // Mettre à jour neuerVerein avec l'ID du coach et son nom complet
      setNeuerVerein({
        ...neuerVerein,
        coachid: selectedCoach.id,
        trainername: `${selectedCoach.vorname} ${selectedCoach.nachname}`,
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    

    const { name, value } = e.target;

    if (name === "telefon") {
      // Valider et formater le numéro de téléphone
      const formattedTelefon = formatTelefon(value);
      const isValid = validateTelefon(formattedTelefon);

      setNeuerVerein({ ...neuerVerein, [name]: formattedTelefon });
      setTelefonError(isValid ? "" : "Ungültige Telefonnummer");
    } else {
      setNeuerVerein({ ...neuerVerein, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!einAdmin(userIch)){
      setNeuerVerein({
      ...neuerVerein,
      coachid: userIch.id,
      trainername: `${userIch.vorname} ${userIch.nachname}`,
    });
    }
    
   
   

    try {
      if (aendern) {
        // Mettre à jour le Verein existant
        await dataAendern<I_Verein>("/m/", neuerVerein.id!, neuerVerein);

        if(altTrainerId  && altTrainerId !== neuerVerein.coachid) {
          updateTeamCoach (neuerVerein.id, altTrainerId, neuerVerein.coachid as number)
        }

      } else {
        // Créer un nouveau Verein
        await dataErstellen<I_Verein>("/vereine/", neuerVerein);
      }

      // Rafraîchir les données depuis l'API
      const updatedData = (await fetchAllData<I_Verein>('/vereine')).filter((verein) => !verein.istGegner);
      dispatch(setUnsereVereine(updatedData));

      // Fermer la modal
      dispatch(closeModal());
    } catch (error) {
      console.error("Fehler:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        {/* En-tête de la modal */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {aendern ? "Verein bearbeiten" : "Neuen Verein hinzufügen"}
          </h2>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 max-h-[700px] overflow-y-auto"
        >
          <div className="space-y-4">
            {/* Champ Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name des Vereins
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Vereinsname"
                value={neuerVerein.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Champ Telefon */}
            <div>
              <label
                htmlFor="telefon"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Telefon (optional)
              </label>
              <input
                type="text"
                id="telefon"
                name="telefon"
                placeholder="Telefon (z.B. +49 123 456789)"
                value={neuerVerein.telefon}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {telefonError && (
                <p className="text-sm text-red-500 mt-1">{telefonError}</p>
              )}
            </div>

            {/* Champ Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                E-Mail (optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="E-Mail"
                value={neuerVerein.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                
              />
            </div>

            {/* Champ Adresse */}
            <div>
              <label
                htmlFor="adresse"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Adresse (optional)
              </label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                placeholder="Adresse"
                value={neuerVerein.adresse}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Champ Coach */}
          {einAdmin(userIch) ? <div>
              <label
                htmlFor="coachid"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Trainer
              </label>
              <select
                id="coachid"
                name="coachid"
                value={neuerVerein.coachid}
                onChange={handleCoachChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Wählen Sie einen Coach</option>
                {trainerList.map((trainer) => (
                  <option key={trainer.id} value={trainer.id}>
                    {trainer.nachname} {trainer.vorname}
                  </option>
                ))}
              </select>
            </div> : null}  

            {/* Champ Geschichte */}
            <div>
              <label
                htmlFor="beschreibung"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Beschreibung
              </label>
              <textarea
                id="beschreibung"
                name="beschreibung"
                placeholder="Geschichte des Vereins"
                value={neuerVerein.beschreibung}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            {/* Champ Mission */}
            <div>
              <label
                htmlFor="zusatzinformation"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Zusatzinformation
              </label>
              <textarea
                id="zusatzinformation"
                name="zusatzinformation"
                placeholder="zB: Wir haben eine Rasenplatz, eine Kunstrase und einen Hartplatz"
                value={neuerVerein.zusatzinformation}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            {/* Champ Werte */}
            <div>
              <label
                htmlFor="regeln"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Regeln
              </label>
              <textarea
                id="regeln"
                name="regeln"
                placeholder="Werte des Vereins"
                value={neuerVerein.regeln}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
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

export default VereinModal;