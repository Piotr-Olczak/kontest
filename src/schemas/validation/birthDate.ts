import * as yup from 'yup';
import { FieldsHelper } from 'helpers/fields.helper';

export const birthDateValidationMessages = {
  isEmpty: 'Data urodzenia jest wymagana',
  isAdult: 'Użytkownik musi być pełnoletni',
  isNotValidWithPesel: 'Data urodzenia niezgodna z numerem PESEL'
};

export const birthDateValidationSchema = yup
  .string()
  .required(birthDateValidationMessages.isEmpty)
  .matches(/^[0-9]*$/, birthDateValidationMessages.isEmpty)
  .test(
    'Date format',
    birthDateValidationMessages.isAdult,
    function testAdult(): boolean {
      return FieldsHelper.isAdult(this.parent);
    }
  )
  .test(
    'Date format',
    birthDateValidationMessages.isNotValidWithPesel,
    function testValidWithPesel(): boolean {
      return FieldsHelper.birthDatePesel(this.parent);
    }
  );
