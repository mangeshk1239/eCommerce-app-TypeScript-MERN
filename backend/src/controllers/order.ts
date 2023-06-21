import { Request, Response } from "express";
import { IAccountData, AccountData } from "../db/models/AccountData";

export async function orderCreate(req: Request, res: Response): Promise<void> {

    const { email } = req.body;

    try {

        const accountData: IAccountData | null = await AccountData.findOneAndUpdate({ accountEmail: email }, { $push: { accountOrders: req.body } });

        res.status(200).send({ success: true, message: "Order successful" });

    } catch (error) {
        console.log("error", error);
        res.status(500).send({ success: false, message: "Something went wrong, Please try again..." });
    }

};

export async function getOrderData(req: Request, res: Response): Promise<void> {

    try {
        const email: string = res?.locals.email;
        const accountData: IAccountData | null = await AccountData.findOne({ accountEmail: email });

        res.status(200).send({ success: true, data: accountData?.accountOrders });

    } catch (error) {
        console.log("error", error);
        res.status(500).send({ success: false, message: "Something went wrong, Please try again..." });
    }

};