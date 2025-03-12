// src\redux\benutzerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { I_Benutzer } from '../../src/types/I_Benutzer'; // Importer l'interface

// Créer le slice avec des actions pour gérer l'état des utilisateurs
const benutzerSlice = createSlice({
  name: 'benutzer',
  initialState: { list: [] as I_Benutzer[], trainerList: [] as I_Benutzer[] },
  reducers: {
    setUsers: (state, action: PayloadAction<I_Benutzer[]>) => {
      state.list = [...action.payload];
    },
    addUser: (state, action: PayloadAction<I_Benutzer>) => {
      state.list.push({ ...action.payload });
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<I_Benutzer>) => {
      const index = state.list.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...action.payload }; // Garantir l'immutabilité
      }
    },
    setTrainerListSlice: (state, action: PayloadAction<I_Benutzer[]>) => {
      state.trainerList = [...action.payload];
    },
  },
});

// Exporter les actions pour les utiliser dans les composants
export const { setUsers, addUser, removeUser, updateUser, setTrainerListSlice } = benutzerSlice.actions;

// Exporter le reducer pour l'ajouter au store
export default benutzerSlice.reducer;
