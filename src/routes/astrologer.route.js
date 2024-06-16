import { astrologerLogin, astrologerRegister } from "../controllers/auth.controller";

const router = express.Router();

router.route("/login").post(astrologerLogin);
router.route("/register").post(astrologerRegister);



export default router;