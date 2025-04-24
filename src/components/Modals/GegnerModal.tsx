import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { I_Verein } from "../../types/I_Verein";
import { dataErstellen, dataAendern, fetchAllData, fetchTrainer } from "../../service/axiosFetch";
import { setGegnerVereine } from "../../redux/vereinSlice";
import { T_RootState } from "../../redux/store";
import { einAdmin, einTrainer, formatTelefon, validateTelefon } from "../../service/service";
import { I_Benutzer } from "../../types/I_Benutzer";
import { setTrainerListSlice } from "../../redux/benutzerSlice";

interface GegnerModalProps {
  selectedTeam: I_Verein | null;
  onClose: () => void;
  gegner: I_Verein;
}

const GegnerModal = ({ selectedTeam, onClose, gegner }: GegnerModalProps) => {
  const dispatch = useDispatch();
  const userIch = useSelector((state : T_RootState) => state.auth.userState.user!)
  const [trainerList, setTrainerList] = useState<I_Benutzer[]>([]);
  const [telefonError, setTelefonError] = useState("");
  const trainerListTemp = useSelector(
    (state: T_RootState) => state.benutzer.trainerList
  );

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
    
  // Lokaler Zustand für das Formular
  const [neuerGegner, setNeuerGegner] = useState<I_Verein>(
    gegner
      ? { ...gegner }
      : {
          id: 0,
          name: "",
          trainername: "", // Neues Feld für den Namen des Trainers
          coachid: einTrainer(userIch) ? userIch.id : 0,
          istGegner: true, // Assurez-vous que istGegner est toujours vrai
          telefon: "", // Ajoutez une valeur par défaut
          email: "", // Ajoutez une valeur par défaut
          adresse: "", // Ajoutez une valeur par défaut
          beschreibung: "", // Ajoutez une valeur par défaut
          zusatzinformation: "", // Ajoutez une valeur par défaut
          regeln: "", // ID des ausgewählten Teams hinzufügen
          gegnerid: selectedTeam ? selectedTeam.id : undefined,
        }
  );

  // Behandlung von Änderungen in den Formularfeldern
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === "telefon") {
          // Valider et formater le numéro de téléphone
          const formattedTelefon = formatTelefon(value);
          const isValid = validateTelefon(formattedTelefon);
    
          setNeuerGegner({ ...neuerGegner, [name]: formattedTelefon });
          setTelefonError(isValid ? "" : "Ungültige Telefonnummer");
        } else {
          setNeuerGegner({ ...neuerGegner, [name]: value });
        }
        
  };

  // Formularübermittlung
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // S'assurer que istGegner est vrai lors de la création d'un nouvel adversaire
      const formData = { ...neuerGegner, istGegner: true };

      if (gegner) {
        // Bestehenden Gegner aktualisieren
        await dataAendern<I_Verein>("/vereine/", formData.id!, formData);
      } else {
        // Neuen Gegner erstellen
        await dataErstellen<I_Verein>("/vereine/", formData);
      }

      // Daten von der API aktualisieren
      const updatedData = await fetchAllData<I_Verein>("/vereine");
      dispatch(setGegnerVereine(updatedData.filter((verein) => verein.istGegner)));

      // Modal schließen
      onClose();
    } catch (error) {
      console.error("Fehler:", error);
    }
  };

  const handleCoachChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const coachid = parseInt(e.target.value, 10);
  
    // Trouver le coach sélectionné dans la liste des coachs
    const selectedCoach = trainerList.find((trainer) => trainer.id === coachid);
  
    if (selectedCoach) {
      // Mettre à jour neuerVerein avec l'ID du coach et son nom complet
      setNeuerGegner({
        ...neuerGegner,
        coachid: selectedCoach.id,
        trainername: `${selectedCoach.vorname} ${selectedCoach.nachname}`,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {gegner ? "Gegner bearbeiten" : "Neuen Gegner hinzufügen"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[700px] overflow-y-auto">
          {/* Feld für den Namen */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name des Teams *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={neuerGegner.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Feld für den Namen des Trainers */}
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
                value={neuerGegner.coachid}
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

          {/* Feld für den Namen des Trainers */}
       {einTrainer(userIch) ? <div>
            <label htmlFor="trainername" className="block text-sm font-medium text-gray-700">
              Name des Trainers
            </label>
            <input required
              type="text"
              id="trainername"
              name="trainername"
              value={neuerGegner.trainername}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> : null}   

          {/* Feld für die Telefonnummer */}
          <div>
            <label htmlFor="telefon" className="block text-sm font-medium text-gray-700">
              Telefon (optional)
            </label>
            <input
              type="text"
              id="telefon"
              name="telefon"
              value={neuerGegner.telefon}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {telefonError && (
                <p className="text-sm text-red-500 mt-1">{telefonError}</p>
              )}
          </div>

          {/* Feld für die E-Mail-Adresse */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-Mail (optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={neuerGegner.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Feld für die Adresse */}
          <div>
            <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
              Adresse (optional)
            </label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              value={neuerGegner.adresse}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Feld für die Beschreibung */}
          <div>
            <label htmlFor="beschreibung" className="block text-sm font-medium text-gray-700">
              Beschreibung (optional)
            </label>
            <textarea
              id="beschreibung"
              name="beschreibung"
              value={neuerGegner.beschreibung}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          {/* Aktionsbuttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {gegner ? "Speichern" : "Erstellen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GegnerModal;
