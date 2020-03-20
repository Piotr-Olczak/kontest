import * as yup from 'yup';

export const onlyLettersValidationMessages = {
  isEmpty: 'To pole jest wymagane',
  isNotLetter: 'Pole zawiera niedozwolone znaki'
};

export const onlyLettersValidationSchema = yup
  .string()
  .required(onlyLettersValidationMessages.isEmpty)
  .matches(
    /^[a-zA-Z-ĄąĆćĘęŁłŃńÓóŚśŹźŻż]*$/,
    onlyLettersValidationMessages.isNotLetter
  );
