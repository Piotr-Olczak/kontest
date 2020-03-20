export type FinancialOperationsFilterSortingField =
  | 'ACCEPT_REJECT_CANCEL_TIMESTAMP'
  | 'AMOUNT'
  | 'CREATION_TIMESTAMP'
  | 'OPERATION_NUMBER'
  | 'PENDING_TIMESTAMP'
  | 'STATUS'
  | 'TYPE';

export type FinancialOperationStatus =
  | 'ACCEPTED'
  | 'CANCELLED'
  | 'CLOSED_MANUALLY'
  | 'CREATED'
  | 'PENDING'
  | 'REJECTED';

export type FinancialOperationType =
  | 'PAYMENT'
  | 'WIN_AND_OR_RETURN'
  | 'TOP_UP'
  | 'WITHDRAWAL'
  | 'UNSUCCESSFULL_WITHDRAWAL_RETURN'
  | 'BALANCE_CORRECTION';
