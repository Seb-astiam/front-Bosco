import { configureStore } from '@reduxjs/toolkit';
import mapReducer from "../Redux/Slice"

export const store = configureStore({
   reducer: {maps: mapReducer}
}
    );