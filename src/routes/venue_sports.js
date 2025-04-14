import express from "express";
import ctrl from "../controllers/venue_sports.js";

const router = express.Router();

router.post("/", ctrl.createVenueSport);
router.get("/:id", ctrl.getVenueSportsByVenueId);
router.put("/:id", ctrl.updateVenueSport);
router.delete("/:id", ctrl.deleteVenueSportsByVenueId);

export default router;
