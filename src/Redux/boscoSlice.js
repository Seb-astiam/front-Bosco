import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAlojamientos: [],
  AllProvinces: [],
  AllCities: [],
  AllService: [],
  email: ''
};

//! creo que no es necesario un estado local para provinces, cities y servicios. tema para resolver luego - ari

const boscoSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    getAllAlojamientos (state, action) {
        state.allAlojamientos = action.payload;
        console.log(state.allAlojamientos)
    },
    getAllProvinces (state, action) {
      state.AllProvinces = action.payload
    },
    getAllCities (state, action) {
      state.AllCities = action.payload
    },
    getAllService (state, action) {
      state.AllService = action.payload
    },
    getAllUser (state, action) {
      state.email = action.payload
    },
  },
});

export const { getAllAlojamientos, getAllProvinces, getAllCities, getAllService, getAllUser } = boscoSlice.actions;

export default boscoSlice.reducer;
