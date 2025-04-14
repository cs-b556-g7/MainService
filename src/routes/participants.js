import express from "express";
import {
  addParticipant,
  getParticipantsByConversation,
  updateParticipant,
  deleteParticipant
} from "../controllers/participantsController.js";

const router = express.Router();

router.post("/", addParticipant);
router.get("/:conversation_id", getParticipantsByConversation);
router.put("/:id", updateParticipant);
router.delete("/:id", deleteParticipant);

export default router;
