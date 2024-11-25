import { Diagnosis } from "../types";
import diagnoseEntries from "../../data/diagnoses";

const getDiagnoses = (): Array<Diagnosis> => diagnoseEntries;

export default {
  getDiagnoses,
};
