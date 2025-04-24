// src/redux/informationenSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { I_Information } from '../types/I_Information'; // Mise à jour de l'import

// Définir l'état initial du slice
interface InformationenState {
  list: I_Information[];
}

const initialState: InformationenState = {
  list: [],
};

// Créer le slice pour les informations
const informationenSlice = createSlice({
  name: 'informationen',
  initialState,
  reducers: {
    // Action pour définir la liste des informations
    setInformationen: (state, action: PayloadAction<I_Information[]>) => {
      state.list = [...action.payload];
    },
    // Action pour ajouter une information
    addInformation: (state, action: PayloadAction<I_Information>) => {
      state.list.push({ ...action.payload });
    },
    // Action pour supprimer une information par son ID
    removeInformation: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((information) => information.id !== action.payload);
    },
    // Action pour mettre à jour une information
    updateInformation: (state, action: PayloadAction<I_Information>) => {
      const index = state.list.findIndex((information) => information.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...action.payload }; // Garantir l'immutabilité
      }
    },
  },
});

// Exporter les actions pour les utiliser dans les composants
export const { setInformationen, addInformation, removeInformation, updateInformation } = informationenSlice.actions;

// Exporter le reducer pour l'ajouter au store
export default informationenSlice.reducer;