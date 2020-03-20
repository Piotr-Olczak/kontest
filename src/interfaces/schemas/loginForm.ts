import * as yup from 'yup';
import { loginFormValuesShape } from 'interfaces/forms/loginForm';

export interface LoginFormSchemaShape
  extends yup.Schema<loginFormValuesShape> {}
