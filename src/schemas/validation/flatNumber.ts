import * as yup from 'yup';

export const flatNumberValidationMessages = {
  isNotLetterDigit: 'Zły format'
};

export const flatNumberValidationSchema = yup
  .string()
  .matches(
    /^[0-9]+[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż0-9]*$/,
    flatNumberValidationMessages.isNotLetterDigit
  );
