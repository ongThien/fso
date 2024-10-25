import axios from "axios";
import storage from "./storage";

const baseUrl = "/api/blogs";

const getConfig = () => ({
  headers: { Authorization: `Bearer ${storage.loadUser().token}` },
});

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
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

const addComment = async (blogId, commentObj) => {
  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    commentObj
  );
  return response.data;
}

export default { getAll, create, update, remove, addComment };
