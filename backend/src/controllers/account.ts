import { Request, Response } from "express";
import { IAccount, Account } from "../db/models/Account";
import bcrypt from "bcrypt";

export async function registerAccount(req: Request, res: Response): Promise<void> {

    const { name, email, password } = req.body;

    try {

        const encrypted_password: string = await bcrypt.hash(password, 10);

        const account = new Account<IAccount>({
            accountName: name,
            accountEmail: email,
            accountPassword: encrypted_password,
            createdAt: new Date()
        });

        await account.save();
        // const check_if_password_is_correct = await bcrypt.compare(club_password, hash);

        res.status(200).send("Ok");

    } catch (error) {
        res.status(500).send("error");
    }

};

export async function loginAccount(req: Request, res: Response): Promise<void> {

    try {
        res.status(200).send("Ok");
    } catch (error) {
        res.status(500).send("error");
    }

};