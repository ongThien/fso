const Header = ({ name }) => <h1>{name}</h1>;

const Part = ({ name, exersises }) => (
  <p>
    {name} {exersises}
  </p>
);

const Total = ({parts}) => {
  const totalExercises = parts.reduce(
    (total, currPart) => total + currPart.exercises,
    0
  );

  return (
    <p>
      <b>
        total of {totalExercises} {totalExercises === 0 ? 'exercise' : 'exercises'}
      </b>
    </p>
  );
}

const Content = ({ parts }) =>
  parts.map((part) => (
    <Part key={part.id} name={part.name} exersises={part.exercises} />
  ));

const Course = ({ course }) => {
  // console.log(course);
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
