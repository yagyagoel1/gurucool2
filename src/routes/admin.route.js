import { toggleAstrologerTop } from "../controllers/admin.controller.js";
import express from "express";


const router = express.Router();

router.route("/toggletopastrologer/:id").post(toggleAstrologerTop);

export default router;