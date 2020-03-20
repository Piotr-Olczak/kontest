import * as yup from 'yup';
import { PasswordSettingsShape } from 'interfaces/interfaces';

export const passwordValidationMessages = {
  isEmpty: 'To pole jest wymagane',
  isTooShort: 'Podane hasło jest za krótkie',
  isTooWeak:
    'Hasło musi zawierać 1 małą literę, 1 wielką literę oraz 1 znak specjalny',
  repetitionDiffers: 'Hasła muszą się zgadzać'
};

export const passwordValidationSchema = yup
  .string()
  .required(passwordValidationMessages.isEmpty);

export const getNewPasswordValidationSchema = (
  passwordRequirements: PasswordSettingsShape
) => {
  const { passwordMinLength } = passwordRequirements;

  const newPasswordValidationSchema = yup
    .string()
    .min(
      passwordMinLength ? passwordMinLength : 0,
      passwordValidationMessages.isTooShort
    )
    .matches(
      /^(?:(?=.*[a-z])(?=.*[A-Z]).*)$/,
      passwordValidationMessages.isTooWeak
    )
    .required(passwordValidationMessages.isEmpty);
  return newPasswordValidationSchema;
};

/**
 *
 * @param ref string - reference to another property of schema to which value should be equal to
 */
export const getNewPasswordRepetitionSchema = (ref: string) => {
  return yup
    .string()
    .required(passwordValidationMessages.isEmpty)
    .oneOf([yup.ref(ref), null], passwordValidationMessages.repetitionDiffers);
};
