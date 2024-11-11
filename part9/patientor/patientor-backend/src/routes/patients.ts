import express, { Request, Response } from "express";
import patientService from "../services/patientService";
import newPatientParser from "../middlewares/newPatientParser";
import { NewPatientEntry, NonSensitivePatientEntry } from "../types";
import errorHandler from "../middlewares/errorHandler";

const router = express.Router();

router.get(
  "/",
  (_req: Request, res: Response<Array<NonSensitivePatientEntry>>) => {
    res.status(200).json(patientService.getPatients());
  }
);

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<NonSensitivePatientEntry>
  ) => {
    const newPatient = patientService.addPatient(req.body);
    res.status(201).json(newPatient);
  }
);

router.use(errorHandler);

export default router;
