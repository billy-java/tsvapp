import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validatePassword, validateTelefon, formatTelefon } from '../../service/service';

const Registrieren = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // États pour les champs du formulaire
  const [nachname, setNachname] = useState("");
  const [vorname, setVorname] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [passwort, setPasswort] = useState("");
  const [passwortBestätigen, setPasswortBestätigen] = useState("");
  const [rolle, setRolle] = useState<"Normal" | "Trainer" | "Administrator">("Normal");

  // États pour les erreurs et le chargement
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // États pour les erreurs de validation
  const [errors, setErrors] = useState<{
    nachname?: string;
    vorname?: string;
    email?: string;
    telefon?: string;
    passwort?: string;
    passwortBestätigen?: string;
    rolle?: string;
  }>({});

  // Fonction pour gérer les changements dans le champ téléphone
  const handleTelefonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Restreindre l'entrée aux chiffres, espaces, tirets et le signe +
    const cleanedValue = value.replace(/[^0-9+\s-]/g, "");

    // Formater le numéro de téléphone
    const formattedTelefon = formatTelefon(cleanedValue);

    // Valider le numéro de téléphone
    const isValid = validateTelefon(formattedTelefon);

    // Mettre à jour l'état du téléphone
    setTelefon(formattedTelefon);

    // Mettre à jour les erreurs
    setErrors((prevErrors) => ({
      ...prevErrors,
      telefon: isValid ? "" : "Ungültige Telefonnummer",
    }));
  };

  // Fonction pour valider le formulaire
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!nachname) newErrors.nachname = "Nachname ist erforderlich";
    if (!vorname) newErrors.vorname = "Vorname ist erforderlich";
    if (!email) {
      newErrors.email = "E-Mail ist erforderlich";
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
      newErrors.email = "Ungültige E-Mail-Adresse";
    }
    if (!telefon) {
      newErrors.telefon = "Telefonnummer ist erforderlich";
    } else if (!validateTelefon(telefon)) {
      newErrors.telefon = "Ungültige Telefonnummer";
    }
    if (!passwort) {
      newErrors.passwort = "Passwort ist erforderlich";
    } else {
      const passwordError = validatePassword(passwort);
      if (passwordError) newErrors.passwort = passwordError;
    }
    if (!passwortBestätigen) {
      newErrors.passwortBestätigen = "Passwortbestätigung ist erforderlich";
    } else if (passwortBestätigen !== passwort) {
      newErrors.passwortBestätigen = "Die Passwörter stimmen nicht überein.";
    }
    if (!rolle) newErrors.rolle = "Rolle ist erforderlich";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retourne true si aucune erreur
  };

  // Fonction pour soumettre le formulaire
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    return; // Arrête la soumission si le formulaire n'est pas valide
  }

  setLoading(true);
  setErrorMessage("");

  // Formater le numéro de téléphone avant de l'envoyer
  const formattedTelefon = formatTelefon(telefon);

  const userData = {
    nachname,
    vorname,
    email,
    telefon: formattedTelefon,
    passwort,
    rolle,
  };

  try {
    const response = await axios.post("https://tsvapp.de/benutzer/registrieren", userData);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("refresh-token", response.data.refreshToken);

    dispatch(setUser({
      user: response.data.benutzer,
      token: response.data.token,
      refreshToken: response.data.refreshToken
    }));

    navigate("/home");

  } catch (error: any) {
    console.error("Erreur du serveur :", error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const serverMessage = error.response?.data?.nachricht; // Message renvoyé par le backend

      switch (status) {
        case 400:
          setErrorMessage(serverMessage || "Ungültige Eingabe. Bitte überprüfe deine Daten.");
          break;
        case 409:
          setErrorMessage(serverMessage || "Diese E-Mail wird bereits verwendet.");
          break;
        case 422:
          setErrorMessage("Ungültige Anmeldeinformationen. Bitte überprüfen Sie Ihre Anmeldeinformationen oder füllen Sie alle erforderlichen Felder aus.");
          break;
        case 500:
          setErrorMessage("Interner Serverfehler. Bitte versuchen Sie es später erneut.");
          break;
        default:
          setErrorMessage("Ein unbekannter Fehler ist aufgetreten.");
      }
    } else {
      setErrorMessage("Verbindungsfehler. Überprüfen Sie Ihre Internetverbindung.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registrierung</h2>

        {/* Champ Nachname */}
        <div className="mb-4">
          <label htmlFor="nachname" className="block text-sm font-medium text-gray-700 mb-1">Nachname</label>
          <input
            type="text"
            id="nachname"
            value={nachname}
            onChange={(e) => setNachname(e.target.value)}
            placeholder="Nachname"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.nachname && <p className="text-sm text-red-500 mt-1">{errors.nachname}</p>}
        </div>

        {/* Champ Vorname */}
        <div className="mb-4">
          <label htmlFor="vorname" className="block text-sm font-medium text-gray-700 mb-1">Vorname</label>
          <input
            type="text"
            id="vorname"
            value={vorname}
            onChange={(e) => setVorname(e.target.value)}
            placeholder="Vorname"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.vorname && <p className="text-sm text-red-500 mt-1">{errors.vorname}</p>}
        </div>

        {/* Champ Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Champ Telefon */}
        <div className="mb-4">
          <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
          <input
            type="text"
            id="telefon"
            value={telefon}
            onChange={handleTelefonChange}
            placeholder="Telefon (z.B. +49 123 456789)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.telefon && <p className="text-sm text-red-500 mt-1">{errors.telefon}</p>}
        </div>

        {/* Champ Rolle */}
        <div className="mb-6">
          <label htmlFor="rolle" className="block text-sm font-medium text-gray-700 mb-1">Rolle</label>
          <select
            id="rolle"
            value={rolle}
            onChange={(e) => setRolle(e.target.value as "Normal" | "Trainer" | "Administrator")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Normal">Normal</option>
            <option value="Trainer">Trainer</option>
            <option value="Administrator">Administrator</option>
          </select>
          {errors.rolle && <p className="text-sm text-red-500 mt-1">{errors.rolle}</p>}
        </div>

        {/* Champ Passwort */}
        <div className="mb-4">
          <label htmlFor="passwort" className="block text-sm font-medium text-gray-700 mb-1">Passwort</label>
          <input
            type={showPassword ? "text" : "password"}
            id="passwort"
            value={passwort}
            onChange={(e) => setPasswort(e.target.value)}
            placeholder="Passwort"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.passwort && <p className="text-sm text-red-500 mt-1">{errors.passwort}</p>}
        </div>

        {/* Champ Passwort bestätigen */}
        <div className="mb-4">
          <label htmlFor="passwortBestätigen" className="block text-sm font-medium text-gray-700 mb-1">Passwort bestätigen</label>
          <input
            type={showPassword ? "text" : "password"}
            id="passwortBestätigen"
            value={passwortBestätigen}
            onChange={(e) => setPasswortBestätigen(e.target.value)}
            placeholder="Passwort bestätigen"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.passwortBestätigen && <p className="text-sm text-red-500 mt-1">{errors.passwortBestätigen}</p>}
        </div>

        {/* Checkbox pour afficher le mot de passe */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          <label htmlFor="showPassword" className="text-sm text-gray-700">Passwort anzeigen</label>
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? "Laden..." : "Registrieren"}
        </button>

        {/* Affichage des messages d'erreur généraux */}
      
        {errorMessage && <div className="mt-4 p-3 text-sm text-red-600 bg-red-100 border border-red-400 rounded">
    {errorMessage}
  </div>}

        {/* Lien pour se connecter */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Hast du bereits ein Konto? <Link to="/" className="text-blue-600 hover:underline">Einloggen</Link>
        </p>
      </form>
    </div>
  );
};

export default Registrieren;
