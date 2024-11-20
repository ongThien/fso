import { UUIDTypes, v4 as uuidv4 } from "uuid";
import patientEntries from "../../data/patients";
import { NonSensitivePatient, NewPatient } from "../types";

const getPatients = (): Array<NonSensitivePatient> =>
  patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const getPatientById = (id: UUIDTypes) => {
  return patientEntries.find(patient => patient.id === id);
}

const addPatient = (patient: NewPatient): NonSensitivePatient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };
  patientEntries.push(newPatient);
  const { id, name, dateOfBirth, gender, occupation } = newPatient;
  return { id, name, dateOfBirth, gender, occupation };
};

export default {
  getPatients,
  getPatientById,
  addPatient,
};
