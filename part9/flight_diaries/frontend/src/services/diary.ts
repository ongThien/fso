import axios from "axios";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const baseURL = "http://localhost:3000/api/diaries";

const getAllEntries = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseURL);
  return response.data;
};

const createDiaryEntry = async (diaryEntry: NewDiaryEntry) => {
  const response = await axios.post<NonSensitiveDiaryEntry>(baseURL, diaryEntry);
  return response.data;
};

export default {
  getAllEntries,
  createDiaryEntry
}
