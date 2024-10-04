import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const update = async (id, newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.put(`${baseUrl}/${id}`, newBlog, config);
  return res.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.delete(`${baseUrl}/${id}`, config);
  console.log("RESPONSE WHEN DELETE", res)
  return res;
}

export default { getAll, create, update, remove, setToken };
