import express, { Request, Response } from "express";
// import cors from "cors";
import { PORT } from "./src/utils/config";

const app = express();

// app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req: Request, res: Response) => {
  
  res.status(200).send("pong");
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING AT http://localhost:${PORT}`);
  
});
