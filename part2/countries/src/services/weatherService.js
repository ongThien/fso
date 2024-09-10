import axios from "axios";

const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY;
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";

const getWeatherByCityName = (cityName) => {
  const req = axios.get(`${baseURL}${cityName}&appid=${api_key}&units=metric`);
  return req.then((res) => res.data);
};

export default {
  getWeatherByCityName,
};
