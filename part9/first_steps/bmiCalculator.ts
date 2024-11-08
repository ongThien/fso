import { parseArguments } from "./utils/utils";

const calculateBMI = (height: number, mass: number): string => {
  if (height <= 0)
    throw new Error(`Invalid height (in centimeters): ${height}`);

  const bmi = mass / Math.pow(height / 100, 2);

  console.log("BMI:", bmi);

  switch (true) {
    case bmi < 16.0:
      return "Underweight (Severe thinness) ";
    case 16.0 <= bmi && bmi <= 16.9:
      return "Underweight (Moderate thinness) ";
    case 17.0 <= bmi && bmi <= 18.4:
      return "Underweight (Mild thinness) ";
    case 18.5 <= bmi && bmi <= 24.9:
      return "Normal range";
    case 25.0 <= bmi && bmi <= 29.9:
      return "Overweight";
    case 30.0 <= bmi && bmi <= 34.9:
      return "Obese (Class I)";
    case 35.0 <= bmi && bmi <= 39.9:
      return "Obese (Class II)";
    case 40.0 <= bmi:
      return "Obese (Class III)";
    default:
      throw new Error(
        `No category found for height (in centimeters): ${height}, mass (in kilograms): ${mass}`
      );
  }
};

try {
  const { firstArg: height, rest } = parseArguments(process.argv);
  if (rest.length !== 1) throw new Error("Usage: npm run calculateBmi <height (in centimeters)> <mass (in kilograms)>");
  const [mass] = rest;
  console.log(calculateBMI(height, mass));
} catch (error: unknown) {
  let errorMsg = "Invalid arguments. ";
  if (error instanceof Error) {
    errorMsg += error.message;
  }
  console.log(errorMsg);
}

export default calculateBMI;
