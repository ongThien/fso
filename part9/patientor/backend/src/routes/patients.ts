import express, { Request, Response } from "express";
import patientService from "../services/patientService";
import newPatientParser from "../middlewares/newPatientParser";
import { NewPatient, NonSensitivePatient, Patient } from "../types";
import errorHandler from "../middlewares/errorHandler";

const router = express.Router();

router.get(
  "/",
  (_req: Request, res: Response<Array<NonSensitivePatient>>) => {
    res.status(200).json(patientService.getPatients());
  }
);

router.get("/:id", (req: Request, res: Response<Patient>) => {
  const patient = patientService.getPatientById(req.params.id);

  if (patient) {
    res.status(200).json(patient);
  } else {
    res.status(404);
  }
});

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatient>,
    res: Response<NonSensitivePatient>
  ) => {
    const newPatient = patientService.addPatient(req.body);
    res.status(201).json(newPatient);
  }
);

router.use(errorHandler);

export default router;
