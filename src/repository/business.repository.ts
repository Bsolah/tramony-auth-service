import { IRegisterBusiness } from '../interface/business.interface';
import Business from '../models/business.model';

class BusinessRepository {
  constructor() {}

  async registerBusiness(business: IRegisterBusiness) {
    const createdBusiness = await Business.create({ ...business });
    return createdBusiness;
  }

  async findBusinessByEmail(email: string) {
    const business = await Business.findOne({ where: { email } });
    return business;
  }

  async findBusinessById(id: string) {
    const business = await Business.findByPk(id);
    return business;
  }

  async findBusinessByPhone(phoneNumber: string) {
    const business = await Business.findOne({ where: { phoneNumber } });
    return business;
  }

  async updateBusiness(id: string, business: any) {
    const [affectedRowsCount, [updatedRecord]] = await Business.update(
      { ...business },
      { where: { id }, returning: true, validate: true },
    );
    if (affectedRowsCount > 0 && updatedRecord) {
      return updatedRecord;
    }
  }
}

export default BusinessRepository;