import { useState } from 'react'

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBaseWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBaseWithDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Header = ({ name }: { name: string }) => <h1>{name}</h1>;

const Part = ({ part }: { part: CoursePart }) => {

  const assertNever = (value: never): never => {
    throw new Error(`Unhandle discriminated union member ${JSON.stringify(value)}`);
  }

  switch (part.kind) {
    case "basic":
      return <>
        <h3>{part.name} {part.exerciseCount}</h3>
        <p><i>{part.description}</i></p>
      </>
    case "group":
      return <>
        <h3>{part.name} {part.exerciseCount}</h3>
        <p>project exercise {part.groupProjectCount}</p>
      </>
    case "background":
      return <>
        <h3>{part.name} {part.exerciseCount}</h3>
        <p><i>{part.description}</i></p>
        <p>material: {[part.backgroundMaterial]}</p>
        <p>submit to <a href="">http://made-up-url.dev</a></p>
      </>
    case "special":
      return <>
        <h3>{part.name} {part.exerciseCount}</h3>
        <p><i>{part.description}</i></p>
        <p>required skills: {part.requirements.join(", ")}</p>
      </>
    default:
      return assertNever(part);
  }

}

const Content = ({ parts }: { parts: CoursePart[] }): JSX.Element => {
  return <>
    {parts.map((part, id) => <Part key={id} part={part} />)}
  </>;
};

const Total = ({ total }: { total: number }) => <p>Number of exercises {total}</p>;

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
