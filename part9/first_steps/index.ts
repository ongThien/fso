import express from "express";
import qs from "qs";
import calculateBMI from "./bmiCalculator";

const app = express();

app.set("query parser", (str: string) => {
  // console.log(str);
  return qs.parse(str);
});

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON http://localhost:${PORT}`);
});
