// src/redux/dokumenteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { I_Dokument } from '../../src/types/I_Dokument'; // Importer l'interface des documents

// Définir l'état initial du slice
interface DokumenteState {
  list: I_Dokument[];
}

const initialState: DokumenteState = {
  list: [],
};

// Créer le slice pour les documents
const dokumenteSlice = createSlice({
  name: 'dokumente',
  initialState,
  reducers: {
    // Action pour définir la liste des documents
    setDokumente: (state, action: PayloadAction<I_Dokument[]>) => {
      state.list = [...action.payload];
    },
    // Action pour ajouter un document
    addDokument: (state, action: PayloadAction<I_Dokument>) => {
      state.list.push({ ...action.payload });
    },
    // Action pour supprimer un document par son ID
    removeDokument: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((dokument) => dokument.id !== action.payload);
    },
    // Action pour mettre à jour un document
    updateDokument: (state, action: PayloadAction<I_Dokument>) => {
      const index = state.list.findIndex((dokument) => dokument.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...action.payload }; // Garantir l'immutabilité
      }
    },
  },
});

// Exporter les actions pour les utiliser dans les composants
export const { setDokumente, addDokument, removeDokument, updateDokument } = dokumenteSlice.actions;

// Exporter le reducer pour l'ajouter au store
export default dokumenteSlice.reducer;