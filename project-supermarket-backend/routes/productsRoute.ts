/**
 * 
 */

import express from "express";
import * as ProductsCtrl from "../controllers/productsController";
import { checkAuth } from "../middleware/usersMiddleware";
const router = express.Router();


router.get("/getProducts", ProductsCtrl.getProducts);
router.get("/getSingleProduct/:productId", ProductsCtrl.getSingleProduct);


export default router;