import z from "zod";
import { Diagnosis, Gender, NewPatient, HealthCheckRating } from "../types";

const DiagnoseSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export const toDiagnose = (obj: unknown): Diagnosis =>
  DiagnoseSchema.parse(obj);

const healthCheckRatingSchema = z.nativeEnum(HealthCheckRating);

// Base entry schema
const baseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(), // Optional diagnosis codes

});

// Hospital Entry schema
const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }).optional(),
});

// Occupational Healthcare Entry schema
const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string().optional(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }).optional(),
});

// HealthCheck Entry schema
const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: healthCheckRatingSchema,
});

// Combine all entry types into one union type
export const EntrySchema = z.union([
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
  healthCheckEntrySchema,
]);

// to be used in the creation of patient's new entry
export const EntrySchemaWithoutID = z.union([
  hospitalEntrySchema.omit({id: true}),
  occupationalHealthcareEntrySchema.omit({id: true}),
  healthCheckEntrySchema.omit({id: true}),
]);

export const PatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema).optional(),
});

export const toPatient = (obj: unknown): NewPatient => PatientSchema.parse(obj);
