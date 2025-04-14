import express from "express";
import {
  createVenueSport,
  updateVenueSport,
  getVenueSportsByVenueId,
  deleteVenueSportsByVenueId
} from "../controllers/venueSports.js";

const router = express.Router();

router.post("/venue/:venue_id", createVenueSport);
router.put("/venue/:venue_id/:id", updateVenueSport);
router.get("/venue/:venue_id", getVenueSportsByVenueId);
router.delete("/venue/:venue_id", deleteVenueSportsByVenueId);

export default router;

