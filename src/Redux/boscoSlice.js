import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAlojamientos: []
};

const boscoSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    getAllAlojamientos (state, action) {
        state.allAlojamientos = action.payload;
    }
  },
});

export const { getAllAlojamientos } = boscoSlice.actions;

export default boscoSlice.reducer;
