import * as yup from 'yup';

export const fundsSourceValidationMessages = {
  isLabel: 'Wybierz jedną z opcji'
};

const availableFundsSources = [
  'COMPANY',
  'CONTRACT',
  'EMPLOYMENT',
  'FALL_OR_DONATION',
  'FREELANCE',
  'RENT',
  'WIN_OR_PRIZE'
];

export const fundsSourceValidationSchema = yup
  .string()
  .oneOf(availableFundsSources, fundsSourceValidationMessages.isLabel);
