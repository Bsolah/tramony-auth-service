import { IRegisterBusiness } from '../interface/business.interface';
import Business from '../models/business';

class BusinessRepository {
  constructor() {}

  async registerBusiness(business: IRegisterBusiness) {
    const createdBusiness = await Business.create({ ...business });
    return createdBusiness;
  }
}
