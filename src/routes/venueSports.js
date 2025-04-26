import express from "express";
import {
  createVenueSport,
  updateVenueSport,
  getVenueSportsByVenueId,
  deleteVenueSportsByVenueId
} from "../controllers/venueSports.js";

const router = express.Router();

// Create a new sport for a venue
router.post("/:venue_id", createVenueSport);

// Update a specific sport in a venue
router.put("/:venue_id/sport/:id", updateVenueSport);

// Get all sports for a venue
router.get("/:venue_id", getVenueSportsByVenueId);

// Delete all sports for a venue
router.delete("/:venue_id", deleteVenueSportsByVenueId);

export default router;
