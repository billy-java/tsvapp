export interface I_Benutzer {
  id?: number;
  nachname: string;
  vorname: string;
  email: string;
  telefon?: string;
  rolle: "Administrator" | "Trainer" | "Normal";
  erstellungsdatum?: string;
  letzterLogin?: string;
  passwort?: string;
}
