import AccountRepository from '../repository/account.repository';
import { clearBankInstance } from '../external/requests';
import { BadRequest } from '../errors';
import { v4 as uuidv4 } from 'uuid';

class AccountService {
  private accountRepository: AccountRepository;
  constructor() {
    this.accountRepository = new AccountRepository();
  }

  async createClearBankAccount(account: any) {
    try {
      const id = await this.getRealAccountID();
      const response = await clearBankInstance.post(
        `/v2/Accounts/${id}/Virtual`,
        {
          virtualAccounts: [
            {
              ownerName: `${account.firstName} ${account.lastName}`,
              accountIdentifier: {
                ExternalIdentifier: account.id.toString(),
              },
            },
          ],
        },
      );
    } catch (error: any) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new BadRequest('Error occured while creating account');
      }
    }
  }

  async getRealAccountID() {
    try {
      const response = await clearBankInstance.get(`/v3/accounts`);
      return response.data[0]?.id;
    } catch (error: any) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new BadRequest('Error occured while getting account details');
      }
    }
  }

  async webhookVerification(body: any) {
    try {
      switch (body.type) {
        case 'VirtualAccountCreated':
          await this.accountRepository.create({
            accountName: body.Payload.OwnerName,
            accountNumber: body.Payload.AccountIdentifier.Bban,
            userId: body.Payload.AccountIdentifier.ExternalIdentifier,
            accountId: body.Payload.VirtualAccountId,
          });
      }
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new BadRequest('Error occured while verifying webhook');
      }
    }
  }

  async getAccountByUserId(userId: string) {
    try {
      return await this.accountRepository.findAccountByUserId(userId);
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new BadRequest('Error occured while getting account details');
      }
    }
  }
}
