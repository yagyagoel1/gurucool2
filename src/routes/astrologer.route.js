import { addAstrologer, removeAstrologer, toggleTopAstrologer } from "../controllers/astrologer.controller.js";
import { astrologerLogin, astrologerRegister } from "../controllers/auth.controller.js";
import { verifyAstrologer } from "../middlewares/auth.middleware.js";
import express from "express";
const router = express.Router();

router.route("/login").post(astrologerLogin);
router.route("/register").post(astrologerRegister);
router.route("/addastrologer").post(verifyAstrologer,addAstrologer);
router.route("/togglestatus").put(verifyAstrologer,toggleTopAstrologer);
router.route("/removeastrologer").delete(verifyAstrologer,removeAstrologer);


export default router;