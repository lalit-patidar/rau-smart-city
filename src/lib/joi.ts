const Joi = require('joi');

const phoneRegex = /^[6-9]\d{9}$/;

const extension = (Joi: any) => ({
  type: 'string',
  base: Joi.string(),
  messages: {
    'string.phone': 'Please enter a valid phone number',
  },
  rules: {
    phone: {
      validate(value: any, helpers: any) {
        console.log(phoneRegex.test(value), 'red')
        if (!phoneRegex.test(value)) {
          return helpers.error('string.phone');
        }
        return value;
      },
    },
  },
});

const myJoi = Joi.extend(extension)
export default myJoi;