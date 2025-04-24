import { JSX, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import instanceAxios from "../../service/axiosAuth";
import { I_Benutzer } from "../../types/I_Benutzer";
import { T_RootState } from "../../redux/store";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const dispatch = useDispatch();
  const { userState, loading } = useSelector((state: T_RootState) => state.auth);
  const token = localStorage.getItem("token");
  const [isFetchingUser, setIsFetchingUser] = useState(true); // État pour gérer le chargement de l'utilisateur

  useEffect(() => {
    if (!token) {
      console.log("Aucun token trouvé, redirection vers la page de connexion");
      setIsFetchingUser(false); // Arrêter le chargement si aucun token n'est trouvé
      return;
    }

    if (userState.user) {
      console.log("Utilisateur déjà connecté, pas besoin de récupérer les données");
      setIsFetchingUser(false); // Arrêter le chargement si l'utilisateur est déjà chargé
      return;
    }

    const fetchUserData = async () => {
      dispatch(setLoading(true));
      try {
        console.log("Tentative de récupération de l'utilisateur courant...");
        const response = await instanceAxios.get("/benutzer/currentuser", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Utilisateur récupéré avec succès:", response.data);
        dispatch(setUser({
          user: response.data as I_Benutzer,
          token: token,
          refreshToken: localStorage.getItem("refresh-token"),
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh-token");
        dispatch(setUser({ user: null, token: null, refreshToken: null }));
      } finally {
        dispatch(setLoading(false));
        setIsFetchingUser(false); // Arrêter le chargement une fois l'utilisateur récupéré ou en cas d'erreur
      }
    };

    fetchUserData();
  }, [dispatch, token, userState.user]);

  // Pendant le chargement, afficher un indicateur de chargement
  if (isFetchingUser || loading) {
    return <div>Chargement des données...</div>;
  }

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  if (!token || !userState.user) {
    console.log("Token ou utilisateur manquant, redirection vers la page de connexion");
    return <Navigate to="/" />;
  }

  // Si l'utilisateur est connecté, afficher le composant protégé
  return element;
};

export default ProtectedRoute;