import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlide = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    create: (state, action) => [...state, action.payload],
    vote: (state, action) => {
      const id = action.payload;
      const anecdoteToVote = state.find((anec) => anec.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((anec) => (anec.id === id ? votedAnecdote : anec));
    },
    set: (state, action) => action.payload,
  },
});

export const { create, vote, set } = anecdoteSlide.actions;
export default anecdoteSlide.reducer;
