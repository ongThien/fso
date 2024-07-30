import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  }

  const handleClickBad = () => {
    setBad(bad + 1);
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text={"Good"}></Button>
      <Button handleClick={handleClickNeutral} text={"Neutral"}></Button>
      <Button handleClick={handleClickBad} text={"Bad"}></Button>

      <h2>statistics</h2>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
    </>
  );
}

export default App
