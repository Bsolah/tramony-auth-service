import UserService from '../service/user.service';
import { Request, Response, NextFunction } from 'express';
import {
  validateAddPassword,
  validateAddressInformation,
  validateBasicInformation,
  validatePhoneNumber,
  validateRedeemReferralCode,
  validateUserPhoneNumberOtp,
} from '../validators/user.validator';
import constructResponse from '../utils/constructResponse';

const userService = new UserService();

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedBody = await validatePhoneNumber.validateAsync(req.body);
    const user = await userService.createUser(validatedBody.phoneNumber);
    res.status(201).json(constructResponse(true, 'User created', user));
  } catch (error) {
    next(error);
  }
};

export const verifyUserPhoneNumber = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedBody = await validateUserPhoneNumberOtp.validateAsync(
      req.body,
    );
    const user = await userService.verifyUser(
      validatedBody.phoneNumber,
      validatedBody.otp,
    );
    res.status(200).json(constructResponse(true, 'OTP sent', user));
  } catch (error) {
    next(error);
  }
};

export const addBasicInformation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedBody = await validateBasicInformation.validateAsync(
      req.body,
    );
    const id = req.user.id;
    const user = await userService.addBasicInformation(
      Number(id),
      validatedBody.email,
      validatedBody.firstName,
      validatedBody.lastName,
      validatedBody.dateOfBirth,
    );
    res
      .status(200)
      .json(constructResponse(true, 'Basic information added', user));
  } catch (error) {
    next(error);
  }
};

export const addAddressInformation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user.id;
    const validatedBody = await validateAddressInformation.validateAsync(
      req.body,
    );
    const user = await userService.addAddressInformation(
      Number(id),
      validatedBody.addressLine1,
      validatedBody.city,
      validatedBody.postalCode,
      validatedBody.addressLine2,
    );
    res
      .status(200)
      .json(constructResponse(true, 'Address information added', user));
  } catch (error) {
    next(error);
  }
};

export const addPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user.id;
    const validatedBody = await validateAddPassword.validateAsync(req.body);
    const user = await userService.addPassword(
      Number(id),
      validatedBody.password,
    );
    res.status(200).json(constructResponse(true, 'Password added', user));
  } catch (error) {
    next(error);
  }
};

export const redeemReferralCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user.id;
    const validatedBody = await validateRedeemReferralCode.validateAsync(
      req.body,
    );
    const user = await userService.redeemReferralCode(
      validatedBody.referralCode,
      Number(id),
    );
    res
      .status(200)
      .json(constructResponse(true, 'Referral code redeemed', user));
  } catch (error) {
    next(error);
  }
};

export const getPostCodeId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postalCode = req.params.postalCode;
    console.log(postalCode);
    const postalCodeId = await userService.getPostCodeId(postalCode);
    res
      .status(200)
      .json(constructResponse(true, 'Postal code id retrieved', postalCodeId));
  } catch (error) {
    next(error);
  }
};

export const getPostCodeDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postalCodeId = req.params.postalCodeId;
    const postalCodeDetails =
      await userService.getPostCodeDetails(postalCodeId);
    res
      .status(200)
      .json(
        constructResponse(
          true,
          'Postal code details retrieved',
          postalCodeDetails,
        ),
      );
  } catch (error) {
    next(error);
  }
};

export const getVerificationEmail = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
      const id = req.user.id;
      const email = req.body.email;
        const user = await userService.getEmailVerificationToken(Number(id), email)
        res.status(200).json(constructResponse(true, 'Email Sent', user))
    } catch (error) {
        next(error)
    }
}

export const verifyUserEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.params.token
        const user = await userService.verifyEmailToken(token)
        res.status(200).json(constructResponse(true, "Email Verified", user))
    } catch (error) {
       next(error) 
    }
}

export const getDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.user.id
        const user = await userService.getUserDetails(id)
        res.status(200).json(constructResponse(true, "Details Fetched", user))
    } catch (error) {
        next(error)
    }
}

// export const