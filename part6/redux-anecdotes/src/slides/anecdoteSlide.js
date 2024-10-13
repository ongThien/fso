import { createSlice, current } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlide = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    create: (state, action) => [...state, action.payload],
    vote: (state, action) => {
      console.log("VOTE ACTION.PAYLOAD", action.payload);
      
      const id = action.payload.id;
      const anecdoteToVote = state.find((anec) => anec.id === id);
      console.log("TO VOTE", current(anecdoteToVote));
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      console.log("VOTED", votedAnecdote);
      return state.map((anec) => (anec.id === id ? votedAnecdote : anec));
    },
    set: (state, action) => action.payload,
  },
});

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(set(anecdotes));
};

export const createAnecdote = (anecdote) => async (dispatch) => {
  const newAnecdote = await anecdoteService.create({
    content: anecdote,
    votes: 0,
  });
  dispatch(create(newAnecdote));
};

export const voteAnecdote = (anecdote) => async (dispatch) => {
  const updateAnecdote = await anecdoteService.update(anecdote.id, {
    ...anecdote,
    votes: anecdote.votes + 1,
  });
  dispatch(vote(updateAnecdote));
};

export const { create, vote, set } = anecdoteSlide.actions;
export default anecdoteSlide.reducer;
