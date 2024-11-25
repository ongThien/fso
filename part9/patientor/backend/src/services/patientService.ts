import { UUIDTypes, v4 as uuidv4 } from "uuid";
import patientEntries from "../../data/patients-full";
import { NewPatient, Patient } from "../types";

const getPatients = (): Array<Patient> => patientEntries;

const getPatientById = (id: UUIDTypes) => {
  return patientEntries.find(patient => patient.id === id);
}

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };
  patientEntries.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
};
