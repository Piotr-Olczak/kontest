import { apiGetData } from 'helpers/apiConnector';

class DepositHelper {
  generateForm(amount: number): Promise<any> {
    return apiGetData(
      `/player/financial/generate-payment-form?amount=${amount}`
    );
  }
}

export const depositHelper = new DepositHelper();
