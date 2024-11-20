import { Diagnose } from "../types";
import diagnoseEntries from "../../data/diagnoses";

const getDiagnoses = (): Array<Diagnose> => diagnoseEntries;

export default {
  getDiagnoses,
};