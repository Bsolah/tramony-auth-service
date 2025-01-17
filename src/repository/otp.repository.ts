import { ICreateOtp } from '../interface/otp.interface';
import Otp from '../models/otp.model';

class OtpRepository {
  constructor() {}

  async createOtp(otp: ICreateOtp) {
    const createdOtp = await Otp.create({ ...otp });
    return createdOtp;
  }

  async findOtpByEmail(email: string) {
    const otp = await Otp.findOne({ where: { email } });
    return otp;
  }

  async findOtpByPhone(phone: string) {
    const otp = await Otp.findOne({ where: { phone } });
    return otp;
  }

  async updateOtpById(id: string, otp: string, expiry: string) {
    const [affectedRowsCount, [updatedRecord]] = await Otp.update(
      { otp, expiry },
      { where: { id }, returning: true, validate: true },
    );
    if (affectedRowsCount > 0 && updatedRecord) {
      return updatedRecord;
    }
  }

  async deleteOtpById(id: string) {
    const otp = await Otp.destroy({ where: { id } });
    return otp;
  }

  async deleteOtpByEmail(email: string) {
    const otp = await Otp.destroy({ where: { email } });
    return otp;
  }

  async deleteOtpByPhone(phone: string) {
    const otp = await Otp.destroy({ where: { phone } });
    return otp;
  }
}

export default OtpRepository;
