import { addAstrologer, toggleTopAstrologer } from "../controllers/astrologer.controller.js";
import { astrologerLogin, astrologerRegister } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/login").post(astrologerLogin);
router.route("/register").post(astrologerRegister);
router.route("/addastrologer").post(addAstrologer);
router.route("/togglestatus").put(toggleTopAstrologer);



export default router;