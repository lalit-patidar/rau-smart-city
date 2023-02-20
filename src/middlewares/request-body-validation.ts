import {APP_CONFIG} from '../config/app-config';
import bodyValidation from "../utils/validations/index";
import traceAndThrowError from "../utils/errorHandling/custom-error";
import {appConstants} from "../config/app-constants/constants";
import {Request, Response, NextFunction} from "express"

const {errors: {errorMessage}} = appConstants;
const {USER_ACCESS_KEY} = APP_CONFIG;

export const userReqBodyValidation = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body, "this body")
    try {
        if (req.params.userAuthId !==  USER_ACCESS_KEY) throw new Error(errorMessage.ApiAccessDenied);
        if (!req.body.userSignup && !req.body.userLogin && !req.body.userUpdate && !req.body.userConfirm) throw new Error(errorMessage.UnproccessedBody)
        const bodyName = Object.keys(req.body)[0];
        const validatedBody = await bodyValidation(bodyName, req.body[bodyName]);
        //@ts-ignore
        req.validatedBody = validatedBody;
        next()
    } catch (error) {
        const mappedError = traceAndThrowError(error);
        next(mappedError); 
    }
};