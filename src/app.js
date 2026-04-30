import express from "express";
import cors from "cors";

import analysisRoutes from "./routes/analysis.routes.js";

const app = express();
app.use("/api", analysisRoutes);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

export default app;