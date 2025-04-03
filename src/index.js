import express from "express";
import dotenv from "dotenv";

// Load .env variables
dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Route imports (correct relative paths)
import userRoutes from "./routes/users.js";
import profileRoutes from "./routes/profiles.js";
import venueRoutes from "./routes/venues.js";

// Route usage
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/venues", venueRoutes);

// Root
app.get("/", (req, res) => {
  res.send("🚀 Backend is up and running!");
});

// Start
app.listen(port, () => {
  console.log(`✅ Server listening at http://localhost:${port}`);
});
