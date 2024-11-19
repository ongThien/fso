import { NonSensitiveDiaryEntry } from "../types";

interface DiaryEntriesProps {
  entries: NonSensitiveDiaryEntry[];
}

interface DiaryEntryProps {
  entry: NonSensitiveDiaryEntry;
}

const DiaryEntries = ({entries}: DiaryEntriesProps) => {

  if (!entries) {
    return <>
    <h2>Diary entries</h2>
    <p>No entries found...</p>
  </>
  }

  return <>
    <h2>Diary entries</h2>
    {entries.map(entry => <DiaryEntry key={entry.id} entry={entry}/>)}
  </>
};

const DiaryEntry = ({entry}: DiaryEntryProps) => {
  const { date, weather, visibility } = entry;

  return <>
    <h2>{date}</h2>
    <p>visibility: {visibility}</p>
    <p>weather: {weather}</p>
  </>
};

export default DiaryEntries;
