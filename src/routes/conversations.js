import express from "express";
import ctrl from "../controllers/conversations.js";

const router = express.Router();

router.get("/", ctrl.getAllConversations); // Get all conversations
router.post("/", ctrl.createConversation); // Create a new conversation
router.post("/:conversationId/participants", ctrl.addParticipants); // Add participants
router.post("/:conversationId/messages", ctrl.sendMessage); // Send a message
router.get("/user/:userId", ctrl.getUserConversations); // Get all conversations for a user
router.get("/:conversationId/messages", ctrl.getConversationMessages); // Get messages for a conversation
router.put("/:conversationId/messages/read", ctrl.markMessagesAsRead); // Mark messages as read

export default router;