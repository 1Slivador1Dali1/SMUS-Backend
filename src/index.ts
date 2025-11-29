import express from "express";
import { notions } from "./mockDB.ts";
import { initializeNotionModule } from "./modules/notions/index.ts";

const app = express();
const port = 3000;

app.use(express.json());

const notionModule = initializeNotionModule(notions);

app.get("/", (req, res) => {
  res.send("Home Express!");
});

app.use("/notions", notionModule.router);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
