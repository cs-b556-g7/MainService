import express from "express";
import dotenv from "dotenv";

// Load .env variables
dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 3001;



// Route imports (correct relative paths)
import userRoutes from "./routes/users.js";
import profileRoutes from "./routes/profiles.js";
import venueRoutes from "./routes/venues.js";
import eventRoutes from "./routes/events.js"
import venueSportRoutes from "./routes/venueSports.js"
import paymentRoutes from "./routes/payments.js";
import venueBookingsRoutes from "./routes/venueBookings.js";
import eventBookingsRoutes from "./routes/eventsBookings.js";
import venueOwnerStatsRoutes from "./routes/venueOwnerStats.js";
import conversationRoutes from "./routes/conversations.js";
import messageRoutes from "./routes/messages.js";
import participantRoutes from "./routes/participants.js";
import paymentWebhookRoutes from "./routes/paymentWebhook.js";



app.use("/api/paymentWebhook", paymentWebhookRoutes);

// Middlewares
app.use(express.json());


app.use("/api/payments", paymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/venue-sports", venueSportRoutes);
app.use('/api/event-bookings', eventBookingsRoutes);
app.use('/api/venue-bookings', venueBookingsRoutes);
app.use('/api/venue-owner-stats', venueOwnerStatsRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/participants", participantRoutes);


// Root
app.get("/", (req, res) => {
  res.send("🚀 Backend is up and running!");
});

// Start
app.listen(port, () => {
  console.log(`✅ Server listening at http://localhost:${port}`);
});

export default app;