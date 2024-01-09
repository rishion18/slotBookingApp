import { Router } from "express";
import { userLogin, userRegister } from "../controllers/users.controllers.js";

const router = Router();

router.post('/userRegister' , userRegister);
router.post('/userLogin' , userLogin);

export default router;