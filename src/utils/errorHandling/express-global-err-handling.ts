import HttpResponse from "../httpResponse/all-http-response";
import {Request, Response, NextFunction} from "express"
import {Properties} from "../httpResponse/all-http-response"


const expressGlobalErrorHandling = (error:Properties, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof HttpResponse) {
        res.status(error.status).json(error);
        return;
    }

    res.status(error.status || 500).send("Internal server error!");
}

export default expressGlobalErrorHandling;