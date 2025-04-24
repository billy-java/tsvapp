// src/types/I_Menu.tsx

import React from "react";
import { iconsListe } from "../assets/icons/iconsListe";

export interface I_Menue {
  titel: string;
  icon: null | React.ReactNode;
  url: string;  // Ajout de l'URL pour chaque menu
}

export const mainMenue: I_Menue[] = [
  { titel: "Home", icon: iconsListe.Anzeige.icon1, url: "/home" },
  { titel: "All. Infos", icon: iconsListe.Folder.icon1, url: "/infos" },
  { titel: "Gegner", icon: iconsListe.Benutzer.icon3, url: "/gegner" },  // Exemple d'URL, change si nécessaire
  { titel: "Einstellungen", icon: iconsListe.Einstellung.icon2, url: "/einstellungen" },
  { titel: "Admin", icon: null, url: "/admin/benutzer" },
];

export const subMenueInfo: I_Menue[] = [
  { titel: "Informationen", icon: iconsListe.Info.icon1, url: "/infos" },
  { titel: "Mannschaften", icon: iconsListe.Benutzer.icon3, url: "/vereine" },
  { titel: "Protokolle", icon: iconsListe.Info.icon2, url: "/protokolle" },
  { titel: "Rechtliches", icon: iconsListe.Sicherheit.icon1, url: "/rechtliches" },
  { titel: "Sonstiges", icon: iconsListe.Dokument.icon1, url: "/sonstiges" },
];

export const subMenueAdmin: I_Menue[] = [
  { titel: "Benutzer", icon: iconsListe.Benutzer.icon2, url: "/admin/benutzer" },
  { titel: "Mannschaften", icon: iconsListe.Benachrichtigung_on_off.icon1, url: "/admin/vereine" },
  { titel: "Informationen", icon: iconsListe.Benachrichtigung_on_off.icon1, url: "/admin/infos" },
  { titel: "Dokumente", icon: iconsListe.Dokumente.icon1, url: "/admin/dokumente" },
];
