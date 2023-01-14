import {Request, Response, NextFunction} from "express";
import {APP_CONFIG} from "../../../config/app-config";
import bodyValidation from "../../utils/validations/index";
import traceAndThrowError from "../../../utils/errorHandling/custom-error";
import {appConstants} from '../../../config/app-constants/constants';

const {errors: {errorMessage}} = appConstants;
const {USER_ACCESS_KEY} = APP_CONFIG;


const adminReqBodyValidation = async (req:Request, res:Response, next:NextFunction) => {
    try {
        if (req.params.id !==  USER_ACCESS_KEY) throw new Error(errorMessage.ApiAccessDenied);
        console.log(req.body, "body")
        if (!req.body.adminSignup && !req.body.adminLogin && !req.body.adminUpdate  && !req.body.adminRemove) throw new Error(errorMessage.UnproccessedBody)
        const bodyName = Object.keys(req.body)[0];
        const validatedBody = await bodyValidation(bodyName, req.body[bodyName]);
        console.log(validatedBody);
        //@ts-ignore
        req.validatedBody = validatedBody;
        next()
    } catch (error) {
        const mappedError = traceAndThrowError(error);
        next(mappedError); 
    }
};

module.exports = adminReqBodyValidation;