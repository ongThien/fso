import React from "react";
import { Box, Typography } from "@mui/material";

import { LocalHospital, MonitorHeart, Favorite } from '@mui/icons-material';

import { Entry, Patient, IHospitalEntry, IOccupationalHealthcareEntry, IHealthCheckEntry } from "../../types";

const assertNever = (value: any): never => {
  throw new Error(`Unhandle discriminated union: ${JSON.stringify(value)}`);
}

interface PatientPageProps {
  patient: Patient | null | undefined;
}

const PatientPage = ({ patient }: PatientPageProps) => {

  if (!patient) return <p>No record of this patient.</p>

  return <Box sx={{ marginTop: 8 }}>
    <Typography variant="h5">{patient.name}</Typography>
    <p>D.O.B: {patient.dateOfBirth}</p>
    <p>gender: {patient.gender}</p>
    <p>ssn: {patient.ssn}</p>
    <p>occupation: {patient.occupation}</p>

    <Typography variant="h6">entries</Typography>
    <Entries entries={patient.entries} />
  </Box>
};

const Entries = ({ entries }: EntriesProps) => {
  // console.log("ENTRIES", entries);

  if (entries.length === 0) return <p>No entry found.</p>

  return <>
    {entries.map((entry) => <EntryDetails key={entry.id} entry={entry} />)}
  </>
}

interface EntriesProps {
  entries: Array<Entry>;
}

interface EntryDetailsProps {
  entry: Entry;
}

interface HospitalEntryProps {
  entry: IHospitalEntry;
}

interface OccupationalHealthcareEntryProps {
  entry: IOccupationalHealthcareEntry
}

interface HealthCheckEntryProps {
  entry: IHealthCheckEntry;
}

interface EntryBaseProps {
  date: string;
  icon: React.ReactNode;
  description: string;
  specialist: string;
  employerName?: string;
  healthCheckRating?: number;
  additionalInfo?: string;
}

const EntryDetails = ({ entry }: EntryDetailsProps) => {

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
}

const EntryBase = ({ date, icon, description, specialist, employerName, healthCheckRating }: EntryBaseProps) => {

  const getHealthCheckRatingColor = (rating: number): "primary" | "secondary" | "error" | "warning" => {
    switch (rating) {
      case 0:
        return "primary";
      case 1:
        return "secondary";
      case 2:
        return "warning";
      case 3:
        return "error";
      default:
        return assertNever(rating);
    }
  };

  return <div style={{
    border: 1,
    borderStyle: "solid",
    borderColor: "#333",
    marginBottom: 4,
    padding: 4,
  }}>
    <p>{date} {icon} {employerName && employerName}</p>
    <p><i>{description}</i></p>
    {(healthCheckRating !== undefined) && <p><Favorite color={getHealthCheckRatingColor(healthCheckRating)} /> healthcheck rating: {healthCheckRating}</p>}
    <p>diagnosed by {specialist}</p>
  </div>
}

const HospitalEntry = ({ entry }: HospitalEntryProps) => {
  return <EntryBase
    date={entry.date}
    icon={<LocalHospital />}
    description={entry.description}
    specialist={entry.specialist} />

};

const OccupationalHealthcareEntry = ({ entry }: OccupationalHealthcareEntryProps) => {
  return <EntryBase
    date={entry.date}
    icon={<MonitorHeart />}
    description={entry.description}
    specialist={entry.specialist}
    employerName={entry.employerName} />
};

const HealthCheckEntry = ({ entry }: HealthCheckEntryProps) => {
  return <EntryBase
    date={entry.date}
    icon={<LocalHospital />}
    description={entry.description}
    specialist={entry.specialist}
    healthCheckRating={entry.healthCheckRating} />
};

export default PatientPage;
