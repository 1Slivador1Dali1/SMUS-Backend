import express from "express";
import { initializeNotionModule } from "./modules/notions/index.ts";
import { initializeUserModule } from "./modules/users/index.ts";
import pool from "./config/db.ts";
import { initializeAuthModule } from "./modules/auth/index.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";

const app = express();
const port = 3000;

app.use(express.json());

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in .env");
}

const authConfig = {
  jwtSecret: process.env.JWT_SECRET,
};

const authModule = initializeAuthModule(pool, authConfig);
const notionModule = initializeNotionModule(pool);
const userModule = initializeUserModule(pool);

app.get("/", (req, res) => {
  res.send("Home Express!");
});

app.use("/auth", authModule.router);
app.use("/notions", notionModule.router);
app.use("/users", userModule.router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
