import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAlojamientos: [],
  AllLocation: [],
  AllService: []
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
    },
    getAllService (state, action) {
      state.AllService = action.payload
    },
  },
});

export const { getAllAlojamientos, getAllLocation, getAllService } = boscoSlice.actions;

export default boscoSlice.reducer;
