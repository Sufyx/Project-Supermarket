/**
 * Super-Market Project
 * Asaf Gilboa
*/


import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from 'mongoose';
import usersRoute from './routes/usersRoute';
import productsRoute from './routes/productsRoute';
import * as dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 7070;
const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());

app.use("/products", productsRoute);
app.use("/users", usersRoute);

mongoose
    .connect(process.env.URI as string
        // ,{ useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => {
        console.log(`Database connected`);
        app.listen(PORT, () => {
            console.log(`Listening on: ${PORT}`);
        });
    }).catch((error: Error) => {
        console.error(error.stack);
        process.exit(1);
    });


app.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        res.send(" :) ");
    } catch (err) {
        console.log('error at empty request: ', err);
        res.status(500).send(err);
    }
});

