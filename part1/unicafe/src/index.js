import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = props => <div className="h1">{props.value}</div>

const Statistics = props => (
  <>
    <div>good {props.good}</div>
    <div>neutral {props.neutral}</div>
    <div>bad {props.bad}</div>
  </>
)

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