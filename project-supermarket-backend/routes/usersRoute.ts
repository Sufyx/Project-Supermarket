/**
 * 
 */

import express from "express";
import * as usersCtrl from "../controllers/usersController";
import { validateBody } from "../middleware/validateBody";
import { signUpSchema, signInSchema } from "../schemas/validationSchemas";
import {
    confirmPassword, isUserNew, isUserInDB,
    verifyPassword, checkAuth
} from "../middleware/usersMiddleware";
import { isProductAvailable } from "../middleware/productsMiddleware";

const router = express.Router();
const validateSchema = validateBody(signUpSchema)

router.get("/getUsers", usersCtrl.getUsers);

router.get("/logged", checkAuth, usersCtrl.stayLoggedIn);

router.get("/getUserCart", checkAuth, usersCtrl.getUserCart);

router.post("/signUp", validateSchema,
    confirmPassword, isUserNew, usersCtrl.signUp);

router.post("/signIn", validateBody(signInSchema),
    isUserInDB, verifyPassword, usersCtrl.signIn);

router.post("/addProductToCart", checkAuth,
    isProductAvailable, usersCtrl.addProductToCart);



export default router;