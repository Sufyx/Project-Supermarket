/**
 * 
 */


import User, { UserDocument } from "../schemas/User"
import Product, { ProductDocument } from "../schemas/Product";
import { ObjectId } from "mongodb";



export async function getUsersModel(): Promise<string[] | null> {
  return await User.find();
  // const res = await User.find();
  // return [...res];
}

export async function getUserByEmailModel(email: string): Promise<UserDocument | null> {
  return await User.findOne({ email: email });
}

export async function getUserByIdModel(userId: string): Promise<UserDocument | null> {
  return await User.findOne({ _id: new ObjectId(userId) });
  // return await User.findOne({ _id: new ObjectId("userId") });
}


export async function signUpModel(userToAdd: UserDocument): Promise<UserDocument | null> {
  const newUser = new User(userToAdd);
  newUser.save();
  return newUser;
}

export async function addProductToCartModel(
  userId: string, productId: string, productAmount: string
): Promise<boolean> {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const cart: [{ productId: string; productAmount: string; }] = [...user.cart];
    
    const cartItemIndex = cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex !== -1)
      cart[cartItemIndex].productAmount = productAmount;
    else
      cart.push({ productId, productAmount });

    if (Number(productAmount) <= 0)
      cart.splice(cartItemIndex, 1);

    user.cart = [...cart];
    const updateResult = await user.save();

    return updateResult ? true : false;
  } catch (error) {
    throw new Error('addProductToCartModel error: ' + error);
  }
}


export async function getUserCartModel(userId: string):
  Promise<ProductDocument[] | null> {

  const user = await getUserByIdModel(userId);
  // if (!user) throw new Error('User not found');
  if (!user || !user.cart) return [];

  const userCart: ProductDocument[] = [];
  for (let i = 0; i < user.cart.length; i++) {
    if (user.cart[i]) {
      const product = await Product.findOne({
        _id: new ObjectId(user.cart[i].productId)
      });
      if (product) userCart.push(product);
    }
  }
  return [...userCart];
}
