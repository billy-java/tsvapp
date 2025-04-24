export interface I_Verein {
  id: number;
  coachid?: number; //ein I_Benutzer benutzer.id
  trainername?: string;
  name: string;
  telefon?: string;
  email?: string;
  adresse?: string;
  beschreibung?: string;
  zusatzinformation?: string;
  regeln?: string;
  istGegner: boolean
  gegnerid?: number;
}

