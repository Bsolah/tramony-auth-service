import User from '../models/user';

class UserRepository {
  async createUser(phoneNumber: string, referralCode: string) {
    return User.create({ phoneNumber, referralCode });
  }

  async getUserByPhoneNumber(phoneNumber: string) {
    return User.findOne({ where: { phoneNumber, verified: true } });
  }

  async getUnverifiedUserByPhoneNumber(phoneNumber: string) {
    return User.findOne({ where: { phoneNumber, verified: false } });
  }

  async verifyUser(phoneNumber: string) {
    const [affectedRowsCount, [updatedRecord]] = await User.update(
      { verified: true },
      { where: { phoneNumber }, returning: true, validate: true },
    );
    if (affectedRowsCount > 0 && updatedRecord) {
      return updatedRecord;
    }
  }

  async addBasicInformation(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
  ) {
    const [affectedRowsCount, [updatedRecord]] = await User.update(
      { email, firstName, lastName, dateOfBirth },
      { where: { id }, returning: true, validate: true },
    );
    if (affectedRowsCount > 0 && updatedRecord) {
      return updatedRecord;
    }
  }

  async addAddressInformation(
    id: number,
    addressLine1: string,
    city: string,
    postalCode: string,
    addressLine2?: string,
  ) {
    const [affectedRowsCount, [updatedRecord]] = await User.update(
      { addressLine1, addressLine2, city, postalCode },
      { where: { id }, returning: true, validate: true },
    );
    if (affectedRowsCount > 0 && updatedRecord) {
      return updatedRecord;
    }
  }

  async addPassword(id: number, password: string) {
    const [affectedRowsCount, [updatedRecord]] = await User.update(
      { password },
      { where: { id }, returning: true, validate: true },
    );
    if (affectedRowsCount > 0 && updatedRecord) {
      return updatedRecord;
    }
  }

  async verifyEmail(id: number, email: string) {
    return User.update({ isEmailVerified: true, email }, { where: { id } });
  }

  async getUserById(id: number) {
    return User.findOne({ where: { id } });
  }

  async getUserByReferralCode(referralCode: string) {
    return User.findOne({ where: { referralCode } });
  }

  async updateRedeemReferralStatus(id: number) {
    const [affectedRowsCount, [updatedRecord]] = await User.update(
      { hasRedeemedReferral: true },
      { where: { id }, returning: true, validate: true },
    );
    if (affectedRowsCount > 0 && updatedRecord) {
      return updatedRecord;
    }
  }
}

export default UserRepository;
