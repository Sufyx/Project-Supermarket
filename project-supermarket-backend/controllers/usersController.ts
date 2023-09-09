/**
 * 
 */

import { Request, Response } from "express";
import { 
    getUsersModel, signUpModel, getUserByEmailModel,
    getUserByIdModel, addProductToCartModel, getUserCartModel
} from "../models/usersModel";
// import { getProductById } from "../models/productsModel";
import { encryptPassword, getToken } from "../utilities/utils";
import { UserDocument, MapUserToDto } from "../schemas/User"



export async function getUsers(req: Request, res: Response) {
    try {
        const users = await getUsersModel();
        res.send({ users });
    } catch (err) {
        console.error("getUsers error: ", err);
        res.status(500).send(err);
    }
}


export async function signUp(req: Request, res: Response) {
    try {
        const user = {
            ...req.body,
            password: await encryptPassword(req.body.password)
        };
        delete user.passwordConfirm;
        const newUser = await signUpModel(user);
        if (newUser == null){
            throw new Error("an error has occurred while retrieving user data");
        }
        const dto = MapUserToDto(newUser);
        const token = getToken({ id: newUser._id });
        res.send({ token: token, user: dto });
    } catch (err) {
        console.error("signUp error: ", err);
        res.status(500).send(err);
    }
}


export async function signIn(req: Request, res: Response) {
    try {
        const { email } = req.body.user;
        const user = await getUserByEmailModel(email);
        if (user == null){
            throw new Error("an error has occurred while retrieving user data");
        }
        const dto = MapUserToDto(user);
        const token = getToken({ id: user._id });
        res.send({ token: token, user: dto });
    } catch (err) {
        console.error("signIn error: ", err);
        res.status(500).send(err);
    }
}


export async function stayLoggedIn(req: Request, res: Response) {
    try {
        const { userId } = req.body;
        const user = await getUserByIdModel(userId);
        if (user == null){
            throw new Error("an error has occurred while retrieving user data");
        }
        const dto = MapUserToDto(user);
        res.send({ user: dto });
    } catch (err) {
        console.error("stayLoggedIn error: ", err);
        res.status(500).send(err);
    }
}


export async function addProductToCart(req: Request, res: Response) {
    try {
        const { userId } = req.body;
        // const { productId } = req.params;
        const productId = req.query.productId as string;
        const productAmount = req.query.productAmount as string;
        const added = await addProductToCartModel(userId, productId, productAmount);
        res.send({ added: added });
    } catch (err) {
        console.error("addProductToCart error: ", err);
        res.status(500).send(err);
    }
}


export async function getUserCart(req: Request, res: Response) {
    try {
        const { userId } = req.body;
        const cart = await getUserCartModel(userId);
        res.send({ cart: cart });
    } catch (err) {
        console.error("getUserCart error: ", err);
        res.status(500).send(err);
    }
}
