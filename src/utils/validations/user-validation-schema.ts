import joi from 'joi';


class UserValidation {
    userSignupValidationSchema;
    userLoginValidationSchema;
    userUpdateValidationSchema;
    userDeleteProfileValidationSchema;
    userConfirmValidationSchema;

    constructor() {
        this.userSignupValidationSchema = joi.object({
            userName: joi.string().required().min(5).max(20),
            phoneNumber: joi.string().min(10).max(10).required(),
            houseNo: joi.string().max(100).required(),
            colonyName: joi.string().lowercase().required(),
            gender: joi.string().lowercase().min(4).max(6), 
            role: joi.string().max(13).required(),
            familyMemeber: joi.number().max(100),
       });

       this.userConfirmValidationSchema = joi.object({
        sessionId: joi.string().required(),
        confirmCode: joi.number().required(),
        type: joi.string().max(7).required(),
   });

        this.userLoginValidationSchema = joi.object({
            phoneNumber: joi.string().min(10).max(10).required(),
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

const adminValidationObject = new UserValidation();


export default adminValidationObject;