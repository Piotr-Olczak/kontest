import * as yup from 'yup';
import { stringHelper } from 'helpers/string.helper';

const PHONE_NUMBER_LENGTH = 9;

export const phoneNumberValidationMessages = {
  isEmpty: 'To pole jest wymagane',
  isTooShort: 'Podany numer telefonu jest za krótki',
  isTooLong: 'Podany numer telefonu jest zbyt długi',
  isNotDigit: 'Pole zawiera niedozwolone znaki'
};

export const phoneNumberValidationSchema = yup
  .string()
  .required(phoneNumberValidationMessages.isEmpty)
  .transform(value => {
    const trimmedPhoneNumber = stringHelper.stripWhitespace(value);
    return trimmedPhoneNumber;
  })
  .min(PHONE_NUMBER_LENGTH, phoneNumberValidationMessages.isTooShort)
  .max(PHONE_NUMBER_LENGTH, phoneNumberValidationMessages.isTooLong)
  .matches(/^[0-9]*$/, phoneNumberValidationMessages.isNotDigit);
