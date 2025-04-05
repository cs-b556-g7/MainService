import express from "express";
import ctrl from "../controllers/events.js";

const router = express.Router();

router.post("/", ctrl.createEvent);
router.get("/", ctrl.getAllEvents);
router.get("/:id", ctrl.getEventById);
router.put("/:id", ctrl.updateEvent);
router.delete("/:id", ctrl.deleteEvent);

export default router;
