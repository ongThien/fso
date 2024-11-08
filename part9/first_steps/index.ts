import express, { json } from "express";
import qs from "qs";
import calculateBMI from "./bmiCalculator";
import calculateExercise from "./exerciseCalculator";

const app = express();

app.set("query parser", (str: string) => {
  // console.log(str);
  return qs.parse(str);
});

app.use(json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  console.log(req.query);

  const { height, weight } = {
    height: Number(req.query.height),
    weight: Number(req.query.weight),
  };

  if (!height || !weight)
    res.status(400).json({ error: "malformatted parameters" });

  res.status(200).json({ height, weight, bmi: calculateBMI(height, weight) });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises: exerciseHours, target: targetValue } = req.body;

  // validating data
  for (const hours of exerciseHours) {
    if (isNaN(Number(hours))) {
      res.status(400).json({ error: "malformatted parameters" });
    }
  }

  if (isNaN(Number(targetValue))) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  if (!exerciseHours || !targetValue)
    res.status(400).json({ error: "parameters missing" });

  // NB: Using a type assertion (or quieting an Eslint rule) is always a bit risky thing.
  // If the asserted type does not have the right kind of value, the result will be a runtime error
  // In the next chapter FSO will teach about TYPE NARROWING which will provide a much more safe way
  // of giving a stricter type for data that is coming from an external source
  res
    .status(200)
    .json(calculateExercise(targetValue as number, exerciseHours as number[]));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON http://localhost:${PORT}`);
});
