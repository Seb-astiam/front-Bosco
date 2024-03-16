import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    storage: boscoReducer,
  },
});

export default store;