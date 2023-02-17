import userValidation from "./user-validation-schema";
import complaintBody from ".";
import productValidation from "./product-body-validation"

const validation = (validationType:string, data:any) => {
    switch(validationType) {
        case "userLogin": return userValidation.userLoginValidationSchema.validateAsync(data, {abortEarly: false});
        case "userSignup": return userValidation.userSignupValidationSchema.validateAsync(data, {abortEarly: false});
        case "userConfirm": return userValidation.userConfirmValidationSchema.validateAsync(data, {abortEarly: false});
        case "userUpdate": return userValidation.userUpdateValidationSchema.validateAsync(data, {abortEarly: false});
        case "userRemove": return userValidation.userDeleteProfileValidationSchema.validateAsync(data);

        case "newComplaint": return complaintBody.vendoreLoginValidationSchema.validateAsync(data, {abortEarly: false});
        case "vendorSignup": return complaintBody.vendoreSignupValidationSchema.validateAsync(data, {abortEarly: false});
        case "createProduct": return productValidation.newProductValidationSchema.validateAsync(data, {abortEarly: false})
        default: return "case not found!"
    }
};

export default validation;