/**
 * 
 */


import bcrypt from "bcrypt";
import * as dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
dotenv.config();


export async function encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

export function getToken(payload: JwtPayload): string {
    return jwt.sign(
        payload,
        process.env.TOKEN_KEY as string,
        { expiresIn: "24h" });
}


export interface PayLoad {
    id: string
}

export function verifyToken(token: string): string {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY as string) as PayLoad;
    return decoded.id;
};

// jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
//     if (err) {
//       res.status(401).send("Unauthorized");
//       return;
//     }
//     if (decoded) {
//       req.body.userId = decoded.id;
//       next();
//       return;
//     }
//   });
