import config from '../config';
import { BadRequest } from '../errors';
import { addressIoInstance } from '../external/requests';
import OtpRepository from '../repository/otp.repository';
import UserRepository from '../repository/user.repository';
import otpExpiryDate from '../utils/generateOtpExpiry';
import generateRandomNumber from '../utils/generateRandomNumber';
import {
  generateCompletedToken,
  generateEmailVerificationToken,
} from '../utils/generateToken';
import sendMail from '../utils/mail';
import { comparePassword, hashPassword } from '../utils/passwordHashing';
import jwt from 'jsonwebtoken';
import { emailOtpHtml } from '../views/sendOtpEmail';
import sendSms from '../utils/sms';

class UserService {
  private userRepository: UserRepository;
  private otpRepository: OtpRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.otpRepository = new OtpRepository();
  }

  async getUserDetails(id: string) {
    try {
      const user = await this.userRepository.getUserById(Number(id));
      return user;
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new BadRequest('Error occured while creating user');
      }
    }
  }

  async createUser(phoneNumber: string) {
    try {
      const getUser =
        await this.userRepository.getUserByPhoneNumber(phoneNumber);
      if (getUser) {
        throw new BadRequest('Phone Number already registered');
      }
      const referralCode = Math.random().toString(36).substring(7);
      const getUserUnverified =
        await this.userRepository.getUnverifiedUserByPhoneNumber(phoneNumber);
      if (getUserUnverified) {
        await this.otpRepository.deleteOtpByPhone(phoneNumber);
        const otp = await this.otpRepository.createOtp({
          phone: phoneNumber,
          otp: generateRandomNumber(6).toString(),
          expiry: otpExpiryDate(10),
        });
        // await sendSms(otp.otp, phoneNumber);
        return otp;
      }
      const user = await this.userRepository.createUser(
        phoneNumber,
        referralCode,
      );
      const otp = await this.otpRepository.createOtp({
        phone: phoneNumber,
        otp: generateRandomNumber(6).toString(),
        expiry: otpExpiryDate(10),
      });
      // await sendSms(phoneNumber, otp.otp);
      return otp;
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new BadRequest('Error occured while creating user');
      }
    }
  }

  async verifyUser(phoneNumber: string, otp: string) {
    try {
      const otpDetails = await this.otpRepository.findOtpByPhone(phoneNumber);
      if (!otpDetails) {
        throw new BadRequest('Invalid OTP');
      }
      if (otpDetails.otp !== otp) {
        throw new BadRequest('Invalid OTP');
      }
      if (new Date(otpDetails?.expiry) < new Date()) {
        await this.otpRepository.deleteOtpByPhone(phoneNumber);
        throw new BadRequest('OTP expired');
      }
      const user = await this.userRepository.verifyUser(phoneNumber);
      if (!user) {
        throw new BadRequest('Invalid Phone Number');
      }
      await this.otpRepository.deleteOtpByPhone(phoneNumber);
      const token = generateCompletedToken(user.id.toString(), phoneNumber);
      return { user, token };
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new BadRequest('Error occured while verifying user');
      }
    }
  }

  async addBasicInformation(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
  ) {
    try {
      const user = await this.userRepository.addBasicInformation(
        id,
        email,
        firstName,
        lastName,
        dateOfBirth,
      );
      if (!user) {
        throw new BadRequest('Invalid User');
      }
      return user;
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new BadRequest('Error occured while adding basic information');
      }
    }
  }

  async addAddressInformation(
    id: number,
    addressLine1: string,
    city: string,
    postalCode: string,
    addressLine2?: string,
  ) {
    try {
      const user = await this.userRepository.addAddressInformation(
        id,
        addressLine1,
        city,
        postalCode,
        addressLine2,
      );
      if (!user) {
        throw new BadRequest('Invalid User');
      }
      return user;
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new BadRequest('Error occured while adding address information');
      }
    }
  }

  async addPassword(id: number, password: string) {
    try {
      const hashedPassword = await hashPassword(password);
      const user = await this.userRepository.addPassword(id, hashedPassword);
      if (!user) {
        throw new BadRequest('Invalid User');
      }
      return user;
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new BadRequest('Error occured while adding password');
      }
    }
  }

  async redeemReferralCode(referralCode: string, userId: number) {
    {
      try {
        const userReferral =
          await this.userRepository.getUserByReferralCode(referralCode);
        if (!userReferral) {
          throw new BadRequest('Invalid Referral Code');
        }
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
          throw new BadRequest('Invalid User');
        }
      } catch (error) {
        if (error instanceof BadRequest) {
          throw error;
        } else {
          throw new BadRequest('Error occured while redeeming referral code');
        }
      }
    }
  }

  async getPostCodeId(postalCode: string) {
    try {
      const autocompleteResult = await addressIoInstance.get(
        `/autocomplete/${postalCode}?api-key=${config().addressIoKey}`,
      );
      return autocompleteResult.data;
    } catch (error) {
      console.log(error);
      throw new BadRequest(
        'Error occured while getting postal code information',
      );
    }
  }
  async getPostCodeDetails(id: string) {
    try {
      const details = await addressIoInstance.get(
        `/get/${id}?api-key=${config().addressIoKey}`,
      );
      return details.data;
    } catch (error) {
      throw new BadRequest(
        'Error occured while getting postal code information',
      );
    }
  }

  async getEmailVerificationToken(id: number, email: string) {
    try {
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        throw new BadRequest('Invalid User');
      }
      if (email) {
        const token = generateEmailVerificationToken(id.toString(), email);
        await sendMail(
          email!,
          'Email Verification',
          emailOtpHtml(`${config().baseUrl}/user/email/verify/${token}`),
        );
        return {};
      } else {
        const token = generateEmailVerificationToken(
          id.toString(),
          user.email!,
        );
        await sendMail(
          user.email!,
          'Email Verification',
          emailOtpHtml(`${config().baseUrl}/email/verify/${token}`),
        );
        return {};
      }
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new BadRequest(
          'Error occured while generating email verification token',
        );
      }
    }
  }

  async verifyEmailToken(token: string) {
    try {
      const decodedToken = jwt.verify(token, config().jwtSecret) as {
        id: string;
        email: string;
      };
      const user = await this.userRepository.getUserById(
        Number(decodedToken.id),
      );
      if (user) {
        await this.userRepository.verifyEmail(
          Number(decodedToken.id),
          decodedToken.email,
        );
        return {};
      } else {
        throw new BadRequest('Error verifying user, please try again');
      }
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new BadRequest('Error occured while verifying user');
      }
    }
  }

  async loginByPhone(phoneNumber: string, password: string) {
    try {
      const user = await this.userRepository.getUserByPhoneNumber(phoneNumber);
      if (!user) {
        throw new BadRequest('Invalid Phone Number');
      }
      if (!user.verified) {
        throw new BadRequest('Phone Number not verified');
      }
      const passwordMatch = await comparePassword(password, user.password!);
      if (!passwordMatch) {
        throw new BadRequest('Invalid Password');
      }
      await this.otpRepository.deleteOtpByPhone(phoneNumber);
      const otp = await this.otpRepository.createOtp({
        phone: phoneNumber,
        otp: generateRandomNumber(6).toString(),
        expiry: otpExpiryDate(10),
      });
      return { otp };
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new BadRequest('Error occured while logging in');
      }
    }
  }

  // async forgotPassword(phoneNumber: string) { }
}

export default UserService;
