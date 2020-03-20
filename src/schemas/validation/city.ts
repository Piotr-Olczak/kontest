import * as yup from 'yup';
import { FieldsHelper } from 'helpers/fields.helper';

export const cityValidationMessages = {
  isEmpty: 'To pole jest wymagane',
  isNotLetterDigit: 'Pole zawiera niedozwolone znaki',
  isTooShort: 'Nazwa miasta jest zbyt krótka',
  isWrongType: 'Błędna nazwa miasta'
};

export const cityValidationSchema = yup
  .string()
  .required(cityValidationMessages.isEmpty)
  .min(3, cityValidationMessages.isTooShort)
  .matches(
    /^[a-zA-Z-ĄąĆćĘęŁłŃńÓóŚśŹźŻż\s]*$/,
    cityValidationMessages.isNotLetterDigit
  )
  .test('Not numbers or spaces', cityValidationMessages.isWrongType, value =>
    FieldsHelper.ifAtLeastOneLetter(value)
  );
