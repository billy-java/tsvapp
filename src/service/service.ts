import { I_Benutzer } from "../types/I_Benutzer";

// src/service/service.ts
export const validatePassword = (password: string): string => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
  
    if (password.length < minLength) {
      return "Das Passwort muss mindestens 8 Zeichen lang sein.";
    }
    if (!hasUpperCase) {
      return "Das Passwort muss mindestens einen Großbuchstaben enthalten.";
    }
    if (!hasNumber) {
      return "Das Passwort muss mindestens eine Zahl enthalten.";
    }
    if (!hasSpecialChar) {
      return "Das Passwort muss mindestens ein Sonderzeichen enthalten (!@#$%^&*).";
    }
    return "";
  };


  // src\service\service.ts
   // Fonction pour valider le numéro de téléphone
  export const validateTelefon = (telefon: string): boolean => {
    const telefonRegex = /^\+?[0-9\s\-]{6,}$/;
    return telefonRegex.test(telefon);
  };

  // Formater le numéro de téléphone
  export const formatTelefon = (telefon: string): string => {
    // Supprimer tous les caractères non numériques
    const cleaned = telefon.replace(/[^\d+]/g, "");

    // Ajouter des espaces ou des tirets pour un meilleur affichage
    if (cleaned.startsWith("+")) {
      return cleaned.replace(/(\+\d{2})(\d{3})(\d{3})(\d{4})/, "$1 $2 $3 $4");
    } else {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
    }
  };



  // src\service\service.ts
  export const sortList = <T>(
    list: T[],
    key: keyof T,
    direction: "auf" | "ab"
  ): T[] => {
    return [...list].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
  
      // Gérer les valeurs undefined ou null
      if (valueA == null) return 1;
      if (valueB == null) return -1;
  
      // Convertir en string pour utiliser localeCompare avec option numérique
      const strA = String(valueA);
      const strB = String(valueB);
  
      const comparison = strA.localeCompare(strB, undefined, { numeric: true });
  
      return direction === "auf" ? comparison : -comparison;
    });
  };
  
// src/utils/dateFormatter.ts
export const formatGermanDate = (dateString: string | undefined): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Si la date est invalide

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let formattedDate = `${day}-${month}-${year}`;

  // Vérifie si la chaîne contient des heures et minutes (par exemple "T12:30" ou " 12:30")
  const hasTime = /([T\s])\d{2}:\d{2}/.test(dateString);

  if (hasTime) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    formattedDate += ` um ${hours}:${minutes}`;
  }

  return formattedDate;
};


export const einTrainer = (benutzer: I_Benutzer): boolean => {
  return benutzer.rolle === "Trainer";
};

export const einAdmin = (benutzer: I_Benutzer): boolean => {
  return benutzer.rolle === "Administrator";
};