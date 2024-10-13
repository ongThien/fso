import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

// Using manually created thunks

const anecdoteSlide = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    create: (state, action) => [...state, action.payload],
    vote: (state, action) => {
      const upvoted = action.payload;
      return state.map((anec) => (anec.id === upvoted.id ? upvoted : anec));
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

// Using createAsyncThunk

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import anecdoteService from "../services/anecdotes";

// export const initializeAnecdotes = createAsyncThunk(
//   'anecdotes/fetchAll',
//   async () => {
//     const anecdotes = await anecdoteService.getAll();
//     return anecdotes;
//   }
// );

// export const createAnecdote = createAsyncThunk(
//   'anecdotes/create',
//   async (anecdote) => {
//     const newAnecdote = await anecdoteService.create({
//       content: anecdote,
//       votes: 0,
//     });
//     return newAnecdote;
//   }
// );

// export const voteAnecdote = createAsyncThunk(
//   'anecdotes/vote',
//   async (anecdote) => {
//     const updatedAnecdote = await anecdoteService.update(anecdote.id, {
//       ...anecdote,
//       votes: anecdote.votes + 1,
//     });
//     return updatedAnecdote;
//   }
// );

// const anecdoteSlice = createSlice({
//   name: 'anecdotes',
//   initialState: [],
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(initializeAnecdotes.fulfilled, (state, action) => {
//         return action.payload;
//       })
//       .addCase(createAnecdote.fulfilled, (state, action) => {
//         state.push(action.payload);
//       })
//       .addCase(voteAnecdote.fulfilled, (state, action) => {
//         const upvoted = action.payload;
//         return state.map((anec) => (anec.id === upvoted.id ? upvoted : anec));
//       });
//   },
// });

// export default anecdoteSlide.reducer;
