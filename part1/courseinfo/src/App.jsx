const Header = ({ course }) => {

  return (
    <h1>{course}</h1>
  )
}

const Part = ({ partName, exercises }) => {
  return (
    <p>{partName} {exercises}</p>
  )
}

const Content = ({ parts }) => {
  // console.log(props)
  const contents = parts.map((part, key) => (
    <Part key={key} partName={part.name} exercises={part.exercises} />
  ));

  return <div>{contents}</div>;
};
  

const Total = ({ parts }) => {
  const totalExecises = parts.reduce(
    (totalExecises, part) => totalExecises + part.exercises, 0
  );

  console.log("totalExecises =", totalExecises);
  return <p>Number of exercises: {totalExecises}</p>;
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
