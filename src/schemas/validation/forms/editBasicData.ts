import * as yup from 'yup';
import { EditBasicDataInitialValuesShape } from 'interfaces/EditPlayerData/editPlayerData';
import { bankAccountNumberValidationSchema } from 'schemas/validation/bankAccountNumber';
import { cityValidationSchema } from 'schemas/validation/city';
import { houseNumberValidationSchema } from 'schemas/validation/houseNumber';
import { phoneNumberValidationSchema } from 'schemas/validation/phoneNumber';
import { postalCodeValidationSchema } from 'schemas/validation/postalCode';
import { streetValidationSchema } from 'schemas/validation/street';

export interface EditBasicDataFormSchemaShape
  extends yup.Schema<EditBasicDataInitialValuesShape> {}

export const editBasicDataFormSchema: EditBasicDataFormSchemaShape = yup
  .object()
  .shape({
    bankAccountNumber: bankAccountNumberValidationSchema,
    city: cityValidationSchema,
    houseNr: houseNumberValidationSchema,
    phoneNumber: phoneNumberValidationSchema,
    postalCode: postalCodeValidationSchema,
    street: streetValidationSchema
  });
