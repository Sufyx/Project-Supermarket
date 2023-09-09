/**
 * 
 */


import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
    name: string,
    password: string,
    email: string,
    phone: string,
    role: string,
    birthDate: Date,
    orders: string[],
    favorites: string[],
    creditCards: string[],
    cart: [{
        productId: string,
        productAmount: string
    }]
}


const userSchema: Schema<UserDocument> = new Schema({
    name: String,
    password: String,
    email: String,
    phone: String,
    role: String,
    birthDate: Date,
    orders: [String],
    favorites: [String],
    creditCards: [String],
    cart: [{
        productId: String,
        productAmount: String
    }],
},
    { id: false }
);


export type UserDto = Omit<UserDocument, "password">;
export function MapUserToDto(user: UserDocument): UserDto {
    const result: any = { ...user };
    delete result.password;
    delete result.passwordConfirm;
    return result as UserDto;
}

const User = model<UserDocument>('User', userSchema);

export default User;
