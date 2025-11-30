import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST || "localhost",
  database: process.env.PGNAME,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT) || 5432,
});

pool.on("connect", () => {
  console.log("Connect DB suceess");
});

export default pool;
