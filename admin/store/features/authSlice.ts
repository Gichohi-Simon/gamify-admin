import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "@/types/types";

const initialState: AuthState = {
  userInfo: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      if (action.payload.userInfo) {
        state.userInfo = action.payload.userInfo;
        state.initialized = true;
      }
    },
    setLogout: (state) => {
      state.userInfo = null;
      state.initialized = true;
    },
  },
});

export const { setCredentials, setLogout } = authSlice.actions;
export default authSlice.reducer;
