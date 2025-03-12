// src/redux/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { I_Benutzer } from "../types/I_Benutzer";

export interface I_UserState { 
  user: I_Benutzer | null; 
  token: string | null; 
  refreshToken: string | null; 
}

export interface I_AppState {
  userState: I_UserState;
  loading: boolean;
}

const initialState: I_AppState = {
  userState: {
    user: null,
    token: null,
    refreshToken: null,
  },
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<I_UserState>) => {
      state.userState.user = action.payload.user;
      state.userState.token = action.payload.token;
      state.userState.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.userState.user = null;
      state.userState.token = null;
      state.userState.refreshToken = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserEinstellungen: (state, action: PayloadAction<I_Benutzer>) => {
      state.userState.user = action.payload;
    },
  },
});

export const { setUser, logout, setLoading, setUserEinstellungen } = authSlice.actions;

export default authSlice.reducer;
