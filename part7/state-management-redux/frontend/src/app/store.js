import { configureStore } from "@reduxjs/toolkit";
import notificationSlide from "../slides/notificationSlide";
import blogSlide from "../slides/blogSlide";

const store = configureStore({
  reducer: {
    notification: notificationSlide,
    blogs: blogSlide
  }
});

export default store;