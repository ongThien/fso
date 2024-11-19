import axios from "axios";
import { useState } from "react";
import diaryServices from "../services/diary";
import { Weather, Visibility, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

interface DiaryFormProps {
  addEntries: (newEntry: NonSensitiveDiaryEntry) => void;
}

const DiaryForm = ({addEntries}: DiaryFormProps) => {

  const initialState: NewDiaryEntry = {
    date: "",
    visibility: Visibility.Great,
    weather: Weather.Sunny,
    comment: "",
  }

  const [formData, setFormData] = useState<NewDiaryEntry>(initialState);
  const [error, setError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  const handleInputReset = () => {
    setFormData(initialState);
  }

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("FORM DATA", formData);
    try {
      const newEntry = await diaryServices.createDiaryEntry(formData);
      if (newEntry) {
        const {id, date, visibility, weather} = newEntry;
        addEntries({id, date, visibility, weather});
        handleInputReset();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // console.log(error);
        setError(error.response?.data);
        setTimeout(() => setError(""), 5000);
      }
    }
  }

  return <>
    <h2>Add new entry</h2>
    {error ? <p style={{color: "red"}}>{error}</p> : null}
    <form onSubmit={handleFormSubmit}>
      {/* Date */}
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange} />
      </label>

      {/* Visibility */}
      <div>
      Visibility: {" "}
        {Object.values(Visibility).map(v => {
          return (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={formData.visibility === v}
                onChange={handleInputChange} />
              {v}
            </label>
          );
        })}
      </div>

      {/* Weather */}
      <div>
        Weather: {" "}
        {Object.values(Weather).map(w => {
          return (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={formData.weather === w}
                onChange={handleInputChange} />
              {w}
            </label>
          );
        })}
      </div>

      {/* Comment */}
      <label>
        Comment:
        <input
          type="text"
          name="comment"
          value={formData.comment}
          onChange={handleInputChange} />
      </label>

      <div>
        <button type="submit">add</button>
        <button type="button" onClick={handleInputReset}>reset</button>
      </div>
    </form>
  </>
};

export default DiaryForm;
