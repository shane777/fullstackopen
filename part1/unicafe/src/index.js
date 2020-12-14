import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = props => <div className="h1">{props.value}</div>

const Statistic = props => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const Statistics = ({ good, neutral, bad}) => {
  const all = good + neutral + bad;
  const score = good * 1 + bad * -1;
  return all > 0? (  
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={score/ all} />
        <Statistic text="positive" value={`${(good / all) * 100}%`} />
      </tbody>
    </table>
  ) : <div>No feedback given</div>
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Display value="give feedback" />
      <Button handleClick={ ()=> setGood(good + 1) } text="good"/>
      <Button handleClick={ ()=> setNeutral(neutral + 1) } text="neutral"/>
      <Button handleClick={ ()=> setBad(bad + 1) } text="bad"/>
      <Display value="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
} 

ReactDOM.render(<App />, 
  document.getElementById('root')
)