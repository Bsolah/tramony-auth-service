import Joi from 'joi';

export const validateEmployeeLogin = Joi.object({
  passcode: Joi.string().min(6).max(6).required().messages({
    'string.base': 'Passcode must be a string',
    'string.empty': 'Passcode cannot be empty',
    'any.required': 'Passcode is required',
    'string.min': 'Passcode must be at least 6 characters long',
    'string.max': 'Passcode must be at most 6 characters long',
  }),
});
