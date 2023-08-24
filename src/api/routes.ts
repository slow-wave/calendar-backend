import { Router } from "express";
import UserRoutes from "./user/user.routes";
import AuthRoutes from "./auth/auth.routes";
import LogRoutes from "./log/log.routes";

const router = Router();

router.use("/user", UserRoutes);
router.use("/auth", AuthRoutes);
router.use("/log", LogRoutes);

export default router;
