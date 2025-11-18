import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";

const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "text/plain");

  res.end("test");
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

const content = "test Content";

fs.appendFile(
  "/home/lashkovvladislav/Projects/SMUS-Backend/src/test.txt",
  content,
  (err) => {}
);

fs.readFile(
  "/home/lashkovvladislav/Projects/SMUS-Backend/src/test.txt",
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  }
);
