import z from "zod";
import { EntrySchema, PatientSchema } from "./utils/utils";
import { UUIDTypes } from "uuid";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

// interface BaseEntry {
//   id: string;
//   description: string;
//   date: string;
//   specialist: string;
//   diagnosisCodes?: Array<Diagnosis["code"]>;
// }

// interface HospitalEntry extends BaseEntry {
//   type: "Hospital";
//   discharge: {
//     date: string;
//     criteria: string;
//   };
// }

// interface OccupationalHealthcareEntry extends BaseEntry {
//   type: "OccupationalHealthcare";
//   employerName: string;
//   sickLeave?: {
//     startDate: string;
//     endDate: string;
//   }
// }

// interface HealthCheckEntry extends BaseEntry {
//   type: "HealthCheck";
//   healthCheckRating: HealthCheckRating;
// }

// is using zod z.infer<typeof Schema> considered a good practice?
export type Entry = z.infer<typeof EntrySchema>;

export interface Patient {
  id: UUIDTypes;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Array<Entry>;
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = z.infer<typeof PatientSchema>;
