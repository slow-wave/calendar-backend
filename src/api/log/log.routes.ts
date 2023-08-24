import { Router } from "express";
import * as Controller from "./log.controller";
import { verifyToken } from "./../src/middlewares/auth";

const router = Router();

router.route("/").post(verifyToken, Controller.addLog);
router.route("/:user_id/day/:day").get(verifyToken, Controller.getLogByDay);
router.route("/:user_id/date").get(verifyToken, Controller.getLogByMonth);
router.route("/:user_id/list").get(verifyToken, Controller.getLogsList);
router.route("/:user_id/:year").get(verifyToken, Controller.getLogCount);
router.route("/:id").patch(verifyToken, Controller.updateLogById);

export default router;
