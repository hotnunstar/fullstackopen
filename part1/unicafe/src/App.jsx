import { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Buttons = (props) => {
  return (
    <div>
      <Button handleClick={props.handleGoodClick} text="Good" />
      <Button handleClick={props.handleNeutralClick} text="Neutral" />
      <Button handleClick={props.handleBadClick} text="Bad" />
    </div>
  )
}

const StatisticLine = (props) => {
  if(props.text == "Positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}%</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return <div>No feedback given</div>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={props.good} />
        <StatisticLine text="Neutral" value={props.neutral} />
        <StatisticLine text="Bad" value={props.bad} />
        <StatisticLine text="All" value={props.all} />
        <StatisticLine text="Average" value={props.average} />
        <StatisticLine text="Positive" value={props.positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  
  const formattedNumber = (number) => {
    return Number.isInteger(number) ? number : number.toFixed(2)
  } 

  const handleGoodClick = () => {
    setGood(good + 1);
    setAll(1 + good + neutral + bad)
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAll(1 + good + neutral + bad)
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setAll(1 + good + neutral + bad)
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Buttons handleGoodClick={handleGoodClick} handleBadClick={handleBadClick} handleNeutralClick={handleNeutralClick}></Buttons>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={formattedNumber((good - bad) / all)} positive={formattedNumber((good / all) * 100)} />
    </div>
  );
};

export default App;