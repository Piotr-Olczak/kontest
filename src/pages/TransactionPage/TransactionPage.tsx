import { Alert } from 'antd';
import BasicLayout from 'components/BasicLayout/BasicLayout';
import { SettingsPageLayout } from 'components/SettingsPageLayout/SettingsPageLayout';
import { Spinner } from 'components/Spinner/Spinner';
import {
  FinancialOperations,
  FinancialOperationsShape
} from 'components/FinancialOperations/FinancialOperations';
import { userSettingsHelper } from 'helpers/userSettings.helper';
import React, { useEffect, useState } from 'react';

export const TransactionPage: React.FC = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState();
  const [financialTransactions, setFinancialTransactions] = useState<
    FinancialOperationsShape[]
  >([]);
  useEffect(() => {
    setIsLoading(true);
    setLoadingError(false);
    userSettingsHelper
      .fetchTransactions()
      .then(response => {
        setFinancialTransactions(response.financialOperationsList);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setLoadingError(true);
      });
  }, []);

  return (
    <BasicLayout>
      <SettingsPageLayout icon={'refresh'} pageTitle="Operacje finansowe">
        <div className={'transactions'}>
          {isLoading && <Spinner />}
          {!isLoading && (
            <>
              {loadingError && (
                <Alert message="Błąd pobierania danych" type="error" />
              )}
              <FinancialOperations transactions={financialTransactions} />
            </>
          )}
        </div>
      </SettingsPageLayout>
    </BasicLayout>
  );
};
