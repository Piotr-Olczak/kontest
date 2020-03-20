import * as yup from 'yup';
import { FieldsHelper } from 'helpers/fields.helper';

export const peselValidationMessages = {
  isntPesel: 'Nieprawidłowy numer PESEL',
  isEmpty: 'To pole jest wymagane'
};

export const peselValidationSchema = yup
  .string()
  .required(peselValidationMessages.isEmpty)
  .length(11, peselValidationMessages.isntPesel)
  .matches(/^[0-9]*$/, peselValidationMessages.isntPesel)
  .test('Pesel format', peselValidationMessages.isntPesel, value =>
    FieldsHelper.isValidPesel(value)
  );

export const getEditPeselValidationSchema = (currentPesel: string) => {
  const editPeselValidationSchema = yup
    .string()
    .required(peselValidationMessages.isEmpty)
    .length(11, peselValidationMessages.isntPesel)
    .matches(/^[0-9]*$/, peselValidationMessages.isntPesel)
    .test('Pesel format', peselValidationMessages.isntPesel, value =>
      FieldsHelper.isValidPesel(value)
    );
  return editPeselValidationSchema;
};
