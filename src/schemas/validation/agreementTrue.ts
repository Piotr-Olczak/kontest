import * as yup from 'yup';

export const agreementTrueValidationMessages = {
  isTrue: 'Ta zgoda jest wymagana'
};

export const agreementTrueValidationSchema = yup
  .boolean()
  .oneOf([true], agreementTrueValidationMessages.isTrue);
