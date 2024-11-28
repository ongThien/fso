import { Request, Response, NextFunction } from "express";
import { PatientSchema } from "../utils/utils";

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    // console.log(req.body);
    PatientSchema.parse(req.body);

    next();
  } catch (error: unknown) {
    console.log(error);

    next(error);
  }
};

export default newPatientParser;
