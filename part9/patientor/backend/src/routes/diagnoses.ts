import express, { Request, Response } from "express";
import diagnoseService from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.status(200).json(diagnoseService.getDiagnoses());
});

export default router;