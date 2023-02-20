import mongoose from "mongoose";
import HttpResponse from "../httpResponse/all-http-response";
import { appConstants } from "../../config/app-constants/constants";

const { errors: { dbErrors, errorName, errorMessage } } = appConstants;

/// need to handle error properly...

const traceAndThrowError = (error: any) => {
    console.log(error, "this")
    let errors;
    let dbValidationFailedError = error.message.includes(dbErrors.accountNotFound) ? "email" : error.message.includes(dbErrors.invalidPassword) ? "password" : null;
    if (error instanceof Error) {
        //use here 
    }
    if (error instanceof mongoose.Error.ValidationError) {
        errors = Object.keys(error.errors).map(errorKey => {
            return {
                label: errorKey,
                //@ts-ignore
                body: {message: error.errors[errorKey].properties.message}
            }
        });


        return HttpResponse.badRequest(errors);
    } else if (error.code === dbErrors.mongodbDuplicateErrCode && error.name === errorName.mongoServerError) {
        errors = [{ label: "Account", body: {message: "Account is already exists!"} }];
        return HttpResponse.badRequest(errors);

    } else if (dbValidationFailedError) {
        //  Throw error when findCreadentials unable to find user with the give information
        errors = [{ label: dbValidationFailedError, body: {message: error.message} }]
        return HttpResponse.notFound(errors);

    } else if (error.details) {
        // Throw error when joi validation gets failed.
        console.log(error, "this is err")
        errors = error.details.map((errorKey: any) => {
            const errorMessageKey = errorKey.message.match(/"(.*?)"/)[1];
            return {
                label: errorMessageKey,
                body: {message: errorKey.message}
            }
        });
        return HttpResponse.badRequest(errors)

    } else if (error.message.includes(errorMessage.ApiAccessDenied)) {
        errors = [{ label: "Access", body: {message: error.message} }]
        return HttpResponse.forbidden(errors);

    } else if (error.message.includes(errorMessage.UnproccessedBody)) {
        errors = [{ label: "Request Body", body: {message: error.message} }];
        return HttpResponse.unProcessd(errors);

    } else if(error.message.includes(errorMessage.AuthenticationFailed)) {
        errors = [{ label: "Authentication",body: {message: error.message} }];
        return HttpResponse.forbidden(errors);
    } else if(error.message.includes(dbErrors.accountNotFound)) {
        errors = [{ label: "Account", body: {message: error.message} }];
        return HttpResponse.forbidden(errors);
    } else if(error.name === 'AxiosError') {
        errors = [{ label: "Account", body: error.response.data }];
        return HttpResponse.badRequest(errors);
    }
    else {
        errors = [{ label: "Internal", message: "Something went wrong" }];
        return HttpResponse.internalServer(errors);
    }
};

export default traceAndThrowError;
