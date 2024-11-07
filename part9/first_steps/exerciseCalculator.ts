interface Result {
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
): Result => {
  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter((hours) => hours !== 0).length,
    success: false,
    rating: targetValue,
    ratingDescription: "not too bad but could be better",
    target: targetValue,
    average:
      exerciseHours.reduce((total, cur) => total + cur, 0) /
      exerciseHours.length,
  };
};

console.log(calculateExercise(2, [3, 0, 2, 4.5, 0, 3, 1]));

export default calculateExercise;
