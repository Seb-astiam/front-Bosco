import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAlojamientos: [],
  AllLocation: []
};

const boscoSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    getAllAlojamientos (state, action) {
        state.allAlojamientos = action.payload;
    },
    getAllLocation (state, action) {
      state.AllLocation = action.payload
    }
  },
});

export const { getAllAlojamientos, getAllLocation } = boscoSlice.actions;

export default boscoSlice.reducer;
