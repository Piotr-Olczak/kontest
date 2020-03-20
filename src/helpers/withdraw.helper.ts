import { apiPostData } from 'helpers/apiConnector';

class WithdrawHelper {
  requestWithdraw(amount: number, password: string): Promise<any> {
    const payload = {
      amount,
      password
    };
    const requestWithdrawalEndpoint = 'player/financial/request-withdrawal';
    return apiPostData(requestWithdrawalEndpoint, payload);
  }
}

export const withdrawHelper = new WithdrawHelper();
