import * as yup from 'yup';
import { emailValidationSchema } from 'schemas/validation/email';
import { RemindPasswordFormSchemaShape } from 'interfaces/schemas/remindPasswordForm';

export const remindPasswordFormSchema: RemindPasswordFormSchemaShape = yup
  .object()
  .shape({
    email: emailValidationSchema
  });
