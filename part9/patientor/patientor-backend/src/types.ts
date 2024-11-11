export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type UUID = string;

export interface PatientEntry {
  id: UUID;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">;
