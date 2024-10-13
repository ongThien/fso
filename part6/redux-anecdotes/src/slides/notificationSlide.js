import { createSlice } from "@reduxjs/toolkit";

const notificationSlide = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNoti: (state, action) => (state = action.payload),
    clearNoti: (state) => (state = null),
  },
});

export const handleNoti = (noti, timer) => (dispatch) => {
  dispatch(setNoti(noti));
  setTimeout(() => dispatch(clearNoti()), timer);
};

export const { setNoti, clearNoti } = notificationSlide.actions;
export default notificationSlide.reducer;
