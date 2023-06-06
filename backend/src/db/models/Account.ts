import mongoose from "mongoose";

export interface IAccount {
    accountName: string,
    accountEmail: string,
    accountPassword: string,
    createdAt: Date
}

const accountSchema = new mongoose.Schema<IAccount>({
    accountName: String,
    accountEmail: { type: String, unique: true },
    accountPassword: String,
    createdAt: Date
});

export const Account = mongoose.model<IAccount>("Accounts", accountSchema);