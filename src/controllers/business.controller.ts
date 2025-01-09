import BusinessService from '../service/business.service';
import { Request, Response, NextFunction } from 'express';
import {
  validateBankAccountUpdate,
  validateBusinessDetailsUpdate,
  validateBusinessOwnerDetailsUpdate,
  validateBusinessRegistration,
  validateEmployeeRegistration,
  validateLoginBusiness,
  validateOtp,
  validateOtpDetails,
  validatePasswordUpdate,
  validatePhoneOtpDetails,
  validateRegister2FA,
  validateResendMailOtp,
  validateVerifyBvnOtp,
} from '../validators/business.validator';
import { IRegisterBusiness } from '../interface/business.interface';
import {
  IEmail,
  IPhone,
  IValidateOtp,
  IValidatePhoneOtp,
} from '../interface/general.interface';
import constructResponse from '../utils/constructResponse';
import sendMail from '../utils/mail';

const businessService = new BusinessService();

export const registerBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = (await validateBusinessRegistration.validateAsync(
      req.body,
    )) as IRegisterBusiness;
    const business = await businessService.registerBusiness(
      body.email,
      body.password,
    );
    res
      .status(201)
      .json(
        constructResponse(200, 'Business registered successfully', business),
      );
  } catch (error) {
    next(error);
  }
};

export const verifyBusinessEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = (await validateOtpDetails.validateAsync(
      req.body,
    )) as IValidateOtp;
    const business = await businessService.verifyBusinessEmail(
      body.email,
      body.otp,
    );
    res.status(200).json(constructResponse(200, 'Email verified', business));
  } catch (error) {
    next(error);
  }
};

export const resendMailOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = (await validateResendMailOtp.validateAsync(
      req.body,
    )) as IEmail;
    const business = await businessService.resendMailOtp(body.email);
    res.status(200).json(constructResponse(200, 'OTP resent', business));
  } catch (error) {
    next(error);
  }
};

export const register2FA = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = (await validateRegister2FA.validateAsync(req.body)) as IPhone;
    const id = req.user?.id;
    const business = await businessService.registerBusinessPhoneFor2FA(
      body.phoneNumber,
      id,
    );
    res.status(200).json(constructResponse(200, '2FA registered', business));
  } catch (error) {
    next(error);
  }
};

export const verify2FA = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = (await validatePhoneOtpDetails.validateAsync(
      req.body,
    )) as IValidatePhoneOtp;
    const id = req.user?.id;
    const business = await businessService.verifyPhone2FAOtp(
      id,
      body.phoneNumber,
      body.otp,
    );
    res.status(200).json(constructResponse(200, '2FA verified', business));
  } catch (error) {
    next(error);
  }
};

export const loginBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = await validateLoginBusiness.validateAsync(req.body);
    const business = await businessService.loginBusiness(
      body.email,
      body.password,
    );
    res.status(200).json(constructResponse(200, 'Login successful', business));
  } catch (error) {
    next(error);
  }
};

export const verify2FAForLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = await validateOtp.validateAsync(req.body);
    const id = req.user?.id;
    const business = await businessService.verifyPhone2FAOtpLogin(id, body.otp);
    res.status(200).json(constructResponse(200, '2FA verified', business));
  } catch (error) {
    next(error);
  }
};

export const getBusinessDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user?.id;
    const business = await businessService.getBusinessById(id);
    await sendMail('sinaayopopoola@gmail.com', 'Business Details', '<h1>Business Details</h1>');
    res
      .status(200)
      .json(constructResponse(200, 'Business details Fetched', business));
  } catch (error) {
    next(error);
  }
};

export const updateBusinessDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user?.id;
    const body = await validateBusinessDetailsUpdate.validateAsync(req.body);
    const business = await businessService.updateBusinessDetails(id, body);
    res
      .status(200)
      .json(constructResponse(200, 'Business details updated', business));
  } catch (error) {
    next(error);
  }
};

export const updateBusinessOwnerDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user?.id;
    const body = await validateBusinessOwnerDetailsUpdate.validateAsync(
      req.body,
    );
    const business = await businessService.updateBusinessOwnerDetails(id, body);
    res
      .status(200)
      .json(constructResponse(200, 'Owner details updated', business));
  } catch (error) {
    next(error);
  }
};

export const updateBankAccountDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user?.id;
    const body = await validateBankAccountUpdate.validateAsync(req.body);
    const business = await businessService.updateBankAccountDetails(id, body);
    res
      .status(200)
      .json(constructResponse(200, 'Bank details updated', business));
  } catch (error) {
    next(error);
  }
};

export const requestResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = await validateResendMailOtp.validateAsync(req.body);
    const business = await businessService.requestResetPassword(body.email);
    res.status(200).json(constructResponse(200, 'OTP sent', business));
  } catch (error) {
    next(error);
  }
};

export const verifyResetPasswordOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = await validateOtpDetails.validateAsync(req.body);
    const business = await businessService.verifyResetPasswordOtp(
      body.email,
      body.otp,
    );
    res.status(200).json(constructResponse(200, 'OTP verified', business));
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = await validatePasswordUpdate.validateAsync(req.body);
    const email = req.user?.email;
    const business = await businessService.resetPassword(email, body.password);
    res.status(200).json(constructResponse(200, 'Password updated', business));
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = await validateEmployeeRegistration.validateAsync(req.body);
    const employee = await businessService.registerEmployee(
      body.email,
      req.user?.id,
    );
    res.status(201).json(constructResponse(200, 'Employee created', employee));
  } catch (error) {
    next(error);
  }
};

export const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employees = await businessService.getAllEmployees(req.user?.id);
    res
      .status(200)
      .json(constructResponse(200, 'Employees fetched', employees));
  } catch (error) {
    next(error);
  }
};

export const getBusinessInformationFromCacNumber = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cacNumber = req.query.cacNumber;
    const business = await businessService.getBusinessDataByCac(
      String(cacNumber),
    );
    res.status(200).json(constructResponse(200, 'Business fetched', business));
  } catch (error) {
    next(error);
  }
};

export const getBvnInformation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bvn = req.query.bvn;
    const bvnData = await businessService.getBvnDetails(String(bvn));
    res.status(200).json(constructResponse(200, 'BVN fetched', bvnData));
  } catch (error) {
    next(error);
  }
};

export const verifyBvnOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = await validateVerifyBvnOtp.validateAsync(req.body);
    const bvnData = await businessService.verifyBvnOtp(
      req.user?.id,
      body.bvn,
      body.otp,
      body.phoneNumber,
    );
    res.status(200).json(constructResponse(200, 'BVN verified', bvnData));
  } catch (error) {
    next(error);
  }
};