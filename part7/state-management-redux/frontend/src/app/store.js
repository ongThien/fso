import { configureStore } from "@reduxjs/toolkit";
import notificationSlide from "../slides/notificationSlide";
import blogSlide from "../slides/blogSlide";
import userSlide from "../slides/userSlide";

const store = configureStore({
  reducer: {
    notification: notificationSlide,
    blogs: blogSlide,
    user: userSlide,
  }
});

export default store;