import { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
    </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad

  const calculateAverage = (good - bad) / all

  const positiveFeedback = (good / all) * 100

  if (all === 0) {
    return <p>No feedback given</p>
  } 
  
  return (
  <table>
    <tbody>
      <StatisticLine text="good" value ={good}/>
      <StatisticLine text="neutral" value ={neutral}/>
      <StatisticLine text="bad" value = {bad}/>
      <StatisticLine text="all" value ={all}/>
      <StatisticLine text="average" value = {calculateAverage}/>
      <StatisticLine text="positive feedback" value ={`${positiveFeedback}%`} />
    </tbody>
  </table>
  )
}

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
