const Header = ({ name }) => <h2>{name}</h2>;

const Part = ({ name, exersises }) => (
  <p>
    {name} {exersises}
  </p>
);

const Total = ({ parts }) => {
  const totalExercises = parts.reduce(
    (total, currPart) => total + currPart.exercises,
    0
  );

  return (
    <p>
      <b>
        total of {totalExercises}{" "}
        {totalExercises === 0 ? "exercise" : "exercises"}
      </b>
    </p>
  );
};

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


export default Course;