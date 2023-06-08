import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {

    try {

        let access_token: string | undefined = req.headers.authorization as string;
        access_token = access_token.replace("Bearer ", "");

        const verified = jwt.verify(access_token, process.env.SECRET_KEY as string);

        if (verified) {
            res.locals.email = verified;
            next();
        }

    } catch (error) {
        console.log("ERROR", error);
        res.status(401).send({ success: false });
    }
}