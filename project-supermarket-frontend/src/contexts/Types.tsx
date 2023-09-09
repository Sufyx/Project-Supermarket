/**
 * 
 */

export interface User {
  id: number;
  name: string;
  password: string;
  passwordConfirm: string;
  email: string;
  phone: string;
  role: string;
  birthDate: Date;
  orders: string[];
  favorites: string[];
  creditCards: string[];
  cart: [{
    productId: string,
    productAmount: string
  }]
}

export interface Product {
  _id: string;
  name: string;
  brand: string;
  description: string;
  supplier: string;
  price: number;
  barcode: number;
  amountInCart: number;
  stock: number;
  lastUpdate: Date;
  tags: string[];
  categories: string[];
  images: string[];
}

export interface ChosenProduct extends Product {
  addOrReduce: number;
}
