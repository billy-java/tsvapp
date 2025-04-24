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

  if (titel !== "Benutzer") return null;

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
  const [showPasswordFields, setShowPasswordFields] = useState(false); // Nouvel état pour afficher/masquer les champs de mot de passe

  const [telefonError, setTelefonError] = useState("");
  const [globalError, setGlobalError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "telefon") {
      const formattedTelefon = formatTelefon(value);
      const isValid = validateTelefon(formattedTelefon);
      setNeuerBenutzer({ ...neuerBenutzer, [name]: formattedTelefon });
      setTelefonError(isValid ? "" : "Ungültige Telefonnummer");
    } else {
      setNeuerBenutzer({ ...neuerBenutzer, [name]: value });
    }
  };

  const handlePasswortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswort(value);
    setPasswortError(validatePassword(value));
  };

  const handlePasswortConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswortConfirm(value);
    setPasswortConfirmError(value !== passwort ? "Die Passwörter stimmen nicht überein." : "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Si on modifie le mot de passe, valider les champs
    if (showPasswordFields && (passwortError || passwortConfirmError || passwort !== passwortConfirm)) {
      setPasswortConfirmError("Bitte korrigieren Sie die Passwortfehler.");
      return;
    }

    if (neuerBenutzer.telefon && !validateTelefon(neuerBenutzer.telefon)) {
      setTelefonError("Ungültige Telefonnummer");
      return;
    }

    try {
      const userData = { ...neuerBenutzer };
      
      // Si on modifie le mot de passe, l'ajouter aux données
      if (showPasswordFields && passwort) {
        userData.passwort = passwort;
      }

      if (aendern) {
        const neuerB = await dataAendern<I_Benutzer>("/benutzer/", neuerBenutzer.id!, userData);
        dispatch(updateUser(neuerB));
      } else {
        // Pour la création, le mot de passe est obligatoire
        if (!passwort) {
          setPasswortError("Passwort ist erforderlich");
          return;
        }
        const neuerB = await dataErstellen<I_Benutzer>("/benutzer/registrieren", {
          ...neuerBenutzer,
          passwort: passwort,
        });
        dispatch(addUser(neuerB));
      }

      const updatedData = await fetchAllData<I_Benutzer>("/benutzer");
      dispatch(setUsers(updatedData));
      dispatch(closeModal());
    } catch (error: any) {
      console.error("Fehler:", error);
      if (error.response?.status === 409) {
        setGlobalError("Diese E-Mail wird bereits verwendet.");
      } else {
        setGlobalError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {aendern ? "Benutzer bearbeiten" : "Neuen Benutzer hinzufügen"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
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
              {telefonError && <p className="text-sm text-red-500 mt-1">{telefonError}</p>}
            </div>

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

            {/* Bouton pour afficher/masquer les champs de mot de passe (uniquement en mode édition) */}
            {aendern && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="togglePasswordChange"
                  checked={showPasswordFields}
                  onChange={() => setShowPasswordFields(!showPasswordFields)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="togglePasswordChange" className="text-sm text-gray-700">
                  Passwort ändern
                </label>
              </div>
            )}

            {/* Champs de mot de passe (toujours visibles pour la création, conditionnels pour l'édition) */}
            {(!aendern || showPasswordFields) && (
              <>
                <div>
                  <label htmlFor="passwort" className="block text-sm font-medium text-gray-700 mb-1">
                    {aendern ? "Neues Passwort" : "Passwort"}
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="passwort"
                    name="passwort"
                    placeholder={aendern ? "Neues Passwort" : "Passwort"}
                    value={passwort}
                    onChange={handlePasswortChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={!aendern}
                  />
                  {passwortError && <p className="text-sm text-red-500 mt-1">{passwortError}</p>}
                </div>

                <div>
                  <label htmlFor="passwortConfirm" className="block text-sm font-medium text-gray-700 mb-1">
                    {aendern ? "Neues Passwort bestätigen" : "Passwort bestätigen"}
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="passwortConfirm"
                    name="passwortConfirm"
                    placeholder={aendern ? "Neues Passwort bestätigen" : "Passwort bestätigen"}
                    value={passwortConfirm}
                    onChange={handlePasswortConfirmChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={!aendern}
                  />
                  {passwortConfirmError && <p className="text-sm text-red-500 mt-1">{passwortConfirmError}</p>}
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

          {globalError && (
            <div className="mt-4 p-3 text-sm text-red-600 bg-red-100 border border-red-400 rounded">
              {globalError}
            </div>
          )}

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