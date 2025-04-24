// src\redux\store.ts
import { configureStore } from '@reduxjs/toolkit';
import benutzerSlice from './benutzerSlice';
import authSlice from './authSlice';
import modalSlice from './modalSlice';
import dokumenteSlice from './dokumenteSlice';
import vereinSlice from './vereinSlice';
import informationenSlice from './informationenSlice';

// Créer et configurer le store Redux
export const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
    benutzer: benutzerSlice,
    dokumente: dokumenteSlice,
    informationen: informationenSlice,
    vereine: vereinSlice,
  },
});

export type T_RootState = ReturnType<typeof store.getState>;