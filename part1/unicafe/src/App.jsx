import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [avg, setAvg] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleClickGood = () => {
    const tmpGood = good + 1;
    setGood(tmpGood);
    const tmpAll = tmpGood + neutral + bad;
    setAll(tmpAll)
    const tmpAvg = (tmpGood + bad * -1) / tmpAll;
    setAvg(tmpAvg);
    const tmpPositive = tmpGood / tmpAll * 100;
    setPositive(tmpPositive);
  }

  const handleClickNeutral = () => {
    const tmpNeutral = neutral + 1;
    setNeutral(tmpNeutral);
    const tmpAll = good + tmpNeutral + bad;
    setAll(tmpAll);
    const tmpAvg = (good + bad * -1) / tmpAll;
    setAvg(tmpAvg);
    const tmpPositive = (good / tmpAll) * 100;
    setPositive(tmpPositive);
  }

  const handleClickBad = () => {
    const tmpBad = bad + 1;
    setBad(tmpBad);
    const tmpAll = good + neutral + tmpBad;
    setAll(tmpAll);
    const tmpAvg = (good + tmpBad * -1) / tmpAll;
    setAvg(tmpAvg);
    const tmpPositive = (good / tmpAll) * 100;
    setPositive(tmpPositive);
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
      <p>All {all}</p>
      <p>Average {avg}</p>
      <p>Positive {positive}%</p>
    </>
  );
}

export default App
