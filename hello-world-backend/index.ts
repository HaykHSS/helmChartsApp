import express, { Request, Response } from "express";
import cors from "cors";

const randomStrings = ['Hello World', 'Hello World 2', 'Hello World 3', 'Hello World 4', 'Hello World 5'];


const app = express();

app.use(cors());

app.get("/api", (req : Request, res : Response) => {
  const randomString = randomStrings[Math.floor(Math.random() * randomStrings.length)];

  res.json(randomString);
});

app.listen(3001, () => console.log("Example app listening on port 3001!"));
