import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = props => <div className="h1">{props.value}</div>

const Statistics = ({ good, neutral, bad}) => {
  const all = good + neutral + bad;
  const score = good * 1 + bad * -1;
  return (  
    <>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all { all }</div>
      <div>average { all > 0? score/ all : 0 }</div>
      <div>positive { all > 0? (good / all) * 100 : 0 }%</div>
    </>
  )
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