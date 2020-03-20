import * as yup from 'yup';
import { FieldsHelper } from 'helpers/fields.helper';

export const balanceLimitValidationMessages = {
  isEmpty: 'To pole jest wymagane',
  // eslint-disable-next-line
  isMax: 'Limit musi być mniejszy niż ${max}zł',
  // eslint-disable-next-line
  isMin: 'Limit musi być większy niż ${min}zł',
  isBadType: 'To pole musi być liczbą',
  isDailyMoreThanMonthly: 'Limit dzienny musi być mniejszy od miesięcznego'
};

export const getBalanceLimitValidationSchema = (
  minBalanceLimit: number,
  maxBalanceLimit: number
) => {
  const balanceLimitValidationSchema = yup
    .number()
    .typeError(balanceLimitValidationMessages.isBadType)
    .min(minBalanceLimit, balanceLimitValidationMessages.isMin)
    .max(maxBalanceLimit, balanceLimitValidationMessages.isMax)
    .required(balanceLimitValidationMessages.isEmpty)
    .test(
      'Daily more than monthly',
      balanceLimitValidationMessages.isDailyMoreThanMonthly,
      function testDailyMoreThanMonthly(): boolean {
        return FieldsHelper.isBalanceDailyGreaterThanMonthly(this.parent);
      }
    );
  return balanceLimitValidationSchema;
};
