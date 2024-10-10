import { configureStore } from "@reduxjs/toolkit";
import anecdoteSlide from "../slides/anecdoteSlide";
import filterSlide from "../slides/filterSlide";
import notificationSlide from "../slides/notificationSlide";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlide,
    filter: filterSlide,
    notification: notificationSlide,
  },
});

export default store;