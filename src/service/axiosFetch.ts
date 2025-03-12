// src\service\axiosFetch.ts

import axios from "axios";
import { I_Benutzer } from "../types/I_Benutzer";

const API_BASE_URL = "https://tsvapp.de"; // Remplace par l'URL réelle du serveur

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 📌 Récupérer une liste d'éléments
export const fetchAllData = async <T>(endpoint: string): Promise<T[]> => {
  const response = await api.get<T[]>(endpoint);
  return response.data;
};

// 📌 Ajouter un élément
export const dataErstellen = async <T>(endpoint: string, data: T): Promise<T> => {
  const response = await api.post<T>(endpoint, data);
  return response.data;
};

// 📌 Mettre à jour un élément par ID
export const dataAendern = async <T>(endpoint: string, id: number, data: Partial<T>): Promise<T> => {
  const response = await api.put<T>(`${endpoint}/${id}`, data);
  return response.data;
};

// 📌 Supprimer un élément par ID
export const dataLoeschen = async (endpoint: string, id: number): Promise<void> => {
  await api.delete(`${endpoint}/${id}`);
};

// Appel API côté client

export const passwortAendern = async (id: number, aktuellesPasswort: string, neuesPasswort: string): Promise<void> => {
  await api.put(`/benutzer/${id}/passwort`, { aktuellesPasswort, neuesPasswort });
};

// Récupérer les utilisateurs par rôle
export const fetchBenutzerByRolle = async (rolle: string): Promise<I_Benutzer[]> => {
  const response = await api.get<I_Benutzer[]>("/benutzer", {
    params: { rolle }, // Filtre par rôle
  });
  return response.data;
};

// Récupérer uniquement les "Trainer"
export const fetchTrainer = async (): Promise<I_Benutzer[]> => {
  return fetchBenutzerByRolle("Trainer");
};


export default api;

