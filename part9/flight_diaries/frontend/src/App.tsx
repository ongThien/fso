import { useState, useEffect } from 'react';
import diaryServices from './services/diary';
import DiaryForm from './components/DiaryForm';
import DiaryEntries from './components/DiaryEntries';
import { NonSensitiveDiaryEntry } from './types';

function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diaryServices.getAllEntries()
      .then(entries => setEntries(entries))
      .catch(err => console.log(err))
  }, []);

  const addEntries = (entry: NonSensitiveDiaryEntry) => setEntries((prevState) => [...prevState, entry]);

  return <>
    <DiaryForm addEntries={addEntries} />
    <DiaryEntries entries={entries} />
  </>
}

export default App
