import joi from "joi";


class UserValidation {
    userSignupValidationSchema;
    userLoginValidationSchema;
    userUpdateValidationSchema;
    userDeleteProfileValidationSchema;

    constructor() {
        this.userSignupValidationSchema = joi.object({
            userName: joi.string().required().min(5).max(20),
            phoneNumber: joi.string().min(10).max(10),
            houseNo: joi.number().required(),
            colonyName: joi.string().email().lowercase().required(),
            gender: joi.string().lowercase().min(4).max(6), 
            role: joi.string().max(13).required(),
   
       });

        this.userLoginValidationSchema = joi.object({
            email: joi.string().email().lowercase().required(),
            password: joi.string().min(8).max(16).required(),
        });

        this.userUpdateValidationSchema = joi.object({
            userName: joi.string().optional().min(5).max(16),
            email: joi.string().email().lowercase().optional(),
            password: joi.string().min(8).optional(),
            role: joi.string().max(13).optional().valid("user")
        });

        this.userDeleteProfileValidationSchema = joi.object({
            agree: joi.boolean().required().valid(true)
        })
    };
};

const adminValidationObject = new AdminValidation();


export default adminValidationObject;