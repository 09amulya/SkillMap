import express from "express";
import cors from "cors";

import analysisRoutes from "./routes/analysis.routes.js";
import authRoutes from "./routes/auth.routes.js";



const app = express();

// ✅ Middleware FIRST
app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true
}));

app.use(express.json());

// ✅ THEN routes
app.use("/api", analysisRoutes);
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

export default app;