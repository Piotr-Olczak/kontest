import * as yup from 'yup';

export const stringRequiredValidationMessages = {
  isEmpty: 'To pole jest wymagane'
};

export const stringRequiredValidationSchema = yup
  .string()
  .required(stringRequiredValidationMessages.isEmpty);
