import mongoose from "mongoose";

export interface IAccountData {
    accountName: string,
    accountEmail: string,
    createdAt: Date
}

const accountDataSchema = new mongoose.Schema<IAccountData>({
    accountName: String,
    accountEmail: { type: String, unique: true },
    createdAt: Date
});

export const AccountData = mongoose.model<IAccountData>("AccountData", accountDataSchema);