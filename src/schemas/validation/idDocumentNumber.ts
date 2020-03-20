import * as yup from 'yup';
import { FieldsHelper } from 'helpers/fields.helper';

export const idDocumentNumberValidationMessages = {
  isEmpty: 'To pole jest wymagane',
  isNotLetterDigit: 'Pole zawiera niedozwolone znaki',
  isntIdDocumentNumber: 'Niepoprawny format'
};

export const idDocumentNumberValidationSchema = yup
  .string()
  .required(idDocumentNumberValidationMessages.isEmpty)
  .matches(
    /^[a-zA-Z0-9]*$/,
    idDocumentNumberValidationMessages.isNotLetterDigit
  )
  .test(
    'Pesel format',
    idDocumentNumberValidationMessages.isntIdDocumentNumber,
    value => FieldsHelper.isIdDocumentNumberValid(value)
  );
