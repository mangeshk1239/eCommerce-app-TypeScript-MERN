import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";

export async function getProductsData(req: Request, res: Response): Promise<void> {

    try {

        const data: AxiosResponse = await axios.get("https://dummyjson.com/products").then(response => response.data);
        res.status(200).send({ success: true, data });

    } catch (error) {
        console.log("error", error);
        res.status(500).send({ success: false, message: "Something went wrong, Please try again..." });
    }

};