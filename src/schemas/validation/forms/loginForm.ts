import * as yup from 'yup';
import { LoginFormSchemaShape } from 'interfaces/schemas/loginForm';
import { emailValidationSchema } from 'schemas/validation/email';
import { passwordValidationSchema } from 'schemas/validation/password';

export const loginFormSchema: LoginFormSchemaShape = yup.object().shape({
  login: emailValidationSchema,
  password: passwordValidationSchema
});
