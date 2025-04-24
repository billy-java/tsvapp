// src/types/I_Information.ts

export interface I_Information {
    id?: number; // Optionnel pour les nouvelles entrées
    senderId: number; // ID de l'expéditeur
    titel: string; // Titre de l'information
    beschreibung: string; // Description détaillée
    kategorie: "Allgemein" | "Ereignis"; // Catégorie (générale ou événement)
    startdatum?: string; // Date de début
    enddatum?: string; // Date de fin (optionnelle)
    ort?: string; // Lieu (optionnel)
    wichtig?: boolean; // Information importante
    status: "Active" | "Inactive"; // Statut de l'information
  }