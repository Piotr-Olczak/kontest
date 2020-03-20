import * as yup from 'yup';

export const emailValidationMessages = {
  isntEmail: 'To pole powinno być adresem email',
  isEmpty: 'To pole jest wymagane'
};

export const emailValidationSchema = yup
  .string()
  .email(emailValidationMessages.isntEmail)
  .required(emailValidationMessages.isEmpty);

export const newEmailValidationSchema = yup
  .string()
  .email(emailValidationMessages.isntEmail)
  .required(emailValidationMessages.isEmpty);

export const getEditEmailValidationSchema = (currentEmail: string) => {
  const editEmailValidationSchema = yup
    .string()
    .email(emailValidationMessages.isntEmail)
    .required(emailValidationMessages.isEmpty);
  return editEmailValidationSchema;
};
