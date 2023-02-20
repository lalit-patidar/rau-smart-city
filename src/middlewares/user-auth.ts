import jwt from "jsonwebtoken";
import User from '../modules/users/user-model';
import {APP_CONFIG} from "../config/app-config"
import traceAndThrowError from '../utils/errorHandling/custom-error'
import {appConstants} from "../config/app-constants/constants";
import {Request, Response, NextFunction} from "express"

const {errors: {errorMessage}} = appConstants;
const {JWT_USER_SECRET} = APP_CONFIG;

export const userAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded: any = jwt.verify(token, JWT_USER_SECRET);
        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token
        });

        if(!user) throw new Error(errorMessage.AuthenticationFailed);
        
        //@ts-ignore
        req.user = user;
        next()
    } catch (error) {
        const mappedError = traceAndThrowError(error);
        next(mappedError);
    }
};

