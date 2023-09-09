/**
 * 
 */


import { Request, Response } from "express";
import { 
    getProductsModel, getProductById 
} from "../models/productsModel";


export async function getProducts(req: Request, res: Response) {
    try {
        const products = await getProductsModel();
        res.send({ products });
    } catch (err) {
        console.error("getProducts: ", err);
        res.status(500).send(err);
    }
}

export async function getSingleProduct(req: Request, res: Response) {
    try {
        const { productId } = req.params;
        const product = await getProductById(productId);
        if (product == null){
            throw new Error("an error has occurred while retrieving product data");
        }
        res.send({ product: product });
    } catch (err) {
        console.error("getSingleProduct: ", err);
        res.status(500).send(err);
    }
}
