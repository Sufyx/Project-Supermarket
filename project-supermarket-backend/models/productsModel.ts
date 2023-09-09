/**
 * 
 */


import Product, { ProductDocument } from "../schemas/Product";
import { ObjectId } from "mongodb";


export async function getProductsModel(): Promise<ProductDocument[] | null> {
    return await Product.find();
}


export async function getProductById(productId: string): Promise<ProductDocument | null> {
    return await Product.findOne({ _id: new ObjectId(productId) });
}

