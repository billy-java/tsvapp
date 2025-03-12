// src/redux/modalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalTitle = "Benutzer" | "Dokument" | "Information" | "Verein" | "Confirmation" | "Admin";

export type ModalData = { id?: number; message?: string } | null;

interface ModalState {
  titel: ModalTitle | null;
  aendern: ModalData;
}

const initialState: ModalState = {
  titel: null,
  aendern: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ titel: ModalTitle; aendern?: ModalData }>) => {
      state.titel = action.payload.titel;
      state.aendern = action.payload.aendern ?? null;
    },
    closeModal: (state) => {
      state.titel = null;
      state.aendern = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;