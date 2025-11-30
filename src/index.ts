import express from "express";
import { notions } from "./mockDB.ts";
import { initializeNotionModule } from "./modules/notions/index.ts";
import { initializeUserModule } from "./modules/users/index.ts";

const app = express();
const port = 3000;

app.use(express.json());

const notionModule = initializeNotionModule(notions);
const userModule = initializeUserModule({ items: [] });

app.get("/", (req, res) => {
  res.send("Home Express!");
});

app.use("/notions", notionModule.router);
app.use("/users", userModule.router);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
