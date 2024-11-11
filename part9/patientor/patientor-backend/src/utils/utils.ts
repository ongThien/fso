import z from "zod";
import { Diagnose, Gender, PatientEntry } from "../types";

const DiagnoseSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export const toDiagnose = (obj: unknown): Diagnose =>
  DiagnoseSchema.parse(obj);


const PatientSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const toPatient = (obj: unknown): PatientEntry => PatientSchema.parse(obj);