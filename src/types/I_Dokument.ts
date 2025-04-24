export interface I_Dokument {
  id: number;
  senderid: number;
  titel: string;
  kategorie: "Protokol" | "Rechtliches" | "Sonstiges";
  type: "PDF" | "Word" | "Bild";
  bild?: "JPG" | "PNG";
  gueltigbis?: string;
    gueltigab: string;
  erstelldatum: string;
  aenderungsdatum?: string;
  url: string;
}