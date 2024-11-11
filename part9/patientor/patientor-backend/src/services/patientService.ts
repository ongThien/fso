import patientEntries from "../../data/patients";
import { NonSensitivePatientEntry } from "../types";

const getPatients = (): Array<NonSensitivePatientEntry> =>
  patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

export default {
  getPatients,
};