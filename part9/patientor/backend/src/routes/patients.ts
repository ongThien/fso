import express, { Request, Response } from "express";

import newPatientParser from "../middlewares/newPatientParser";
import newPatientEntryParser from "../middlewares/newPatientEntryParser";
import patientService from "../services/patientService";
import errorHandler from "../middlewares/errorHandler";

import { NewPatient, NonSensitivePatient, Patient } from "../types";

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

router.post("/:id/entries", newPatientEntryParser, (req, res) => {
  // console.log("ID", req.params.id);
  // console.log("ENTRY", req.body);

  const newPatientEntry = patientService.addPatientEntry(req.params.id, req.body);
  if (!newPatientEntry) {
    res.status(400).end();
    return;
  }
  res.status(201).json(newPatientEntry);
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
