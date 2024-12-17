import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isVisible: false, // Initial state for popup visibility
    loginToggle: false,
  },
  reducers: {
    togglePopup: (state) => {
      state.isVisible = !state.isVisible; // Toggle visibility

    },
    setPopupVisibility: (state, action) => {
      state.isVisible = action.payload; // Set visibility to specific state
    },
    toogleLogin: (state)=>{
      state.loginToggle = !state.loginToggle; // Toggle visibility

    }
  },
});

// Export actions for use in components
export const { togglePopup, setPopupVisibility , toogleLogin } = popupSlice.actions;

// Export the reducer to be added to the store
export default popupSlice.reducer;
