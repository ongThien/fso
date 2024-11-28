import axios from "axios";
import { Entry, EntryWithoutID } from "../types";

import { apiBaseUrl } from "../constants";

const create = async (id: string | Uint8Array, object: EntryWithoutID) => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, object);
  console.log("DATA", data);

  return data;
}

export default {
  create,
}
