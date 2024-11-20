import { Request, Response, NextFunction } from "express";
import { PatientSchema } from "../utils/utils";

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    PatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default newPatientParser;
