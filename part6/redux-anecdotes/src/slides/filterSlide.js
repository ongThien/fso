import { createSlice } from "@reduxjs/toolkit";

const filterSlide = createSlice({
  name: "filters",
  initialState: "",
  reducers: {
    filter: (state, action) => action.payload,
  },
});

export const { filter } = filterSlide.actions;
export default filterSlide.reducer;
