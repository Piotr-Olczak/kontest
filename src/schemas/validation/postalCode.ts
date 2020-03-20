import * as yup from 'yup';

export const postalCodeValidationMessages = {
  isEmpty: 'To pole jest wymagane',
  isBadFormat: 'Pole powinno być w formacie XX-XXX'
};

export const postalCodeValidationSchema = yup
  .string()
  .required(postalCodeValidationMessages.isEmpty)
  .matches(/^[[0-9]{2}-[0-9]{3}]*$/, postalCodeValidationMessages.isBadFormat);
