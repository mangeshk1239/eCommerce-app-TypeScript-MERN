import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect";
import * as accountController from "./controllers/account";

dotenv.config();
connectDB();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.post("/api/account/create", accountController.registerAccount);
app.post("/api/account/login", accountController.loginAccount);


app.listen(process.env.PORT);