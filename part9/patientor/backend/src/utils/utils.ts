import z from "zod";
import { Diagnose, Gender, NewPatient } from "../types";

const DiagnoseSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export const toDiagnose = (obj: unknown): Diagnose =>
  DiagnoseSchema.parse(obj);


export const PatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(z.object({})),
});

export const toPatient = (obj: unknown): NewPatient => PatientSchema.parse(obj);
