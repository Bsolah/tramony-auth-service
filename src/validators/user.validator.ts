import Joi from 'joi';

export const validatePhoneNumber = Joi.object({
  phoneNumber: Joi.string().required().messages({
    'string.empty': 'Phone number is required',
    'any.required': 'Phone number is required',
  }),
});

export const validatePhoneNumberLogin = Joi.object({
  phoneNumber: Joi.string().required().messages({
    'string.empty': 'Phone number is required',
    'any.required': 'Phone number is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
});

export const validateUserPhoneNumberOtp = Joi.object({
  otp: Joi.string().required().messages({
    'string.empty': 'OTP is required',
    'any.required': 'OTP is required',
  }),
  phoneNumber: Joi.string().required().messages({
    'string.empty': 'Phone number is required',
    'any.required': 'Phone number is required',
  }),
});

export const validateBasicInformation = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
    'string.email': 'Invalid email',
  }),
  firstName: Joi.string().required().messages({
    'string.empty': 'First name is required',
    'any.required': 'First name is required',
  }),
  lastName: Joi.string().required().messages({
    'string.empty': 'Last name is required',
    'any.required': 'Last name is required',
  }),
  dateOfBirth: Joi.string().required().messages({
    'string.empty': 'Date of birth is required',
    'any.required': 'Date of birth is required',
  }),
});

export const validateAddressInformation = Joi.object({
  addressLine1: Joi.string().required().messages({
    'string.empty': 'Address is required',
    'any.required': 'Address is required',
  }),
  addressLine2: Joi.string().allow(''),
  city: Joi.string().required().messages({
    'string.empty': 'City is required',
    'any.required': 'City is required',
  }),
  postalCode: Joi.string().required().messages({
    'string.empty': 'Postal code is required',
    'any.required': 'Postal code is required',
  }),
});

export const validateAddPassword = Joi.object({
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
});

export const validateRedeemReferralCode = Joi.object({
  referralCode: Joi.string().required().messages({
    'string.empty': 'Referral code is required',
    'any.required': 'Referral code is required',
  }),
});
