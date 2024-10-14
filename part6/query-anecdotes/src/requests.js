import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const res = await axios.get(baseURL);
  return res.data;
};

export const createAnecdote = async (anecdote) => {
  const res = await axios.post(baseURL, anecdote);
  return res.data;
}
