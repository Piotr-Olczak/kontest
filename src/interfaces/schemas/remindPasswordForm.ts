import * as yup from 'yup';
import { remindPasswordFormValuesShape } from 'interfaces/forms/remindPasswordForm';

export interface RemindPasswordFormSchemaShape
  extends yup.Schema<remindPasswordFormValuesShape> {}
