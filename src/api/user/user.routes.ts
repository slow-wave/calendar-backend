import { Router } from "express";
import * as Controller from "./user.controller";
import { verifyToken } from "./../src/middlewares/auth";

const router = Router();

router.route("/:username").get(verifyToken, Controller.getUserByName);
router.route("/delete").post(verifyToken, Controller.deleteUser);
export default router;
