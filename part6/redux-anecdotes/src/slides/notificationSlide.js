import { createSlice } from "@reduxjs/toolkit";

const notificationSlide = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNoti: (state, action) => (state = action.payload),
    removeNoti: (state) => (state = null),
  },
});

export const { setNoti, removeNoti } = notificationSlide.actions;
export default notificationSlide.reducer;
