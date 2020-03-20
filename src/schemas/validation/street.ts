import * as yup from 'yup';
import { FieldsHelper } from 'helpers/fields.helper';

export const streetValidationMessages = {
  isEmpty: 'To pole jest wymagane',
  isNotLetterDigit: 'Pole zawiera niedozwolone znaki',
  isTooShort: 'Nazwa ulicy jest zbyt krótka',
  isWrongType: 'Błędna nazwa ulicy'
};

export const streetValidationSchema = yup
  .string()
  .required(streetValidationMessages.isEmpty)
  .min(3, streetValidationMessages.isTooShort)
  .matches(
    /^[a-zA-Z-ĄąĆćĘęŁłŃńÓóŚśŹźŻż0-9.\s]*$/,
    streetValidationMessages.isNotLetterDigit
  )
  .test('Not numbers or spaces', streetValidationMessages.isWrongType, value =>
    FieldsHelper.ifAtLeastOneLetter(value)
  );
