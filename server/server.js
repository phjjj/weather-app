import express from "express";
import test from "./Router/test.js";
const app = express();

app.use("/api", test);

const PORT = 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
