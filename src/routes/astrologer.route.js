import { addAstrologer, removeAstrologer, toggleTopAstrologer } from "../controllers/astrologer.controller.js";
import { astrologerLogin, astrologerRegister } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/login").post(astrologerLogin);
router.route("/register").post(astrologerRegister);
router.route("/addastrologer").post(addAstrologer);
router.route("/togglestatus").put(toggleTopAstrologer);
router.route("/removeastrologer").delete(removeAstrologer);


export default router;