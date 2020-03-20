import * as yup from 'yup';

export const lastNameValidationMessages = {
  isEmpty: 'To pole jest wymagane',
  isNotLetterDigit: 'Pole zawiera niedozwolone znaki'
};

export const lastNameValidationSchema = yup
  .string()
  .required(lastNameValidationMessages.isEmpty)
  .matches(
    /^[a-zA-Z-ĄąĆćĘęŁłŃńÓóŚśŹźŻż]*$/,
    lastNameValidationMessages.isNotLetterDigit
  );
