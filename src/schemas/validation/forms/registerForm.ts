import * as yup from 'yup';
import { RegisterFormInitialValuesShape } from 'interfaces/register/register';
import { onlyLettersValidationSchema } from 'schemas/validation/onlyLetters';
import { streetValidationSchema } from 'schemas/validation/street';
import { cityValidationSchema } from 'schemas/validation/city';
import { houseNumberValidationSchema } from 'schemas/validation/houseNumber';
import { lastNameValidationSchema } from 'schemas/validation/lastName';
import { phoneNumberValidationSchema } from 'schemas/validation/phoneNumber';
import { newEmailValidationSchema } from 'schemas/validation/email';
import { flatNumberValidationSchema } from 'schemas/validation/flatNumber';
import { getNewPasswordValidationSchema } from 'schemas/validation/password';
import { stringRequiredValidationSchema } from 'schemas/validation/stringRequired';
import { postalCodeValidationSchema } from 'schemas/validation/postalCode';
import { peselValidationSchema } from 'schemas/validation/pesel';
import { idDocumentNumberValidationSchema } from 'schemas/validation/idDocumentNumber';
import { birthDateValidationSchema } from 'schemas/validation/birthDate';
import { agreementTrueValidationSchema } from 'schemas/validation/agreementTrue';
import { getBalanceLimitValidationSchema } from 'schemas/validation/balanceLimit';
import { getTimeLimit1dValidationSchema } from 'schemas/validation/timeLimit1d';
import { getTimeLimit1mValidationSchema } from 'schemas/validation/timeLimit1m';
import { bankAccountNumberValidationSchema } from 'schemas/validation/bankAccountNumber';
import { PasswordSettingsShape } from 'interfaces/interfaces';

export interface RegisterFormSchemaShape
  extends yup.Schema<RegisterFormInitialValuesShape> {}

export const getRegisterFormSchema = (
  playerLimits: any,
  passwordRequirements: PasswordSettingsShape
) => {
  const registerFormSchema: RegisterFormSchemaShape = yup.object().shape({
    cookiesConsent: agreementTrueValidationSchema,
    firstName: onlyLettersValidationSchema,
    lastName: lastNameValidationSchema,
    email: newEmailValidationSchema,
    password: getNewPasswordValidationSchema(passwordRequirements),
    phoneNumber: phoneNumberValidationSchema,
    pesel: peselValidationSchema,
    idDocumentNumber: idDocumentNumberValidationSchema,
    birthYear: birthDateValidationSchema,
    birthMonth: birthDateValidationSchema,
    birthDay: birthDateValidationSchema,
    street: streetValidationSchema,
    houseNr: houseNumberValidationSchema,
    flatNr: flatNumberValidationSchema,
    city: cityValidationSchema,
    postalCode: postalCodeValidationSchema,
    country: stringRequiredValidationSchema,
    nationality: stringRequiredValidationSchema,
    bankAccountNumber: bankAccountNumberValidationSchema,
    fundsSource: stringRequiredValidationSchema,
    ownerFundsDeclaration: agreementTrueValidationSchema,
    hracingRegulationsConsent: agreementTrueValidationSchema,
    maturityConsent: agreementTrueValidationSchema,
    mailMarketingConsent: yup.boolean(),
    smsMarketingConsent: yup.boolean(),
    phoneMarketingConsent: yup.boolean(),
    balanceLimit1d: getBalanceLimitValidationSchema(
      playerLimits.minPlayerLimits.balanceLimit1d,
      playerLimits.maxPlayerLimits.balanceLimit1d
    ),
    balanceLimit1m: getBalanceLimitValidationSchema(
      playerLimits.minPlayerLimits.balanceLimit1m,
      playerLimits.maxPlayerLimits.balanceLimit1m
    ),
    timeLimit1dHours: getTimeLimit1dValidationSchema(
      playerLimits.minPlayerLimits.timeLimit1d,
      playerLimits.maxPlayerLimits.timeLimit1d
    ),
    timeLimit1dMinutes: getTimeLimit1dValidationSchema(
      playerLimits.minPlayerLimits.timeLimit1d,
      playerLimits.maxPlayerLimits.timeLimit1d
    ),
    timeLimit1mHours: getTimeLimit1mValidationSchema(
      playerLimits.minPlayerLimits.timeLimit1m,
      playerLimits.maxPlayerLimits.timeLimit1m
    ),
    timeLimit1mMinutes: getTimeLimit1mValidationSchema(
      playerLimits.minPlayerLimits.timeLimit1m,
      playerLimits.maxPlayerLimits.timeLimit1m
    ),
    privateBankingDeclaration: yup.boolean(),
    politicalVipDeclaration: yup.boolean(),
    rodoConsent: agreementTrueValidationSchema
  });
  return registerFormSchema;
};
