import { UUIDTypes, v4 as uuidv4 } from "uuid";
import patientEntries from "../../data/patients-full";
import { EntryWithoutID, NewPatient, Patient } from "../types";

const getPatients = (): Array<Patient> => patientEntries;

const getPatientById = (id: UUIDTypes) => {
  return patientEntries.find(patient => patient.id === id);
}

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    ...patient,
    id: uuidv4(),
    entries: [],
  };
  patientEntries.push(newPatient);
  return newPatient;
};

const addPatientEntry = (patientId: UUIDTypes, entry: EntryWithoutID) => {
  const patient = patientEntries.find(patient => patient.id === patientId);
  if (patient) {
    const newEntry = { id: uuidv4(), ...entry }
    patient.entries.push(newEntry);
    return newEntry;
  }

  return;
}

export default {
  getPatients,
  getPatientById,
  addPatient,
  addPatientEntry,
};
