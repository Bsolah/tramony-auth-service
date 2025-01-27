import { ICreateBalance } from '../interface/balance.interface';
import Balance from '../models/balance.model';

class BalanceRepository {
  async create(balance: ICreateBalance): Promise<Balance> {
    return Balance.create({ ...balance, ngn: 0, gbp: 0, usd: 0 });
  }

  async updateBalanceByUserId(userId: string, data: any) {
    const [affectedRowsCount, [updatedRecord]] = await Balance.update(data, {
      where: { userId },
      returning: true,
      validate: true,
    });

    if (affectedRowsCount > 0 && updatedRecord) {
      return updatedRecord;
    }
  }

  getBalanceByUserId = async (userId: string) => {
    return await Balance.findOne({ where: { userId } });
  };
}

export default BalanceRepository;
