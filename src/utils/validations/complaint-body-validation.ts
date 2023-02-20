import joi from 'joi';


class UserValidation {
    newComplaintValidationSchema;
;

    constructor() {
        this.newComplaintValidationSchema = joi.object({
            complaint: joi.object({
                department: joi.string().max(300).required(),
                complaintName: joi.string().max(500).required()
            }),
            description: joi.string().max(300).required(),
            address: joi.string().max(500).required(),

       });

    };
};

const complaintValidationObject = new UserValidation();


export default complaintValidationObject;