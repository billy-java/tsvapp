import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { I_Menue, mainMenue, subMenueInfo, subMenueAdmin } from "../types/I_Menu";
import { iconsListe } from "../assets/icons/iconsListe";
import api from "../service/axiosFetch";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { T_RootState } from "../redux/store";
import { einAdmin } from "../service/service";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Récupérer l'état du localStorage ou définir une valeur par défaut
  const savedMainMenu = localStorage.getItem("activeMain");
  const savedSecondaryMenus = JSON.parse(localStorage.getItem("activeSecondaryMenus") || "{}");

  const [activeMain, setActiveMain] = useState<string>(savedMainMenu || mainMenue[0].titel);
  const [activeSecondaryMenus, setActiveSecondaryMenus] = useState<{ [key: string]: string }>(savedSecondaryMenus);
  const [activeSubMenu, setActiveSubMenu] = useState<I_Menue[]>([]); 
  const [showSecondary, setShowSecondary] = useState<boolean>(false);

  const user = useSelector((state: T_RootState) => state.auth.userState.user);

  useEffect(() => {
    if (activeMain === "All. Infos") {
      setShowSecondary(true);
      setActiveSubMenu(subMenueInfo);
    } else if (activeMain === "Admin") {
      setShowSecondary(true);
      setActiveSubMenu(subMenueAdmin);
    } else {
      setShowSecondary(false);
    }
  }, [activeMain]);

  useEffect(() => {
    localStorage.setItem("activeMain", activeMain);
    localStorage.setItem("activeSecondaryMenus", JSON.stringify(activeSecondaryMenus));
  }, [activeMain, activeSecondaryMenus]);

  useEffect(() => {
    if (activeMain === "All. Infos" || activeMain === "Admin") {
      const savedSecondaryMenu = activeSecondaryMenus[activeMain];
      if (savedSecondaryMenu) {
        const targetMenu = activeSubMenu.find((menu) => menu.titel === savedSecondaryMenu);
        if (targetMenu) {
          navigate(targetMenu.url);
        }
      }
    }
  }, [activeMain, activeSubMenu, activeSecondaryMenus, navigate]);

  const handleLogout = async () => {
    try {
      await api.post("/benutzer/ausloggen");
      dispatch(logout());

      ["token", "refresh-token", "activeMain", "activeSecondaryMenus"].forEach((key) =>
        localStorage.removeItem(key)
      );

      navigate("/");
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    }
  };

  const handleMainClick = (menu: string) => {
    setActiveMain(menu);
  };

  const handleSecondaryClick = (menu: string, url: string) => {
    setActiveSecondaryMenus((prev) => ({
      ...prev,
      [activeMain]: menu,
    }));
    navigate(url);
  };

  return (
    <div className="h-full flex flex-col">
      {showSecondary && (
  <div className="bg-gray-700 text-white p-4 flex justify-around text-xs sm:text-sm md:text-base">
    {activeSubMenu.map((item, index) => (
      <Link to={item.url} key={index}>
        <div
          onClick={() => handleSecondaryClick(item.titel, item.url)}
          className={`cursor-pointer flex flex-col sm:flex-row items-center sm:space-x-2 text-center sm:text-left ${
            activeSecondaryMenus[activeMain] === item.titel
              ? "font-bold text-blue-500"
              : ""
          }`}
        >
          <div className="text-lg">{item.icon}</div>
          <span className="mt-1 sm:mt-0 text-[10px] sm:text-sm">{item.titel}</span>
        </div>
      </Link>
    ))}
  </div>
)}


      {/* Menu principal */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-3 text-sm md:text-base">
        {/* Menu items */}
        <div className="flex justify-around md:justify-between items-center px-4">
          {mainMenue.map((item, index) => (
            user && (item.titel !== "Admin" || einAdmin(user)) ? (
              <Link to={item.url} key={index}>
                <div
                  className={`cursor-pointer ${activeMain === item.titel ? "font-bold text-blue-500" : ""}`}
                  onClick={() => handleMainClick(item.titel)}
                >
                  <p className="flex items-center space-x-2">
                    {item.icon} 
                    <span className={`${item.titel !== 'Admin' ? 'hidden sm:inline' : ''}`}>{item.titel}</span> {/* Masquer texte sur mobile */}
                  </p>
                </div>
              </Link>
            ) : null
          ))}
          
          {/* Déconnexion */}
          <div
            className="cursor-pointer flex items-center space-x-2"
            onClick={handleLogout}
          >
            {iconsListe.Ausloggen.icon1} <span className="hidden sm:inline">Sich ausloggen</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
