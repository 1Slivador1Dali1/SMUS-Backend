import express from "express";
import { notions } from "./mockDB.ts";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Express!");
});

app.get("/notions", (req, res) => {
  res.status(200).json(notions);
});

app.get("/notions/:id", (req, res) => {
  const notionId = req.params.id;
  const notion = notions.items.find((n) => n.id === notionId);

  if (!notion) {
    res.status(404).json({ error: "Notion not found" });
    return;
  }

  res.status(200).json(notion);
});

app.post("/notions", (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400).json({
      error: "Name and description are required",
    });
    return;
  }

  const newNotion = {
    id: String(notions.items.length + 1),
    name,
    description,
  };

  notions.items.push(newNotion);
  res.status(201).json(newNotion);
});

app.patch("/notions/:id", (req, res) => {
  const notionId = req.params.id;
  const { name, description } = req.body;

  if (!notionId) {
    return res.status(400).send("Bad Request");
  }

  if (!name && !description) {
    return res.status(400).json({
      error:
        "At least one field (name or description) must be provided for update",
    });
  }

  const notion = notions.items.find((n) => n.id === notionId);

  if (!notion) {
    return res.status(404).json({ error: "Notion not found" });
  }

  if (name) {
    notion.name = name;
  }

  if (description) {
    notion.description = description;
  }

  res.json(notion);
});

app.delete("/notions/:id", (req, res) => {
  const notionId = req.params.id;
  const index = notions.items.findIndex((n) => n.id === notionId);

  if (!notionId) {
    res.status(400).send("Bad Request");
    return;
  }

  if (index === -1) {
    res.status(404).json({ error: "Notion not found" });
    return;
  }

  notions.items.splice(index, 1);

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
