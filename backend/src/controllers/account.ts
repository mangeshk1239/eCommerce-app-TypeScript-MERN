import { Request, Response } from "express";
import { IAccount, Account } from "../db/models/Account";
import { IAccountData, AccountData } from "../db/models/AccountData";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerAccount(req: Request, res: Response): Promise<void> {

    const { name, email, password } = req.body;

    try {

        const ifExists: IAccount | null = await Account.findOne({ accountEmail: email });

        if (ifExists) {

            res.status(200).send({ success: false, message: "The provided email already exists, Please try again..." });

        } else {
            const encrypted_password: string = await bcrypt.hash(password, 10);

            const account = new Account<IAccount>({
                accountName: name,
                accountEmail: email,
                accountPassword: encrypted_password,
                createdAt: new Date()
            });

            const accountData = new AccountData<IAccountData>({
                accountName: name,
                accountEmail: email,
                accountOrders: [],
                createdAt: new Date()
            });

            await account.save();
            await accountData.save();

            res.status(200).send({ success: true, message: "Account registered successfully! Redirecting to the Sign in page in 3 seconds..." });
        }

    } catch (error) {
        console.log("error", error);
        res.status(500).send({ success: false, message: "Something went wrong, Please try again..." });
    }

};

export async function loginAccount(req: Request, res: Response): Promise<void> {

    const { email, password } = req.body;

    try {
        const ifExists: IAccount | null = await Account.findOne({ accountEmail: email });

        if (ifExists) {

            const passwordMatch: boolean = await bcrypt.compare(password, ifExists.accountPassword);

            if (passwordMatch) {

                const access_token = jwt.sign(email as string, process.env.SECRET_KEY as string);

                res.status(200).send({ success: true, access_token });
            } else {
                res.status(405).send({ success: false, message: "Incorrect password, Please try again..." });
            }

        } else {
            res.status(404).send({ success: false, message: "The provided email does not exists, Please try again..." });
        }

    } catch (error) {
        console.log("error", error);
        res.status(500).send({ success: false, message: "Something went wrong, Please try again..." });
    }

};