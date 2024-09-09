import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/";

const getAllCountries = () => {
  const req = axios.get(`${baseURL}/all`);
  return req.then((res) => res.data);
};

const getCountryByName = (name) => {
  const req = axios.get(`${baseURL}/name/${name}`);
  return req.then((res) => res.data);
};

export default {
  getAllCountries,
  getCountryByName,
};
