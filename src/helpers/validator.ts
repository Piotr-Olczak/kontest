import * as yup from 'yup';

/**
 * Async function which validates provided data agains provided Yup schema.
 * @param schema Yup schema
 * @param data Data you want to validate
 * @param validationOption Yup schema validation options (yup.ValidateOptions)
 * @returns Promise<data|ValidationError> - resolves to provided data if validation succeded otherwise throws an error (Yup.ValidationError)
 * @see: https://github.com/jquense/yup#mixedvalidatevalue-any-options-object-promiseany-validationerror
 */
export const validate = (
  schema: yup.Schema<any>,
  data: any,
  validationOption: yup.ValidateOptions = { strict: true }
): Promise<any> => {
  return schema.validate(data, validationOption);
};
