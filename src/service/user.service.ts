import axios from 'axios';
import { BadRequest } from '../errors';
import OtpRepository from '../repository/otp.repository';
import UserRepository from '../repository/user.repository';
import otpExpiryDate from '../utils/generateOtpExpiry';
import generateRandomNumber from '../utils/generateRandomNumber';
import { generateCompletedToken, generateToken } from '../utils/generateToken';
import { hashPassword } from '../utils/passwordHashing';
import getAddress from 'getaddress-api';

class UserService {
  private userRepository: UserRepository;
  private otpRepository: OtpRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.otpRepository = new OtpRepository();
  }

  async createUser(phoneNumber: string) {
    try {
      const getUser =
        await this.userRepository.getUserByPhoneNumber(phoneNumber);
      if (getUser) {
        throw new BadRequest('Phone Number already registered');
      }
      const referralCode = Math.random().toString(36).substring(7);
      const user = await this.userRepository.createUser(
        phoneNumber,
        referralCode,
      );
      const otp = await this.otpRepository.createOtp({
        phone: phoneNumber,
        otp: generateRandomNumber(6).toString(),
        expiry: otpExpiryDate(10),
      });
      console.log(otp);
      return user;
    } catch (error) {
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
        await this.otpRepository.deleteOtpByPhone(phoneNumber);
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
    addressLine2: string,
    city: string,
    postalCode: string,
  ) {
    try {
      const user = await this.userRepository.addAddressInformation(
        id,
        addressLine1,
        addressLine2,
        city,
        postalCode,
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
      const api = new getAddress('');
      const autocompleteResult = await api.autocomplete(postalCode);
      return autocompleteResult;
    } catch (error) {
      throw new BadRequest(
        'Error occured while getting postal code information',
      );
    }
  }
  async getPostCodeDetails(id: string) {
    try {
      const api = new getAddress('');
      const details = await api.get(id);
      return details;
    } catch (error) {
      throw new BadRequest(
        'Error occured while getting postal code information',
      );
    }
  }
}

export default UserService;
