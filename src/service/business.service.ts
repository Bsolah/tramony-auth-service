import OtpRepository from '../repository/otp.repository';
import BusinessRepository from '../repository/business.repository';
import { BadRequest } from '../errors';
import bcrypt from 'bcrypt';
import { comparePassword, hashPassword } from '../utils/passwordHashing';
import generateRandomNumber from '../utils/generateRandomNumber';
import otpExpiryDate from '../utils/generateOtpExpiry';
import { generateToken, generateTokenWith2FA } from '../utils/generateToken';
import {
  IRegisterBankAccount,
  IRegisterBusinessDetails,
  IRegisterBusinessOwnerDetails,
} from '../interface/business.interface';
import sendSms from '../utils/sms';
import EmployeeRepository from '../repository/employee.repository';
import { dojah } from '../external/requests';

class BusinessService {
  private otpRepository: OtpRepository;
  private businessRepository: BusinessRepository;
  private employeeRepository: EmployeeRepository;
  constructor() {
    this.otpRepository = new OtpRepository();
    this.businessRepository = new BusinessRepository();
    this.employeeRepository = new EmployeeRepository();
  }
  async registerBusiness(email: string, password: string) {
    try {
      const business = await this.businessRepository.findBusinessByEmail(email);
      if (business && business.isEmailVerified) {
        throw new BadRequest('Business already exists');
      } else if (business && !business.isEmailVerified) {
        await this.otpRepository.deleteOtpByEmail(email);
        const otp = await this.otpRepository.createOtp({
          email,
          otp: generateRandomNumber(4).toString(),
          expiry: otpExpiryDate(10),
        });
        console.log(otp);
        const token = generateToken(business.id, email);
        return { token, business };
      } else {
        const hashedPassword = await hashPassword(password);
        const createdBusiness = await this.businessRepository.registerBusiness({
          email,
          password: hashedPassword,
        });
        const otp = await this.otpRepository.createOtp({
          email,
          otp: generateRandomNumber(4).toString(),
          expiry: otpExpiryDate(10),
        });
        console.log(otp);
        const token = generateTokenWith2FA(createdBusiness.id, email, false);
        return { token, createdBusiness };
      }
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in registering business');
      }
    }
  }

  async verifyBusinessEmail(email: string, otp: string) {
    try {
      const otpRecord = await this.otpRepository.findOtpByEmail(email);
      if (
        otpRecord &&
        otpRecord.otp === otp &&
        new Date(otpRecord.expiry) >= new Date()
      ) {
        const business =
          await this.businessRepository.findBusinessByEmail(email);
        if (business) {
          await this.businessRepository.updateBusiness(business.id, {
            isEmailVerified: true,
          });
          await this.otpRepository.deleteOtpByEmail(email);
          return {};
        } else {
          throw new BadRequest('Business not found');
        }
      } else {
        throw new BadRequest('Invalid OTP');
      }
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in verifying OTP');
      }
    }
  }

  async resendMailOtp(email: string) {
    try {
      const business = await this.businessRepository.findBusinessByEmail(email);
      if (business && !business.isEmailVerified) {
        await this.otpRepository.deleteOtpByEmail(email);
        const otp = await this.otpRepository.createOtp({
          email,
          otp: generateRandomNumber(4).toString(),
          expiry: otpExpiryDate(10),
        });
        console.log(otp);
        return;
      } else {
        throw new BadRequest('Business not found or email already verified');
      }
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in sending OTP');
      }
    }
  }

  async registerBusinessPhoneFor2FA(phoneNumber: string, id: string) {
    try {
      const business = await this.businessRepository.findBusinessById(id);
      await this.otpRepository.deleteOtpByPhone(phoneNumber);
      if (business) {
        await this.businessRepository.updateBusiness(business.id, {
          phoneNumber,
        });
        const otp = await this.otpRepository.createOtp({
          phone: phoneNumber,
          otp: generateRandomNumber(4).toString(),
          expiry: otpExpiryDate(10),
        });
        await sendSms(otp.otp, phoneNumber);
        console.log(otp);
        return;
      } else {
        throw new BadRequest('Business not found');
      }
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in sending OTP');
      }
    }
  }

  async verifyPhone2FAOtp(id: string, phone: string, otp: string) {
    try {
      const otpRecord = await this.otpRepository.findOtpByPhone(phone);
      if (
        otpRecord &&
        otpRecord.otp === otp &&
        new Date(otpRecord.expiry) >= new Date()
      ) {
        const business = await this.businessRepository.findBusinessById(id);
        if (business) {
          await this.businessRepository.updateBusiness(business.id, {
            twoFactorAuth: true,
          });
          await this.otpRepository.deleteOtpByPhone(phone);
          const token = generateTokenWith2FA(business.id, business.email, true);
          return { token, business };
        } else {
          throw new BadRequest('Business not found');
        }
      } else {
        throw new BadRequest('Invalid OTP');
      }
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in verifying OTP');
      }
    }
  }

  async loginBusiness(email: string, password: string) {
    try {
      const business = await this.businessRepository.findBusinessByEmail(email);
      if (business && business.isEmailVerified) {
        const isPasswordMatched = await comparePassword(
          password,
          business.password!,
        );
        if (isPasswordMatched) {
          if (business.twoFactorAuth) {
            await this.otpRepository.deleteOtpByPhone(business.phoneNumber!);
            const otp = await this.otpRepository.createOtp({
              phone: business.phoneNumber!,
              otp: generateRandomNumber(4).toString(),
              expiry: otpExpiryDate(10),
            });
            console.log(otp);
            const token = generateTokenWith2FA(business.id, email, false);
            return { token, business, redirect2FA: true };
          } else {
            const token = generateTokenWith2FA(business.id, email, false);
            return { token, business, redirect2FA: false };
          }
        } else {
          throw new BadRequest('Invalid password');
        }
      } else {
        throw new BadRequest('Business not found or email not verified');
      }
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in logging in business');
      }
    }
  }

  async verifyPhone2FAOtpLogin(id: string, otp: string) {
    try {
      const business = await this.businessRepository.findBusinessById(id);
      if (!business) {
        throw new BadRequest('Business not found');
      }
      const otpRecord = await this.otpRepository.findOtpByPhone(
        business.phoneNumber!,
      );
      if (
        otpRecord &&
        otpRecord.otp === otp &&
        new Date(otpRecord.expiry) >= new Date()
      ) {
        await this.otpRepository.deleteOtpByPhone(business.phoneNumber!);
        const token = generateTokenWith2FA(business.id, business.email, true);
        return { token, business };
      } else {
        throw new BadRequest('Invalid OTP');
      }
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in verifying OTP');
      }
    }
  }

  async getBusinessById(id: string) {
    try {
      const business = await this.businessRepository.findBusinessById(id);
      if (business) {
        return business;
      } else {
        throw new BadRequest('Business not found');
      }
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in getting business');
      }
    }
  }

  async getBusinessDataByCac(rcNumber: string) {
    try {
      const dojahResponse = await dojah.kyb.getCac({
        rcNumber: parseInt(rcNumber),
      });
      if (!dojahResponse.data.entity?.company_name) {
        throw new BadRequest('Unable to verify business registration number');
      }
      return dojahResponse.data;
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in getting business data');
      }
    }
  }

  async getBvnDetails(bvn: string) {
    try {
      const dojahResponse = await dojah.nigeriaKyc.getBasicBvn1({
        bvn: parseInt(bvn),
      });
      if (!dojahResponse.data.entity?.bvn) {
        throw new BadRequest('Unable to verify BVN');
      }
      const otp = generateRandomNumber(4).toString();
      await this.otpRepository.deleteOtpByPhone(
        dojahResponse.data.entity?.mobile!,
      );
      await this.otpRepository.createOtp({
        phone: dojahResponse.data.entity?.mobile,
        otp,
        expiry: otpExpiryDate(10),
      });
      console.log(otp);
      // await sendSms(otp, dojahResponse.data.entity?.mobile!);
      return dojahResponse.data;
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in getting BVN details');
      }
    }
  }

  async verifyBvnOtp(
    id: string,
    bvn: string,
    otp: string,
    phoneNumber: string,
  ) {
    try {
      const otpRecord = await this.otpRepository.findOtpByPhone(phoneNumber);
      if (
        otpRecord &&
        otpRecord.otp === otp &&
        new Date(otpRecord.expiry) >= new Date()
      ) {
        await this.otpRepository.deleteOtpByPhone(phoneNumber);
        await this.businessRepository.updateBusiness(id, {
          bvn,
          personalPhoneNumber: phoneNumber,
        });
        return;
      } else {
        throw new BadRequest('Error verifying BVN OTP');
      }
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in verifying BVN OTP');
      }
    }
  }
  async updateBusinessDetails(id: string, business: IRegisterBusinessDetails) {
    try {
      const updatedBusiness = await this.businessRepository.updateBusiness(
        id,
        business,
      );
      if (updatedBusiness) {
        return updatedBusiness;
      } else {
        throw new BadRequest('Business not found');
      }
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in updating business');
      }
    }
  }

  async updateBusinessOwnerDetails(
    id: string,
    business: IRegisterBusinessOwnerDetails,
  ) {
    try {
      // const dojahResponse = await dojah.nigeriaKyc.getPhoneNumber({
      //   phoneNumber: parseInt(business.personalPhoneNumber),
      // });
      // console.log(dojahResponse.data.entity?.firstName, 'dojahResponse');

      const updatedBusiness = await this.businessRepository.updateBusiness(
        id,
        business,
      );
      if (updatedBusiness) {
        return updatedBusiness;
      } else {
        throw new BadRequest('Business not found');
      }
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in updating business');
      }
    }
  }

  async updateBankAccountDetails(id: string, business: IRegisterBankAccount) {
    try {
      const updatedBusiness = await this.businessRepository.updateBusiness(
        id,
        business,
      );
      if (updatedBusiness) {
        return updatedBusiness;
      } else {
        throw new BadRequest('Business not found');
      }
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in updating business');
      }
    }
  }

  async requestResetPassword(email: string) {
    try {
      const business = await this.businessRepository.findBusinessByEmail(email);
      if (business) {
        await this.otpRepository.deleteOtpByEmail(email);
        const otp = await this.otpRepository.createOtp({
          email,
          otp: generateRandomNumber(4).toString(),
          expiry: otpExpiryDate(10),
        });
        console.log(otp);
        return;
      } else {
        throw new BadRequest('Business not found');
      }
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in sending OTP');
      }
    }
  }

  async verifyResetPasswordOtp(email: string, otp: string) {
    try {
      const otpRecord = await this.otpRepository.findOtpByEmail(email);
      if (
        otpRecord &&
        otpRecord.otp === otp &&
        new Date(otpRecord.expiry) >= new Date()
      ) {
        await this.otpRepository.deleteOtpByEmail(email);
        const business =
          await this.businessRepository.findBusinessByEmail(email);
        if (!business) {
          throw new BadRequest('Business not found');
        }
        await this.businessRepository.updateBusiness(business.id, {
          passwordReset: true,
        });
        const token = generateTokenWith2FA(otpRecord.id, email, true);
        return { token, business };
      } else {
        throw new BadRequest('Invalid OTP');
      }
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in verifying OTP');
      }
    }
  }

  async resetPassword(email: string, password: string) {
    try {
      const business = await this.businessRepository.findBusinessByEmail(email);
      if (business && business.passwordReset) {
        const hashedPassword = await hashPassword(password);
        await this.businessRepository.updateBusiness(business.id, {
          password: hashedPassword,
          passwordReset: false,
        });
        return business;
      } else {
        throw new BadRequest('Error in resetting password');
      }
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in resetting password');
      }
    }
  }

  async registerEmployee(email: string, businessId: string) {
    try {
      const employee = await this.employeeRepository.findEmployeeByEmail(email);
      if (employee) {
        throw new BadRequest('Employee already exists');
      } else {
        const passcode = generateRandomNumber(6).toString();
        const existingPasscode =
          await this.employeeRepository.findEmployeeByPassCode(passcode);
        if (existingPasscode) {
          await this.registerEmployee(email, businessId);
        }
        const createdEmployee = await this.employeeRepository.createEmployee({
          email,
          passcode,
          businessId,
        });
        // await sendSms(passcode, email);
        return createdEmployee;
      }
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new Error('Error in registering employee');
      }
    }
  }

  async getAllEmployees(businessId: string) {
    try {
      const employees =
        await this.employeeRepository.findEmployeeByBusinessId(businessId);
      return employees;
    } catch (error) {
      console.log(error);
      throw new Error('Error in getting employees');
    }
  }
}

export default BusinessService;
