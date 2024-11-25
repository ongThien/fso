import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import diagnoseServices from "../../services/diagnoses";

import { Diagnosis, Entry, Patient } from "../../types";

interface PatientPageProps {
  patient: Patient | null | undefined;
}

const PatientPage = ({ patient }: PatientPageProps) => {

  if (!patient) return <p>Could not found this patient record.</p>

  return <Box sx={{ marginTop: 8 }}>
    <Typography variant="h5">{patient?.name}</Typography>
    <p>D.O.B: {patient.dateOfBirth}</p>
    <p>gender: {patient.gender}</p>
    <p>ssn: {patient.ssn}</p>
    <p>occupation: {patient.occupation}</p>

    <Typography variant="h6">entries</Typography>
    <Entries entries={patient.entries} />
  </Box>
};

interface EntriesProps {
  entries: Array<Entry> | [];
}

const Entries = ({ entries }: EntriesProps) => {
  // console.log("ENTRIES", entries);

  if (entries.length === 0) return <p>No entry found.</p>

  return <>
    {entries.map((e) => {
      return <div key={e.id}>
        <p>{e.date} {e.description}</p>
        {e.diagnosisCodes && <DiagnosisList diagnosisCodes={e.diagnosisCodes} />}
      </div>
    })}
  </>
}

interface DiagnosisListProps {
  diagnosisCodes: string[];
}

const DiagnosisList = ({ diagnosisCodes }: DiagnosisListProps) => {
  // console.log("DIACODE:", diagnosisCodes);

  const [diagnosis, setDiagnosis] = useState<Array<Diagnosis>>([]);

  useEffect(() => {
    const getDiagnosis = async () => {
      const data = await diagnoseServices.getAll();
      // console.log(data);
      const entryDiagnoses = diagnosisCodes.map((code) => {
        const diagnosis = data.find(d => code === d.code);
        // console.log("entry", entry);
        return diagnosis;
      }).filter((diagnosis) => diagnosis !== undefined);

      setDiagnosis(entryDiagnoses);

    }

    void getDiagnosis();
  }, []);

  return <ul>
    {diagnosis.map((d) => <li key={d.code}>{d.code} {d.name}</li>)}
  </ul>
}

export default PatientPage;
