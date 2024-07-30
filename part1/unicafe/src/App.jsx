import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({text, stat}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, all, avg, positive }) => {
  if (all === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} stat={good} />
        <StatisticLine text={"neutral"} stat={neutral} />
        <StatisticLine text={"bad"} stat={bad} />
        <StatisticLine text={"all"} stat={all} />
        <StatisticLine text={"average"} stat={avg} />
        <StatisticLine text={"positive"} stat={positive + "%"} />
      </tbody>
    </table>
  );
};

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
    setAll(tmpAll);
    const tmpAvg = (tmpGood + bad * -1) / tmpAll;
    setAvg(tmpAvg);
    const tmpPositive = (tmpGood / tmpAll) * 100;
    setPositive(tmpPositive);
  };

  const handleClickNeutral = () => {
    const tmpNeutral = neutral + 1;
    setNeutral(tmpNeutral);
    const tmpAll = good + tmpNeutral + bad;
    setAll(tmpAll);
    const tmpAvg = (good + bad * -1) / tmpAll;
    setAvg(tmpAvg);
    const tmpPositive = (good / tmpAll) * 100;
    setPositive(tmpPositive);
  };

  const handleClickBad = () => {
    const tmpBad = bad + 1;
    setBad(tmpBad);
    const tmpAll = good + neutral + tmpBad;
    setAll(tmpAll);
    const tmpAvg = (good + tmpBad * -1) / tmpAll;
    setAvg(tmpAvg);
    const tmpPositive = (good / tmpAll) * 100;
    setPositive(tmpPositive);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text={"Good"}/>
      <Button handleClick={handleClickNeutral} text={"Neutral"}/>
      <Button handleClick={handleClickBad} text={"Bad"}/>

      <h2>statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        avg={avg}
        positive={positive}
      />
    </>
  );
};

export default App;
