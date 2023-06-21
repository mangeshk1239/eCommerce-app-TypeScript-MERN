import mongoose from "mongoose";

interface ICartItem {
    product_id: number,
    product_name: string,
    product_price: number,
    product_quantity: number,
    product_image: string
}

interface IOrder {
    orderID: string,
    orderTotal: number | undefined,
    email: string,
    createdAt: Date,
    lineItems: ICartItem[]
}

export interface IAccountData {
    accountName: string,
    accountEmail: string,
    accountOrders: IOrder[],
    createdAt: Date
}

const accountDataSchema = new mongoose.Schema<IAccountData>({
    accountName: String,
    accountEmail: { type: String, unique: true },
    accountOrders: Array,
    createdAt: Date
});

export const AccountData = mongoose.model<IAccountData>("AccountData", accountDataSchema);