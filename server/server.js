import express from "express";
import rootRouter from "./routers/rootRouter.js";
const app = express();

app.use("/api", rootRouter);

const PORT = 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
