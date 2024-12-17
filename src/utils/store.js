import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./popupSlice";
import filterSlice from "./filterSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    // Add reducers here
    popup: popupReducer,

    filterSlice: filterSlice,
    authSlice: authSlice
  },
});

export default store; 
