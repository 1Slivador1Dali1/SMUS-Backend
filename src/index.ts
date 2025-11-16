import { createServer } from "node:http";

const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "text/plain");
  res.end("Hello World");
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
