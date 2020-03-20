import { apiPostData } from 'helpers/apiConnector';

class UserSettingsHelper {
  fetchTransactions(): Promise<any> {
    const financialTransactionsFilter = {
      sortingOrder: 'DESC'
    };
    const getFinancialOperationsEndpoint = 'player/financial/get-operations';
    return apiPostData(
      getFinancialOperationsEndpoint,
      financialTransactionsFilter
    );
  }
}

export const userSettingsHelper = new UserSettingsHelper();
