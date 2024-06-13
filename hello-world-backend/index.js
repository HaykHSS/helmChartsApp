import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.get("/", (req, res) => {
    res.json("Hello World!");
});
app.listen(3001, () => console.log("Example app listening on port 3001!"));
