import express from "express";
import ctrl from "../controllers/venues.js";

const router = express.Router();

router.post("/", ctrl.createVenue);
router.get("/", ctrl.getAllVenues);
router.get("/:id", ctrl.getVenueById);
router.put("/:id", ctrl.updateVenue);
router.delete("/:id", ctrl.deleteVenue);

export default router;
