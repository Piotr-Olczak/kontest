import * as yup from 'yup';
import { FieldsHelper } from 'helpers/fields.helper';

export const timeLimitValidationMessages = {
  isEmpty: 'To pole jest wymagane',
  isMin: 'Limit musi być dłuższy',
  isMax: 'Limit musi być krótszy',
  isBadType: 'To pole musi być liczbą',
  isLessThanMonthly: 'Limit miesięczny musi być większy niż dzienny'
};

export const getTimeLimit1mValidationSchema = (
  minTimeLimit: number,
  maxTimeLimit: number
) => {
  const timeLimitValidationSchema = yup
    .number()
    .typeError(timeLimitValidationMessages.isBadType)
    .required(timeLimitValidationMessages.isEmpty)
    .test(
      'Min time limit',
      timeLimitValidationMessages.isMin,
      function testMinLimit(): boolean {
        return FieldsHelper.limit1mTimeRange(this.parent, minTimeLimit, 'min');
      }
    )
    .test(
      'Max time limit',
      timeLimitValidationMessages.isMax,
      function testMinLimit(): boolean {
        return FieldsHelper.limit1mTimeRange(this.parent, maxTimeLimit, 'max');
      }
    )
    .test(
      'Less than daily',
      timeLimitValidationMessages.isLessThanMonthly,
      function testLessThanDailyLimit(): boolean {
        return FieldsHelper.isTimeDailyGreaterThanMonthly(this.parent);
      }
    );
  return timeLimitValidationSchema;
};
