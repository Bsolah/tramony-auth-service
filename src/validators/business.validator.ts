import Joi from 'joi';

export const validateBusinessRegistration = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required',
  }),
});

export const validateOtpDetails = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required',
  }),
  otp: Joi.string().required().messages({
    'string.base': 'OTP must be a string',
    'any.required': 'OTP is required',
  }),
});

export const validateResendMailOtp = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required',
  }),
});

export const validateRegister2FA = Joi.object({
  phoneNumber: Joi.string().required().messages({
    'string.base': 'Phone number must be a string',
    'any.required': 'Phone number is required',
  }),
});

export const validatePhoneOtpDetails = Joi.object({
  phoneNumber: Joi.string().required().messages({
    'string.base': 'Phone number must be a string',
    'any.required': 'Phone number is required',
  }),
  otp: Joi.string().required().messages({
    'string.base': 'OTP must be a string',
    'any.required': 'OTP is required',
  }),
});

export const validateLoginBusiness = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
  }),
});

export const validateBusinessDetailsUpdate = Joi.object({
  businessName: Joi.string().required().messages({
    'string.base': 'Business name must be a string',
    'any.required': 'Business name is required',
  }),
  businessAddress: Joi.string().required().messages({
    'string.base': 'Business address must be a string',
    'any.required': 'Business address is required',
  }),
  category: Joi.string().required().messages({
    'string.base': 'Business category must be a string',
    'any.required': 'Business category is required',
  }),
  businessVerification: Joi.boolean().required().messages({
    'boolean.base': 'Business verification must be a boolean',
    'any.required': 'Business verification is required',
  }),
  subCategory: Joi.string().required().messages({
    'string.base': 'Business sub category must be a string',
    'any.required': 'Business sub category is required',
  }),
  type: Joi.string().required().messages({
    'string.base': 'Type must be a string',
    'any.required': 'Type is required',
  }),
  registrationNumber: Joi.string().required().messages({
    'string.base': 'Registration number must be a string',
    'any.required': 'Registration number is required',
  }),
  revenue: Joi.string().required().messages({
    'string.base': 'Revenue must be a string',
    'any.required': 'Revenue is required',
  }),
});

export const validateBusinessOwnerDetailsUpdate = Joi.object({
  dateOfBirth: Joi.string().required().messages({
    'string.base': 'Date of birth must be a string',
    'any.required': 'Date of birth is required',
  }),
  homeAddress: Joi.string().required().messages({
    'string.base': 'Home address must be a string',
    'any.required': 'Home address is required',
  }),
  firstName: Joi.string().required().messages({
    'string.base': 'First name must be a string',
    'any.required': 'First name is required',
  }),
  lastName: Joi.string().required().messages({
    'string.base': 'Last name must be a string',
    'any.required': 'Last name is required',
  }),
});

export const validateBankAccountUpdate = Joi.object({
  bankName: Joi.string().required().messages({
    'string.base': 'Bank name must be a string',
    'any.required': 'Bank name is required',
  }),
  accountNumber: Joi.string().required().messages({
    'string.base': 'Account number must be a string',
    'any.required': 'Account number is required',
  }),
});

export const validatePasswordUpdate = Joi.object({
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
  }),
});

export const validateOtp = Joi.object({
  otp: Joi.string().required().messages({
    'string.base': 'OTP must be a string',
    'any.required': 'OTP is required',
  }),
});

export const validateEmployeeRegistration = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required',
  }),
});

export const validateVerifyBvnOtp = Joi.object({
  otp: Joi.string().required().messages({
    'string.base': 'OTP must be a string',
    'any.required': 'OTP is required',
  }),
  bvn: Joi.string().required().messages({
    'string.base': 'BVN must be a string',
    'any.required': 'BVN is required',
  }),
  phoneNumber: Joi.string().required().messages({
    'string.base': 'Phone number must be a string',
    'any.required': 'Phone number is required',
  }),
});