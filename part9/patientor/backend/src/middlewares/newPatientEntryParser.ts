import { Request, Response, NextFunction } from "express";
import { EntrySchemaWithoutID } from "../utils/utils";

const newPatientEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    EntrySchemaWithoutID.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default newPatientEntryParser;
