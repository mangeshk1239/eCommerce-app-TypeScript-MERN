import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect";
import * as accountController from "./controllers/account";
import * as dashboardController from "./controllers/dashboard";
import * as productsController from "./controllers/products";
import isAuthenticated from "./middlewares/isAuthenticated";

dotenv.config();
connectDB();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.post("/api/account/register", accountController.registerAccount);
app.post("/api/account/login", accountController.loginAccount);
app.get("/api/account/dashboard", isAuthenticated, dashboardController.getDashboardData);
app.get("/api/account/products", isAuthenticated, productsController.getProductsData);

app.listen(process.env.PORT);