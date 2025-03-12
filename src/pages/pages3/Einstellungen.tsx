// src/pages/einstellungen.tsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { T_RootState } from "../../redux/store";
import { dataAendern, passwortAendern } from "../../service/axiosFetch";
import { setUserEinstellungen } from "../../redux/authSlice";
import { I_Benutzer } from "../../types/I_Benutzer";
import { updateUser } from "../../redux/benutzerSlice";

const Einstellungen = () => {
  const dispatch = useDispatch();
  const benutzer = useSelector((state: T_RootState) => state.auth.userState.user);
  const [showProfilForm, setShowProfilForm] = useState(false);
  const [showPasswortForm, setShowPasswortForm] = useState(false);
  const [showBenachrichtigungenForm, setShowBenachrichtigungenForm] = useState(false);

  // États pour le formulaire de profil
  const [newBenutzer, setNewBenutzer] = useState<I_Benutzer>({...benutzer!});

  // États pour le formulaire de changement de mot de passe
  const [aktuellesPasswort, setAktuellesPasswort] = useState("");
  const [neuesPasswort, setNeuesPasswort] = useState("");
  const [neuesPasswortBestätigen, setNeuesPasswortBestätigen] = useState("");
  
  const [pushNotifications, setPushNotifications] = useState(false);

  if(!newBenutzer && !benutzer) {
    return null;
  }

  if(!newBenutzer && benutzer) {
    return <div>Loading...</div>;
  }


  // Soumettre le formulaire de profil
  const handleProfilSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (newBenutzer && newBenutzer.id) {
const neuerB = await dataAendern<I_Benutzer>("/benutzer/", newBenutzer.id!, newBenutzer);
        dispatch(updateUser(neuerB));
        dispatch(setUserEinstellungen(neuerB)); // Mettre à jour l'état Redux
        setShowProfilForm(false); // Masquer le formulaire après la mise à jour
      }
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Profils:", error);
    }
  };

  // Soumettre le formulaire de changement de mot de passe
  const handlePasswortSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (neuesPasswort !== neuesPasswortBestätigen) {
      alert("Die neuen Passwörter stimmen nicht überein.");
      return;
    }
    try {
      if (newBenutzer && newBenutzer.id) {
        await passwortAendern(newBenutzer.id, aktuellesPasswort, neuesPasswort);
        setShowPasswortForm(false); // Masquer le formulaire après la mise à jour
        alert("Passwort erfolgreich geändert.");
      }
    } catch (error) {
      console.error("Fehler beim Ändern des Passworts:", error);
    }
  };

  // Soumettre le formulaire de préférences de notifications
  const handleBenachrichtigungenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (benutzer?.id) {
        /*await dataAendern("/benutzer/benachrichtigungen", benutzer.id, {
          emailNotifications,
          pushNotifications,
        });*/
        setShowBenachrichtigungenForm(false); // Masquer le formulaire après la mise à jour
        alert("Benachrichtigungseinstellungen erfolgreich gespeichert.");
      }
    } catch (error) {
      console.error("Fehler beim Speichern der Benachrichtigungseinstellungen:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen my-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Einstellungen</h1>

      {/* Section Profil */}
      <div className="mb-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Profil</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vorname</label>
            <p className="text-gray-900">{benutzer?.vorname}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nachname</label>
            <p className="text-gray-900">{benutzer?.nachname}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
            <p className="text-gray-900">{benutzer?.email}</p>
          </div>
          <button
            onClick={() => setShowProfilForm(!showProfilForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {showProfilForm ? "Abbrechen" : "Profil bearbeiten"}
          </button>
          {showProfilForm && (
            <form onSubmit={handleProfilSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vorname</label>
                <input
                  type="text"
                  value={newBenutzer?.vorname || ""}
                  onChange={(e) => setNewBenutzer({ ...newBenutzer!, vorname: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nachname</label>
                <input
                  type="text"
                  value={newBenutzer?.nachname || ""}
                  onChange={(e) => setNewBenutzer({ ...newBenutzer!, nachname: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                <input
                  type="email"
                  value={newBenutzer?.email || ""}
                  onChange={(e) => setNewBenutzer({ ...newBenutzer!, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Speichern
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Section Passwort ändern */}
      <div className="mb-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Passwort ändern</h2>
        <button
          onClick={() => setShowPasswortForm(!showPasswortForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showPasswortForm ? "Abbrechen" : "Passwort ändern"}
        </button>
        {showPasswortForm && (
          <form onSubmit={handlePasswortSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aktuelles Passwort</label>
              <input
                type="password"
                value={aktuellesPasswort}
                onChange={(e) => setAktuellesPasswort(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Neues Passwort</label>
              <input
                type="password"
                value={neuesPasswort}
                onChange={(e) => setNeuesPasswort(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Neues Passwort bestätigen</label>
              <input
                type="password"
                value={neuesPasswortBestätigen}
                onChange={(e) => setNeuesPasswortBestätigen(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Speichern
            </button>
          </form>
        )}
      </div>

      {/* Section Benachrichtigungen */}
      <div className="mb-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Benachrichtigungen</h2>
        <button
          onClick={() => setShowBenachrichtigungenForm(!showBenachrichtigungenForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showBenachrichtigungenForm ? "Abbrechen" : "Benachrichtigungen bearbeiten"}
        </button>
        {showBenachrichtigungenForm && (
          <form onSubmit={handleBenachrichtigungenSubmit} className="mt-4 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="pushNotifications" className="ml-2 text-sm text-gray-700">
                Push-Benachrichtigungen aktivieren
              </label>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Speichern
            </button>
          </form>
        )}
      </div>

      {/* Section Kontakt */}
      <div className="mb-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Kontakt</h2>
        <p className="text-gray-700 mb-4">
          Bei Fragen oder Problemen können Sie uns gerne kontaktieren:
        </p>
        <ul className="space-y-2">
          <li className="text-gray-900">E-Mail: support@example.com</li>
          <li className="text-gray-900">Telefon: +49 123 456789</li>
        </ul>
      </div>
    </div>
  );
};

export default Einstellungen;