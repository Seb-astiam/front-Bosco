import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice(
  {
    name: 'maps',
    initialState: {
      provinces: [],
      cities: []

    },

    reducers: {

      setProvinces: (state, action) => {
        state.provinces = action.payload
      },

      setCities: (state, action) => {
        state.cities = action.payload
      }
    }
});
    export const { 
      setProvinces,
      setCities
      
     } = mapSlice.actions;
    export default mapSlice.reducer;