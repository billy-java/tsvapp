import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Einloggen from "../pages/Auth/Einloggen";
import Registrieren from "../pages/Auth/Registrieren";
import Home from "../pages/Pages1/Home";
import Benutzer from "../pages/pages3/Benutzer";
import NotFoundPage from "../pages/NotFoundPage";
import Einstellungen from "../pages/pages3/Einstellungen";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import AdminRoute from "../components/Auth/AdminRoute";
import Navbar from "../components/Navbar";
import Vereine from "../pages/Pages2/Vereine";
import Protokolle from "../pages/Pages2/Protokolle";
import Rechtliches from "../pages/Pages2/Rechtliches";
import VereineAdmin from "../pages/pages3/VereineAdmin";
import Dokumente from "../pages/pages3/Dokumente";
import InformationenAdmin from "../pages/pages3/InformationenAdmin";
import Gegner from "../pages/Pages1/Gegner";
import Informationen from "../pages/Pages2/Informationen";
import Sonstiges from "../pages/Pages2/Sonstiges";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Utilisation du hook useLocation dans un composant qui est rendu à l'intérieur du Router */}
        <Route
          path="*"
          element={<PageWithNavbar />}
        />
      </Routes>
    </Router>
  );
};

const PageWithNavbar = () => {
  const location = useLocation();
  const showNavbar = !['/', '/registrieren'].includes(location.pathname);

  return (
    <div className="bg-gray-100">
      {showNavbar && <Navbar />}
      <Routes>
        // Routes non protégées
        <Route path="/" element={<Einloggen />} />
        <Route path="/registrieren" element={<Registrieren />} />
 
        //routes protegees
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/gegner" element={<ProtectedRoute element={<Gegner />} />} />
  
       <Route path="/infos" element={<ProtectedRoute element={<Informationen />} />} />
        <Route path="/vereine" element={<ProtectedRoute element={<Vereine />} />} />
        <Route path="/protokolle" element={<ProtectedRoute element={<Protokolle />} />} />
        <Route path="/rechtliches" element={<ProtectedRoute element={<Rechtliches />} />} />
        <Route path="/sonstiges" element={<ProtectedRoute element={<Sonstiges />} />} />

        <Route path="/einstellungen" element={<ProtectedRoute element={<Einstellungen />} />} />

        //routes admin
        <Route path="/admin/benutzer" element={<AdminRoute element={<Benutzer />} />} />
        <Route path="/admin/vereine" element={<AdminRoute element={<VereineAdmin />} />} />
        <Route path="/admin/dokumente" element={<AdminRoute element={<Dokumente />} />} />
        <Route path="/admin/infos" element={<AdminRoute element={<InformationenAdmin />} />} />

        //routes 404
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
