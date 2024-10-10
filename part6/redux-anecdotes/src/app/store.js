import { configureStore } from "@reduxjs/toolkit";
import anecdoteSlide from "../slides/anecdoteSlide";
import filterSlide from "../slides/filterSlide";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlide,
    filter: filterSlide,
  },
});

export default store;