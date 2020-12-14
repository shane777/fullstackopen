const Header = ({ course }) => {
  return (
    <h2>{course}</h2>
  );
}

const Content = ({ parts }) =>{
  return parts.map(part =>
    (<p key={part.id}>
      {part.name} {part.exercises}
    </p>))
}

const Total = ({ parts }) => {
  return (<p>Number of exercises { parts.reduce((p, c)=> p + c.exercises, 0)}</p>);
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={ course.name } />
      <Content parts={ course.parts } /> 
      <Total parts={ course.parts } />
    </>
  )
}

export default Course;