import express from "express";
import ctrl from "../controllers/profiles.js";

const router = express.Router();

router.post("/", ctrl.createProfile);
router.get("/", ctrl.getAllProfiles);
router.get("/:id", ctrl.getProfileById);
router.put("/:id", ctrl.updateProfile);
router.delete("/:id", ctrl.deleteProfile);

export default router;
