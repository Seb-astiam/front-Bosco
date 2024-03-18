import { configureStore } from "@reduxjs/toolkit";
import boscoReducer from "./boscoSlice"

const store = configureStore({
  reducer: {
    storage: boscoReducer,
  },
});

export default store;