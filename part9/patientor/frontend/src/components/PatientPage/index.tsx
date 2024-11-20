import { Box, Typography } from "@mui/material";
import { Patient } from "../../types";

interface Props {
  patient: Patient | null | undefined
}

const PatientPage = ({ patient }: Props) => {

  return <Box sx={{marginTop: 8}}>
    <Typography variant="h5">{patient?.name}</Typography>
    <p>D.O.B: {patient?.dateOfBirth}</p>
    <p>gender: {patient?.gender}</p>
    <p>occupation: {patient?.occupation}</p>
  </Box>
};

export default PatientPage;
