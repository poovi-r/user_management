import express from "express";
import { deleteProfile, getProfile, updateProfile, uploadProfileImage } from "../controllers/userController.js";
import { auth } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/profile", auth, getProfile);
router.put("/update", auth, upload, updateProfile);
router.delete("/delete", auth, deleteProfile);
router.post("/upload-profile-image", auth, upload, uploadProfileImage);

export default router;
