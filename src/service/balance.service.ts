import { BadRequest } from '../errors';
import BalanceRepository from '../repository/balance.repository';

class BalanceService {
  private balanceRepository: BalanceRepository;
  constructor() {
    this.balanceRepository = new BalanceRepository();
  }

  async createUserBalance(userId: string) {
    try {
      const userBalance =
        await this.balanceRepository.getBalanceByUserId(userId);
      if (userBalance) {
        return userBalance;
      } else {
        return await this.balanceRepository.create({ userId });
      }
    } catch (error) {
        console.log(error);
      throw new BadRequest('Error occured while creating balance');
    }
  }

  async getBalanceByUserId(userId: string) {
    try {
      return await this.balanceRepository.getBalanceByUserId(userId);
    } catch (error) {
      throw new BadRequest('Error occured while getting balance');
    }
  }
}

export default BalanceService;
