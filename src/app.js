import express from "express";
import cors from "cors";

import analysisRoutes from "./routes/analysis.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

/* GLOBAL MIDDLEWARE */

// CORS
app.use(
  cors({
    origin: [
      "https://skill-w4y9tloap-abhiragvermas-projects.vercel.app",// frontend URL
      "http://localhost:5173"
    ],
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger (debug ke liye)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

/* ROUTES */

// Health check
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// Feature routes
app.use("/api", analysisRoutes);
app.use("/api/auth", authRoutes);

/* ERROR HANDLING*/

// 404 handler (unknown routes)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;