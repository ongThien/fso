import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = (person) => {
  const req = axios.post(baseUrl, person);
  return req.then((res) => res.data);
};

const updateById = (id, person) => {
  const req = axios.put(`${baseUrl}/${id}`, person);
  return req.then((res) => res.data);
}

const deleteById = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => res.data);
}

export default {
  getAll,
  create,
  updateById,
  deleteById,
};
