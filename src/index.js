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
import eventRoutes from "./routes/events.js"
import venueSportRoutes from "./routes/venue_sports.js"

// Route usage

app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/venue-sports", venueSportRoutes);

// Root
app.get("/", (req, res) => {
  res.send("🚀 Backend is up and running!");
});

// Start
app.listen(port, () => {
  console.log(`✅ Server listening at http://localhost:${port}`);
});

export default app;