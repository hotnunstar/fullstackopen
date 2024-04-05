const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0].name} exercise={parts[0].exercises}></Part>
      <Part part={parts[1].name} exercise={parts[1].exercises}></Part>
      <Part part={parts[2].name} exercise={parts[2].exercises}></Part>
    </div>
  )
}

const Part = (props) =>{
  return(
    <p>{props.part} {props.exercise}</p>
  )
}

const Total = ({ parts }) => {
  return <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

export default App