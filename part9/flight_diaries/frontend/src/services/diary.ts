import axios from "axios";
import { NonSensitiveDiaryEntry } from "../types";

const baseURL = "http://localhost:3000/api/diaries";

const getAll = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseURL);
  return response.data;
};

export default {
  getAll,
}
