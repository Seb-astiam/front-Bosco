import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAlojamientos: [],
  AllProvinces: [],
  AllCities: [],
  AllService: [],
  email: '',
  MascotasUsuario: [],
  mascotaById: [],
  UserById: []
};

//! creo que no es necesario un estado local para provinces, cities y servicios. tema para resolver luego - ari

const boscoSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    getAllAlojamientos (state, action) {
        state.allAlojamientos = action.payload;
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
    getMascotas (state, action) {
      state.MascotasUsuario = action.payload
    },
    getMascotaById (state, action) {
      state.mascotaById = action.payload
    },
    getUserById (state, action) {
      state.UserById = action.payload
    }
  },
});

export const { getAllAlojamientos, getAllProvinces, getAllCities, getAllService, getAllUser, getMascotas, getMascotaById, getUserById  } = boscoSlice.actions;

export default boscoSlice.reducer;
