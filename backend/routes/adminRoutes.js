import express from "express";
import { auth, isAdmin } from "../middlewares/authMiddleware.js";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/adminController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", auth, isAdmin, getAllUsers);
router.get("/:id", auth, isAdmin, getUserById);
router.put("/:id", auth, isAdmin, upload, updateUser);
router.delete("/:id", auth, isAdmin, deleteUser);

export default router;
