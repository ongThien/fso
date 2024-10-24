import axios from "axios";
import storage from "./storage";

const baseUrl = "/api/blogs";

const getConfig = () => ({
  headers: { Authorization: `Bearer ${storage.loadUser().token}` },
});

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const update = async (newObject) => {
  const response = await axios.put(
    `${baseUrl}/${newObject.id}`,
    newObject,
    getConfig()
  );
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig());
  return response.data;
};

const remove = async (newObject) => {
  await axios.delete(`${baseUrl}/${newObject.id}`, getConfig());
  return newObject;
};

export default { getAll, create, update, remove };
