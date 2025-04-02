import express from "express";
import dotenv from "dotenv";

dotenv.config({path:"./.env"});
const app = express();
const port = 3000;

app.use(express.json());

app.get("/" , (req , res)=>{
    res.send("Hlifieo");
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});