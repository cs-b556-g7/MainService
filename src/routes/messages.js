import express from "express";
import {
  sendMessage,
  getMessagesByConversation,
  updateMessage,
  deleteMessage
} from "../controllers/messagesController.js";

const router = express.Router();

router.post("/", sendMessage);
router.get("/:conversation_id", getMessagesByConversation);
router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);

export default router;
