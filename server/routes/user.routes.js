import { Router } from "express";
import { getUser, userLogin, userRegister } from "../controllers/users.controllers.js";
import isLoggedIn from "../middlewares/authentication.js";

const router = Router();

router.post('/userRegister' , userRegister);
router.post('/userLogin' , userLogin);
router.post('/getUser' , getUser);

export default router;