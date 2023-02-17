import joi from 'joi';


class UserValidation {
    newComplaintValidationSchema;
;

    constructor() {
        this.newComplaintValidationSchema = joi.object({
             
       });

    };
};

const adminValidationObject = new UserValidation();


export default adminValidationObject;