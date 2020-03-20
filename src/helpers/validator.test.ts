import { validate } from 'helpers/validator';
import { loginFormSchema } from 'schemas/validation/forms/loginForm';
import {
  emailValidationMessages,
  emailValidationSchema
} from 'schemas/validation/email';
import {
  passwordValidationSchema,
  passwordValidationMessages
} from 'schemas/validation/password';

describe('Validations checks', () => {
  describe('[login form validation]', () => {
    it('returns passed data if validation success', async () => {
      const dataToBeTested = {
        login: 'test@test.pl',
        password: 'sthsthsth'
      };

      const result = await validate(loginFormSchema, dataToBeTested);

      expect(result).toEqual(dataToBeTested);
    });
  });

  describe('[email validation]', () => {
    const dataToBeTested = {
      shouldPass: 'test@test.pl',
      shouldntPass: 'trololo'
    };

    it('returns passed data if validation success', async () => {
      const result = await validate(
        emailValidationSchema,
        dataToBeTested.shouldPass
      );
      expect(result).toEqual(dataToBeTested.shouldPass);
    });

    // @see: https://jestjs.io/docs/en/asynchronous#resolves-rejects
    it('throws an error when validations fails', async () => {
      const result = validate(
        emailValidationSchema,
        dataToBeTested.shouldntPass
      );
      await expect(result).rejects.toThrow(emailValidationMessages.isntEmail);
    });
  });

  describe('[password validation]', () => {
    const dataToBeTested = {
      shouldPass: 'sth',
      shouldntPass: ''
    };

    it('returns passed data if validation success', async () => {
      const result = await validate(
        passwordValidationSchema,
        dataToBeTested.shouldPass
      );
      expect(result).toEqual(dataToBeTested.shouldPass);
    });

    // @see: https://jestjs.io/docs/en/asynchronous#resolves-rejects
    it('throws an error when validations fails', async () => {
      const result = validate(
        passwordValidationSchema,
        dataToBeTested.shouldntPass
      );
      await expect(result).rejects.toThrow(passwordValidationMessages.isEmpty);
    });
  });
});
