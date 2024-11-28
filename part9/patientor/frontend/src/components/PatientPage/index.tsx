import React, { useState } from "react";
import axios from "axios";

import { Box, Button, Typography } from "@mui/material";
import { LocalHospital, MonitorHeart, Favorite } from '@mui/icons-material';
import AddPatientEntryModal from "../AddPatientEntryModal";

import patientEntriesServices from "../../services/patientEntries";
import { Entry, EntryWithoutID, Patient, IHospitalEntry, IOccupationalHealthcareEntry, IHealthCheckEntry, Gender } from "../../types";

const assertNever = (value: any): never => {
  throw new Error(`Unhandle discriminated union: ${JSON.stringify(value)}`);
}

interface PatientPageProps {
  patient: Patient | null | undefined;
}

const PatientPage = ({ patient }: PatientPageProps) => {
  if (!patient) return <p>No record of this patient.</p>

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [entries, setEntries] = useState(patient.entries);

  const { id, name, dateOfBirth, gender, ssn, occupation } = patient;

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutID) => {
    try {
      const entry = await patientEntriesServices.create(id, values);
      setEntries(entries.concat(entry));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.log("ERROR", e);

        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  }

  return <Box sx={{ marginTop: 4 }}>
    <PatientInfo {...{ name, dateOfBirth, gender, ssn, occupation }} />

    <Box sx={{ marginTop: 8 }}>
      <Typography variant="h6">entries</Typography>
      <Entries entries={entries} />
    </Box>
    <AddPatientEntryModal modalOpen={modalOpen} onClose={closeModal} onSubmit={submitNewEntry} error={error} />
    <Button variant="contained" sx={{ marginTop: 4 }} onClick={() => openModal()}>
      Add New Entry
    </Button>
  </Box>
};

interface PatientInfoProps {
  name: string;
  gender: Gender;
  occupation: string;
  ssn?: string;
  dateOfBirth?: string;
}

const PatientInfo = ({ name, dateOfBirth, gender, ssn, occupation }: PatientInfoProps) => {

  return <>
    <Typography variant="h5">{name}</Typography>
    <p>D.O.B: {dateOfBirth ? dateOfBirth : "N/A"}</p>
    <p>gender: {gender}</p>
    {ssn && <p>ssn: {ssn}</p>}
    <p>occupation: {occupation}</p>
  </>
}

const Entries = ({ entries }: EntriesProps) => {
  // console.log("ENTRIES", entries);

  if (!entries || entries.length === 0) return <p>No entry found.</p>

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
    <p>{icon} {date} {employerName && employerName}</p>
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
