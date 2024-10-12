import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const res = await axios.get(baseURL);
  return res.data;
};

const create = async (anecdote) => {
  const res = await axios.post(baseURL, anecdote);
  console.log(res);
  
  return res.data;
};

export default { getAll, create };
