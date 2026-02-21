import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { register, login, logout, getCurrent } from "../../controllers/authControllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/current", authMiddleware, getCurrent);

export default router;