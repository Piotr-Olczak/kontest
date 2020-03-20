import * as yup from 'yup';

export const houseNumberValidationMessages = {
  isEmpty: 'To pole jest wymagane',
  isNotLetterDigit: 'Pole zawiera niedozwolone znaki'
};

export const houseNumberValidationSchema = yup
  .string()
  .required(houseNumberValidationMessages.isEmpty)
  .matches(
    /^[0-9]+[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż0-9]*$/,
    houseNumberValidationMessages.isNotLetterDigit
  );
