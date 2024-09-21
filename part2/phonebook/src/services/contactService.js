import axios from "axios";

const baseUrl = "/api/contacts";

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = (contact) => {
  const req = axios.post(baseUrl, contact);
  return req.then((res) => res.data);
};

const updateById = (id, contact) => {
  const req = axios.put(`${baseUrl}/${id}`, contact);
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
