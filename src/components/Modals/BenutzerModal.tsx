// src/components/Modals/BenutzerModal.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { I_Benutzer } from "../../types/I_Benutzer";
import { closeModal } from "../../redux/modalSlice";
import { T_RootState } from "../../redux/store";
import { dataErstellen, dataAendern, fetchAllData } from "../../service/axiosFetch";
import { addUser, setUsers, updateUser } from "../../redux/benutzerSlice";
import { formatTelefon, validatePassword, validateTelefon } from "../../service/service";


const BenutzerModal = () => {
  const dispatch = useDispatch();
  const { titel, aendern } = useSelector((state: T_RootState) => state.modal);

  // Ne pas afficher la modal si le titre n'est pas "Benutzer"
  if (titel !== "Benutzer") return null;

  // État local pour gérer les données du formulaire
  const [neuerBenutzer, setNeuerBenutzer] = useState<I_Benutzer>(
    aendern
      ? (aendern as I_Benutzer)
      : { nachname: "", vorname: "", email: "", telefon: "", rolle: "Normal", passwort: "" }
  );

  // États pour la gestion des mots de passe
  const [passwort, setPasswort] = useState("");
  const [passwortConfirm, setPasswortConfirm] = useState("");
  const [passwortError, setPasswortError] = useState("");
  const [passwortConfirmError, setPasswortConfirmError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // États pour la gestion du numéro de téléphone
  const [telefonError, setTelefonError] = useState("");

  // État pour gérer les erreurs globales
  const [globalError, setGlobalError] = useState("");

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "telefon") {
      // Valider et formater le numéro de téléphone
      const formattedTelefon = formatTelefon(value);
      const isValid = validateTelefon(formattedTelefon);

      setNeuerBenutzer({ ...neuerBenutzer, [name]: formattedTelefon });
      setTelefonError(isValid ? "" : "Ungültige Telefonnummer");
    } else {
      setNeuerBenutzer({ ...neuerBenutzer, [name]: value });
    }
  };

  // Gérer les changements dans le champ de mot de passe
  const handlePasswortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswort(value);
    setPasswortError(validatePassword(value));
  };

  // Gérer les changements dans le champ de confirmation de mot de passe
  const handlePasswortConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswortConfirm(value);
    if (value !== passwort) {
      setPasswortConfirmError("Die Passwörter stimmen nicht überein.");
    } else {
      setPasswortConfirmError("");
    }
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier les erreurs de mot de passe
    if (passwortError || passwortConfirmError || passwort !== passwortConfirm) {
      setPasswortConfirmError("Bitte korrigieren Sie die Passwortfehler.");
      return;
    }

    // Vérifier les erreurs de numéro de téléphone
    if (neuerBenutzer.telefon && !validateTelefon(neuerBenutzer.telefon)) {
      setTelefonError("Ungültige Telefonnummer");
      return;
    }

    try {
      if (aendern) {
        // Mettre à jour l'utilisateur existant
        const neuerB = await dataAendern<I_Benutzer>("/benutzer/", neuerBenutzer.id!, neuerBenutzer);
        dispatch(updateUser(neuerB));
      } else {
        // Créer un nouvel utilisateur
        const neuerB = await dataErstellen<I_Benutzer>("/benutzer/registrieren", {
          ...neuerBenutzer,
          passwort: passwort, // Utiliser le mot de passe validé
        });
        dispatch(addUser(neuerB));
      }

      // Rafraîchir les données depuis l'API
      const updatedData = await fetchAllData<I_Benutzer>("/benutzer");
      dispatch(setUsers(updatedData));

      // Fermer la modal
      dispatch(closeModal());
    } catch (error: unknown) {
      console.error("Fehler:", error);
      if (error instanceof Error && 'response' in error && error.response && (error.response as any).status === 409) {
        setGlobalError("Diese E-Mail wird bereits verwendet.");
      } else {
        setGlobalError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* En-tête de la modal */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {aendern ? "Benutzer bearbeiten" : "Neuen Benutzer hinzufügen"}
          </h2>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            {/* Champ Nachname */}
            <div>
              <label htmlFor="nachname" className="block text-sm font-medium text-gray-700 mb-1">
                Nachname
              </label>
              <input
                type="text"
                id="nachname"
                name="nachname"
                placeholder="Nachname"
                value={neuerBenutzer.nachname}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Champ Vorname */}
            <div>
              <label htmlFor="vorname" className="block text-sm font-medium text-gray-700 mb-1">
                Vorname
              </label>
              <input
                type="text"
                id="vorname"
                name="vorname"
                placeholder="Vorname"
                value={neuerBenutzer.vorname}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Champ Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-Mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="E-Mail"
                value={neuerBenutzer.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Champ Telefon */}
            <div>
              <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1">
                Telefon (optional)
              </label>
              <input
                type="text"
                id="telefon"
                name="telefon"
                placeholder="Telefon (z.B. +49 123 456789)"
                value={neuerBenutzer.telefon}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {telefonError && (
                <p className="text-sm text-red-500 mt-1">{telefonError}</p>
              )}
            </div>

            {/* Champ Rolle */}
            <div>
              <label htmlFor="rolle" className="block text-sm font-medium text-gray-700 mb-1">
                Rolle
              </label>
              <select
                id="rolle"
                name="rolle"
                value={neuerBenutzer.rolle}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Administrator">Administrator</option>
                <option value="Trainer">Trainer</option>
                <option value="Normal">Normal</option>
              </select>
            </div>

            {/* Champ Passwort (uniquement pour la création) */}
            {!aendern && (
              <>
                <div>
                  <label htmlFor="passwort" className="block text-sm font-medium text-gray-700 mb-1">
                    Passwort
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="passwort"
                    name="passwort"
                    placeholder="Passwort"
                    value={passwort}
                    onChange={handlePasswortChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {passwortError && (
                    <p className="text-sm text-red-500 mt-1">{passwortError}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="passwortConfirm" className="block text-sm font-medium text-gray-700 mb-1">
                    Passwort bestätigen
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="passwortConfirm"
                    name="passwortConfirm"
                    placeholder="Passwort bestätigen"
                    value={passwortConfirm}
                    onChange={handlePasswortConfirmChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {passwortConfirmError && (
                    <p className="text-sm text-red-500 mt-1">{passwortConfirmError}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="showPassword" className="text-sm text-gray-700">
                    Passwort anzeigen
                  </label>
                </div>
              </>
            )}
          </div>


{globalError && <div className="mt-4 p-3 text-sm text-red-600 bg-red-100 border border-red-400 rounded">
    {globalError}
  </div>}

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

export default BenutzerModal;