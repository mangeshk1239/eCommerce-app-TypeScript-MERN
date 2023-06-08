import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {

    try {

        let access_token: string | undefined = req.headers.authorization as string;

        console.log("access_token", access_token.replace("Bearer ", ""));

        // access_token = access_token.replace("Bearer ");

        // const verified = jwt.verify(JSON.stringify(), JSON.stringify(process.env.SECRET_KEY));

        // console.log("verified", verified);

        res.send({ status: "true" });
    } catch (error) {
        console.log("ERROR", error);
    }
}