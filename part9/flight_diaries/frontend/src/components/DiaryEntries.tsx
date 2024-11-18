import { useState, useEffect } from "react";
import diaryServices from "../services/diary";
import { NonSensitiveDiaryEntry, DiaryProps } from "../types";

const DiaryEntry = (props: DiaryProps) => {
  const { date, weather, visibility } = props.entry;

  return <>
    <h2>{date}</h2>
    <p>visibility: {visibility}</p>
    <p>weather: {weather}</p>
  </>
};

const DiaryEntries = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diaryServices.getAll()
    .then((data) => setEntries(data))
    .catch(err => console.log(err));
  }, []);

  if (!entries) return null;

  return <>
    <h2>Diary entries</h2>
    {entries.map(entry => <DiaryEntry key={entry.id} entry={entry}/>)}
  </>
};

export default DiaryEntries;
