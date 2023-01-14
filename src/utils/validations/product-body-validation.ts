import joi from "joi";

class ProductValidation {
    newProductValidationSchema;
    constructor() {
        this.newProductValidationSchema = joi.object({
            productName: joi.string().required().min(2).max(500),
            modelNo: joi.string().lowercase().required(),
        });
    };
};

const productValidationObject = new ProductValidation()

export default productValidationObject;