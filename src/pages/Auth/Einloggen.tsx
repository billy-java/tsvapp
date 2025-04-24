import { useDispatch } from "react-redux"; 
import { setUser } from "../../redux/authSlice";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Einloggen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // États pour les champs du formulaire
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");

  // États pour les erreurs et le chargement
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // États pour les erreurs de validation
  const [errors, setErrors] = useState<{
    email?: string;
    passwort?: string;
  }>({});

  // Fonction pour valider le formulaire
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "E-Mail ist erforderlich";
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
      newErrors.email = "Ungültige E-Mail-Adresse";
    }

    if (!passwort) {
      newErrors.passwort = "Passwort ist erforderlich";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    setLoading(true);
    setErrorMessage("");
  
    try {
      const response = await axios.post("http://tsvapp.de/benutzer/einloggen", { email, passwort });
  
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
        const serverMessage = error.response?.data?.nachricht;
  
        switch (status) {
          case 401:
            setErrorMessage(serverMessage || "E-Mail oder Passwort ist falsch");
            break;
          case 404:
            setErrorMessage("Benutzer nicht gefunden");
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
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Einloggen</h2>

        {/* Champ Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Champ Passwort */}
        <div className="mb-6">
          <label htmlFor="passwort" className="block text-sm font-medium text-gray-700 mb-1">Passwort</label>
          <input
            type="password"
            id="passwort"
            value={passwort}
            onChange={(e) => setPasswort(e.target.value)}
            placeholder="Passwort"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.passwort && <p className="text-sm text-red-500 mt-1">{errors.passwort}</p>}
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? "Lädt..." : "Einloggen"}
        </button>

        {/* Affichage des messages d'erreur généraux */}
        {errorMessage && (
          <div className="mt-4 p-3 text-sm text-red-600 bg-red-100 border border-red-400 rounded">
            {errorMessage}
          </div>
        )}

        {/* Lien pour aller à la page d'inscription */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Noch kein Konto? <Link to="/registrieren" className="text-blue-600 hover:underline">Erstelle ein Konto hier</Link>
        </p>

        {/* Nouvelle section pour l'oubli de mot de passe */}
        {/* Message affiché uniquement en cas d'erreur de connexion */}
{errorMessage === "Ungültige E-Mail oder Passwort" && (
  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
    <p className="text-center">
      Passwort vergessen? Bitte kontaktieren Sie einen Administrator unter{' '}
      <a href="mailto:admin@tsv-langgoens.de" className="text-blue-600 hover:underline">
        admin@tsv-langgoens.de
      </a>
    </p>
  </div>
)}

      </form>
    </div>
  );
};

export default Einloggen;