// src/redux/vereinSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { I_Verein } from '../../src/types/I_Verein'; // Importer l'interface des équipes

// Définir l'état initial du slice
interface VereinState {
  vereineList: I_Verein[]; // Liste de nos équipes
  gegnerList: I_Verein[]; // Liste des adversaires
}

const initialState: VereinState = {
  vereineList: [],
  gegnerList: [],
};

// Créer le slice pour les équipes
const vereinSlice = createSlice({
  name: 'verein',
  initialState,
  reducers: {
    // Action pour définir la liste des équipes
    setUnsereVereine: (state, action: PayloadAction<I_Verein[]>) => {
      state.vereineList = [...action.payload];
    },
    setGegnerVereine: (state, action: PayloadAction<I_Verein[]>) => {
      state.gegnerList = [...action.payload];
    },
  },
});

// Exporter les actions pour les utiliser dans les composants
export const { setUnsereVereine, setGegnerVereine } = vereinSlice.actions;

// Exporter le reducer pour l'ajouter au store
export default vereinSlice.reducer;
