import express from "express";
import {
  createConversation,
  getAllConversations,
  getConversationById,
  updateConversation,
  deleteConversation
} from "../controllers/conversationsController.js";

const router = express.Router();

router.post("/", createConversation);
router.get("/", getAllConversations);
router.get("/:id", getConversationById);
router.put("/:id", updateConversation);
router.delete("/:id", deleteConversation);

export default router;
