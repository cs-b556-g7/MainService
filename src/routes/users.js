import express from "express";
import ctrl from "../controllers/users.js";

const router = express.Router();

router.post("/", ctrl.createUser);
router.get("/", ctrl.getAllUsers);
router.get("/:id", ctrl.getUserById);
router.put("/:id", ctrl.updateUser);
router.delete("/:id", ctrl.deleteUser);

export default router;
