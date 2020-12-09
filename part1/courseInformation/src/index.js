import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  );
}

const Content = ({ exercises, parts }) =>{

  return (
    <>
      <p>
        {parts.part1} {exercises.exercises1}
      </p>
      <p>
        {parts.part2} {exercises.exercises2}
      </p>
      <p>
        {parts.part3} {exercises.exercises3}
      </p>
    </>
  );
}

const Total = ({ exercises }) => {
  return (<p>Number of exercises {exercises.exercises1 + exercises.exercises2 + exercises.exercises3}</p>);
}



const App = () => {
  const course = 'Half Stack application development';

  const part1 = 'Fundamentals of React';
  const part2 = 'Using props to pass data';
  const part3 = 'State of a component';

  const exercises1 = 10;
  const exercises2 = 7;
  const exercises3 = 14;

  return (
    <div>
      <Header course={ course } />
      <Content exercises={ { exercises1, exercises2, exercises3 } } parts={ { part1, part2, part3 } }/>
      <Total exercises={ { exercises1, exercises2, exercises3 } }/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
