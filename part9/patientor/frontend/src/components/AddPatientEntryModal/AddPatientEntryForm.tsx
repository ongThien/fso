import { useState } from "react";
import { Button, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Diagnosis, EntryWithoutID, EntryType, HealthCheckRating } from "../../types";
import diagnosesServices from "../../services/diagnoses";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutID) => void;
}

const diagnosisCodes = Object.values<Diagnosis>(await diagnosesServices.getAll()).map(d => d.code);
const healthCheckOptions = Object.entries(HealthCheckRating)
  .map(([key, value]) => ({ value: value as HealthCheckRating, label: key }))
  .filter((label) => isNaN(Number(label.value)));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Initialize formData based on type
const initializeFormData = (type: EntryType): EntryWithoutID => {
  switch (type) {
    case EntryType.HealthCheck:
      return {
        type: EntryType.HealthCheck,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0,
      };
    case EntryType.OccupationalHealthcare:
      return {
        type: EntryType.OccupationalHealthcare,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
      };
    case EntryType.Hospital:
      return {
        type: EntryType.Hospital,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: { date: "", criteria: "" },
      };
    default:
      return {
        type: EntryType.HealthCheck,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0,
      };
  }
};

const AddPatientEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [formData, setFormData] = useState<EntryWithoutID>(initializeFormData(EntryType.HealthCheck));

  // Update form data based on the selected entry type
  const updateFormData = <T extends keyof EntryWithoutID>(key: T, value: EntryWithoutID[T]) => {
    setFormData(prevState => ({ ...prevState, [key]: value }));
  };

  const addEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleTypeChange = (newType: EntryType) => {
    setFormData(initializeFormData(newType));  // Re-initialize formData when type changes
  };

  return (
    <form onSubmit={addEntry}>
      <CommonFields formData={formData} updateFormData={updateFormData} onTypeChange={handleTypeChange} />
      <HealthCheckForm formData={formData} updateFormData={updateFormData} />
      <OccupationalHealthcareForm formData={formData} updateFormData={updateFormData} />
      <HospitalForm formData={formData} updateFormData={updateFormData} />

      <Grid container spacing={2}>
        <Grid item>
          <Button
            style={{ float: "left" }}
            color="secondary"
            variant="contained"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button style={{ float: "right" }} type="submit" variant="contained">
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const CommonFields = ({ formData, updateFormData, onTypeChange }: { formData: EntryWithoutID, updateFormData: Function, onTypeChange: Function }) => (
  <>
    <InputLabel>Type</InputLabel>
    <Select
      fullWidth
      value={formData.type}
      onChange={({ target }) => onTypeChange(target.value)}
      MenuProps={MenuProps}
      required
    >
      <MenuItem value={EntryType.HealthCheck}>HealthCheck</MenuItem>
      <MenuItem value={EntryType.OccupationalHealthcare}>OccupationalHealthcare</MenuItem>
      <MenuItem value={EntryType.Hospital}>Hospital</MenuItem>
    </Select>

    <InputLabel>Description</InputLabel>
    <TextField
      fullWidth
      value={formData.description}
      onChange={({ target }) => updateFormData('description', target.value)}
      required
    />
    <InputLabel>Date</InputLabel>
    <TextField
      type="date"
      fullWidth
      value={formData.date}
      onChange={({ target }) => updateFormData('date', target.value)}
      required
    />
    <InputLabel>Specialist</InputLabel>
    <TextField
      fullWidth
      value={formData.specialist}
      onChange={({ target }) => updateFormData('specialist', target.value)}
      required
    />
    <InputLabel>Diagnosis</InputLabel>
    <Select
      fullWidth
      multiple
      value={formData.diagnosisCodes}
      onChange={({ target }) => updateFormData('diagnosisCodes', formData.diagnosisCodes?.concat(target.value))}
      MenuProps={MenuProps}
    >
      {diagnosisCodes.map((code) => (
        <MenuItem key={code} value={code}>{code}</MenuItem>
      ))}
    </Select>
  </>
);

const HealthCheckForm = ({ formData, updateFormData }: { formData: EntryWithoutID, updateFormData: Function }) => {
  if (formData.type !== EntryType.HealthCheck) return null;

  return <>
  <InputLabel>Health Check Rating</InputLabel>
  <Select
    fullWidth
    value={formData.healthCheckRating}
    onChange={({ target }) => updateFormData('healthCheckRating', Number(target.value))}
    MenuProps={MenuProps}
    required
  >
    {healthCheckOptions.map((option) => (
      <MenuItem key={option.label} value={option.label}>
        {option.value}
      </MenuItem>
    ))}
  </Select>
</>
};

const OccupationalHealthcareForm = ({ formData, updateFormData }: { formData: EntryWithoutID, updateFormData: Function }) => {

  if (formData.type !== EntryType.OccupationalHealthcare) return null;

  return <>
  <InputLabel>Employer Name</InputLabel>
  <TextField
    fullWidth
    value={formData.employerName}
    onChange={({ target }) => updateFormData('employerName', target.value)}
  />
  <InputLabel>Sick Leave (start date)</InputLabel>
  <TextField
    type="date"
    fullWidth
    value={formData.sickLeave?.startDate}
    onChange={({ target }) => updateFormData('sickLeave', { ...formData.sickLeave, startDate: target.value })}
  />
  <InputLabel>Sick Leave (end date)</InputLabel>
  <TextField
    type="date"
    fullWidth
    value={formData.sickLeave?.endDate}
    onChange={({ target }) => updateFormData('sickLeave', { ...formData.sickLeave, endDate: target.value })}
  />
</>
};

const HospitalForm = ({ formData, updateFormData }: { formData: EntryWithoutID, updateFormData: Function }) => {
  if (formData.type !== EntryType.Hospital) return null;

  return <>
  <InputLabel>Discharge Date</InputLabel>
  <TextField
    type="date"
    fullWidth
    value={formData.discharge.date}
    onChange={({ target }) => updateFormData('discharge', { ...formData.discharge, date: target.value })}
  />
  <InputLabel>Discharge Criteria</InputLabel>
  <TextField
    fullWidth
    value={formData.discharge.criteria}
    onChange={({ target }) => updateFormData('discharge', { ...formData.discharge, criteria: target.value })}
    required
  />
</>
};

export default AddPatientEntryForm;
