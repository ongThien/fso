import { parseArguments } from "./utils/utils";

interface ExcersiseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercise = (
  targetValue: number,
  exerciseHours: number[]
): ExcersiseReport => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hours) => hours !== 0).length;
  const totalExercise = exerciseHours.reduce((total, cur) => total + cur, 0);
  const average = totalExercise / periodLength;
  const success = average >= targetValue;

  // Determine rating and rating description
  let rating;
  let ratingDescription;

  if (average >= targetValue) {
    rating = 3;
    ratingDescription = "good";
  } else if (average >= 0.75 * targetValue) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "bad";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetValue,
    average,
  };
};

if (require.main === module) {
  const { firstArg: targetValue, rest: exerciseHours } = parseArguments(
    process.argv
  );
  console.log(calculateExercise(targetValue, exerciseHours));
}

export default calculateExercise;
