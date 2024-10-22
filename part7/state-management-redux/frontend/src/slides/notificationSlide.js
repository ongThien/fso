import { createSlice } from "@reduxjs/toolkit";

const notificationSlide = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNoti: (state, action) => (state = action.payload),
    clearNoti: () => null,
  },
});

export const handleNoti = (noti) => (dispatch) => {
  dispatch(setNoti(noti));
  const timer = 5000;
  setTimeout(() => dispatch(clearNoti()), timer);
};

export const { setNoti, clearNoti } = notificationSlide.actions;
export default notificationSlide.reducer;
