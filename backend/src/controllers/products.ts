import { Request, Response } from "express";
import sampleProducts from "../sample-products.json"

export async function getProductsData(req: Request, res: Response): Promise<void> {
    try {
        const data: any = sampleProducts;
        res.status(200).send({ success: true, data });

    } catch (error) {
        console.log("error", error);
        res.status(500).send({ success: false, message: "Something went wrong, Please try again..." });
    }

};