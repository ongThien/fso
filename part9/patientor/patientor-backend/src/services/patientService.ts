import { v4 as uuidv4 } from "uuid";
import patientEntries from "../../data/patients";
import { NonSensitivePatientEntry, NewPatientEntry } from "../types";

const getPatients = (): Array<NonSensitivePatientEntry> =>
  patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const addPatient = (patient: NewPatientEntry): NonSensitivePatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...patient,
  };
  patientEntries.push(newPatientEntry);
  const { id, name, dateOfBirth, gender, occupation } = newPatientEntry;
  return { id, name, dateOfBirth, gender, occupation };
};

export default {
  getPatients,
  addPatient,
};
