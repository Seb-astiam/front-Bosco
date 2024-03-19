import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAlojamientos: [],
  AllLocation: [],
  AllService: [],
  email: ''
};

const boscoSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    getAllAlojamientos (state, action) {
        state.allAlojamientos = action.payload;
        console.log(state.allAlojamientos)
    },
    getAllLocation (state, action) {
      state.AllLocation = action.payload
    },
    getAllService (state, action) {
      state.AllService = action.payload
    },
    getAllUser (state, action) {
      state.email = action.payload
    },
  },
});

export const { getAllAlojamientos, getAllLocation, getAllService, getAllUser } = boscoSlice.actions;

export default boscoSlice.reducer;
