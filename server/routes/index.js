import express from "express";
import { Register, Login, Logout, Admins } from "../controllers/users.js";
import { refreshToken } from "../controllers/refreshToken.js";

const router = express.Router();

router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.get("/admins", Admins);

export default router;
