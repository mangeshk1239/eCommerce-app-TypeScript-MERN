import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect";
import * as accountController from "./controllers/account";
import * as dashboardController from "./controllers/dashboard";
import * as productsController from "./controllers/products";
import * as orderController from "./controllers/order";
import isAuthenticated from "./middlewares/isAuthenticated";

dotenv.config();
connectDB();

const app: Express = express();

app.use(cors());
app.use(express.json());

// GET
app.get("/api/account/dashboard", isAuthenticated, dashboardController.getDashboardData);
app.get("/api/account/products", isAuthenticated, productsController.getProductsData);
app.get("/api/account/orders", isAuthenticated, orderController.getOrderData);
app.get("/api/account/cart", isAuthenticated, (req: Request, res: Response) => res.status(200).send({ success: true }));
app.get("/api/account/checkout", isAuthenticated, (req: Request, res: Response) => res.status(200).send({ success: true, email: res?.locals.email, stripe_key: process.env.STRIPE_KEY }));

// POST
app.post("/api/account/register", accountController.registerAccount);
app.post("/api/account/login", accountController.loginAccount);
app.post("/api/order/create", orderController.orderCreate);

app.listen(process.env.PORT);