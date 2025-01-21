import Joi from 'joi';

export const submitVerificationValidator = Joi.object({
  documentType: Joi.string()
    .required()
    .valid('ID_CARD', 'PASSPORT', 'DRIVERS')
    .messages({
      'any.required': 'Document type is required',
      'any.only': 'Invalid document type',
      'string.empty': 'Document type is required',
    }),
});
