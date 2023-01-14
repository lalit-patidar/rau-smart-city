import adminValidation from "./admin-validation-schema";
import vendoreValidation from "./vendor-validation-schema";
import productValidation from "./product-body-validation"

const validation = (validationType:string, data:any) => {
    switch(validationType) {
        case "adminLogin": return adminValidation.adminLoginValidationSchema.validateAsync(data, {abortEarly: false});
        case "adminSignup": return adminValidation.adminSignupValidationSchema.validateAsync(data, {abortEarly: false});
        case "adminUpdate": return adminValidation.adminUpdateValidationSchema.validateAsync(data, {abortEarly: false});
        case "adminRemove": return adminValidation.adminDeleteProfileValidationSchema.validateAsync(data);
        case "vendorLogin": return vendoreValidation.vendoreLoginValidationSchema.validateAsync(data, {abortEarly: false});
        case "vendorSignup": return vendoreValidation.vendoreSignupValidationSchema.validateAsync(data, {abortEarly: false});
        case "createProduct": return productValidation.newProductValidationSchema.validateAsync(data, {abortEarly: false})
        default: return "case not found!"
    }
};

export default validation;