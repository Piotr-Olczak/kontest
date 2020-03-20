import * as yup from 'yup';
import { stringHelper } from 'helpers/string.helper';
const IBAN = require('iban');

const IBAN_BANK_ACCOUNT_NUMBER_LENGTH = 26;

export const bankAccountNumberValidationMessages = {
  isEmpty: 'To pole jest wymagane',
  isTooShort: 'Podany numer konta jest za krótki',
  isTooLong: 'Podany numer konta jest zbyt długi',
  isValidIBAN: 'Niepoprawny numer IBAN'
};

export const bankAccountNumberValidationSchema = yup
  .string()
  .transform(value => {
    const trimmedBankAccountNo = stringHelper.stripWhitespace(value);
    return trimmedBankAccountNo;
  })
  .min(
    IBAN_BANK_ACCOUNT_NUMBER_LENGTH,
    bankAccountNumberValidationMessages.isTooShort
  )
  .max(
    IBAN_BANK_ACCOUNT_NUMBER_LENGTH,
    bankAccountNumberValidationMessages.isTooLong
  )
  .required(bankAccountNumberValidationMessages.isEmpty)
  .test(
    'Is Valid IBAN',
    bankAccountNumberValidationMessages.isValidIBAN,
    value => IBAN.isValid('PL' + value)
  );
