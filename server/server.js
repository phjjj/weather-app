import "dotenv/config";
import express from "express";
import rootRouter from "./routers/rootRouter.js";
import path from "path";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use("/api", rootRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", function (res, req) {
  req.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const handleListening = () => console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
