import { IAccount } from '../interface/account.interface';
import Account from '../models/account.model';

class AccountRepository {
  async create(account: IAccount): Promise<Account> {
    return Account.create(account);
  }

  async findById(id: string): Promise<Account | null> {
    return Account.findByPk(id);
  }

  async findAll(): Promise<Account[]> {
    return Account.findAll();
  }

  async update(account: Account): Promise<Account> {
    return account.save();
  }

  async delete(id: string): Promise<void> {
    const account = await Account.findByPk(id);
    if (account) {
      await account.destroy();
    }
  }

  async findAccountByUserId(userId: string): Promise<Account | null> {
    return await Account.findOne({
      where: {
        userId,
      },
    });
  }
}

export default AccountRepository;
