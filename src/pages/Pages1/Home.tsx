// src/pages/Home.tsx
import { Link } from "react-router-dom";
import { einAdmin } from "../../service/service";
import { useSelector } from "react-redux";
import { T_RootState } from "../../redux/store";

const Home = () => {
  const user = useSelector((state: T_RootState) => state.auth.userState.user!);

  return (
    <div className="p-6 bg-gray-100 min-h-screen my-10">
   

      {/* Section Hero */}
      <section className="mb-8 bg-blue-600 text-white rounded-lg shadow p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Willkommen bei unserer Vereinsverwaltungs-App
        </h1>
        <p className="text-lg mb-6">
          Vereinfachen Sie die Verwaltung Ihres Vereins mit unserer
          benutzerfreundlichen Plattform.
        </p>
      </section>

      

      {/* Section Fonctionnalités */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Einige Funktionen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Carte pour Dokumente */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">
              Neue Informationen sehen
            </h3>
            <p className="text-gray-700 mb-4">
              Laden Sie Dokumente hoch.
            </p>
            <Link
              to="/infos"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Zu den Informationen
            </Link>
          </div>

          {/* Carte pour Protokolle */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-800">
              Protokolle
            </h3>
            <p className="text-gray-700 mb-4">
              Laden Sie Protokolle hoch, verwalten Sie sie und teilen Sie sie
              mit den Mitgliedern.
            </p>
            <Link
              to="/protokolle"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Zu den Protokollen
            </Link>
          </div>

          {/* Carte pour Rechtliches */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2 text-purple-800">
              Rechtliches
            </h3>
            <p className="text-gray-700 mb-4">
              Zugriff auf alle rechtlichen Dokumente wie Datenschutzrichtlinien
              und Nutzungsbedingungen.
            </p>
            <Link
              to="/rechtliches"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Zu den rechtlichen Dokumenten
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2 text-yellow-800">
              Gegner
            </h3>
            <p className="text-gray-700 mb-4">
              Verwalten Sie Ihre Gegner und ihre Informationen.
            </p>
            <Link
              to="/gegner"
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
             Zu den Gegnern
            </Link>
          </div>
        </div>
      </section>

      {/* Section Admin */}
   {einAdmin(user) ? <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Die Funktionen für Administrator
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Carte pour Benutzer (Benutzerverwaltung) */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">
              Benutzer verwalten
            </h3>
            <p className="text-gray-700 mb-4">
              Erstellen und verwalten Sie Benutzerkonten.
            </p>
            <Link
              to="/admin/benutzer"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Zu den Benutzern
            </Link>
          </div>

          {/* Carte pour Vereine */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-800">
              Vereine verwalten
            </h3>
            <p className="text-gray-700 mb-4">
              Erstellen und verwalten Sie Vereine, Mitglieder und
              Verantwortliche.
            </p>
            <Link
              to="/admin/vereine"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Zu den Vereinen
            </Link>
          </div>

          {/* Carte pour Dokumente */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2 text-purple-800">
              Dokumente verwalten
            </h3>
            <p className="text-gray-700 mb-4">
              Laden Sie Dokumente hoch, verwalten Sie sie und teilen Sie sie mit
              den Mitgliedern.
            </p>
            <Link
              to="/admin/dokumente"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Zu den Dokumenten
            </Link>
          </div>

          {/* Carte pour Ereignisse */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2 text-orange-800">
              Informationen verwalten
            </h3>
            <p className="text-gray-700 mb-4">
              Erstellen und verwalten Sie Nachrichten oder Ereignisse, Termine.
            </p>
            <Link
              to="/admin/ereignisse"
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              Zu den Info/Ereignissen
            </Link>
          </div>

        </div>
      </section> : null}   

      {/* Section À propos */}
      <section className="mb-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Über uns</h2>
        <p className="text-gray-700 mb-4">
          Unsere App wurde entwickelt, um die Verwaltung von Vereinen zu
          vereinfachen. Wir bieten eine benutzerfreundliche Plattform, die es
          Ihnen ermöglicht, alle Aspekte Ihres Vereins effizient zu verwalten.
        </p>
      </section>

         {/* Section Introduction */}
         <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Über die App
        </h2>
        <p className="text-gray-700 mb-4">
          Unsere Vereinsverwaltungs-App wurde entwickelt, um die Verwaltung von
          Vereinen, Dokumenten und Mitgliedern zu vereinfachen. Mit dieser App
          können Sie:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Vereine und ihre Details verwalten.</li>
          <li>
            Dokumente wie Protokolle und rechtliche Informationen hochladen und
            organisieren.
          </li>
          <li>Mitglieder und ihre Rollen verwalten.</li>
          <li>Benachrichtigungen und wichtige Informationen teilen.</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
