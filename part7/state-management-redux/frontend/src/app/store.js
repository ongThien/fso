import { configureStore } from "@reduxjs/toolkit";
import notificationSlide from "../slides/notificationSlide";

const store = configureStore({
  reducer: {
    notification: notificationSlide,
  }
});

export default store;