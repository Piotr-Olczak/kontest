import * as yup from 'yup';
import { FieldsHelper } from 'helpers/fields.helper';

export const timeLimitValidationMessages = {
  isEmpty: 'To pole jest wymagane',
  isMin: 'Limit musi być dłuższy',
  isMax: 'Limit musi być krótszy',
  isBadType: 'To pole musi być liczbą',
  isMoreThanMonthly: 'Limit dzienny musi być mniejszy niż miesięczny'
};

export const getTimeLimit1dValidationSchema = (
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
        return FieldsHelper.limit1dTimeRange(this.parent, minTimeLimit, 'min');
      }
    )
    .test(
      'Max time limit',
      timeLimitValidationMessages.isMax,
      function testMinLimit(): boolean {
        return FieldsHelper.limit1dTimeRange(this.parent, maxTimeLimit, 'max');
      }
    )
    .test(
      'More than monthly',
      timeLimitValidationMessages.isMoreThanMonthly,
      function testMoreThanMonthly(): boolean {
        return FieldsHelper.isTimeDailyGreaterThanMonthly(this.parent);
      }
    );
  return timeLimitValidationSchema;
};
