import z from "zod";
import { Diagnose } from "../types";

export const DiagnoseSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export const toDiagnose = (obj: unknown): Diagnose =>
  DiagnoseSchema.parse(obj);
