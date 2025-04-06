import express from "express";
import ctrl from "../controllers/venue_sports.js";

const router = express.Router();

router.post("/", ctrl.createVenueSport);
router.get("/", ctrl.getAllVenueSports);
router.get("/:id", ctrl.getVenueSportById);
router.put("/:id", ctrl.updateVenueSport);
router.delete("/:id", ctrl.deleteVenueSport);

export default router;
