import express, { Request, Response } from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.status(200).json(patientService.getPatients());
});

export default router;
