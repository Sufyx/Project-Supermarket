/**
 * 
 */


import { Request, Response, NextFunction } from "express";


export function isProductAvailable(req: Request, res: Response, next: NextFunction) {
    const productId = req.query.productId as string;
    // console.log("adding product ", productId);
    // check if product is in db
    // check if product is in stock
    next();
}
