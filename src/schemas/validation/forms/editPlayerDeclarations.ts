import * as yup from 'yup';
import { PlayerFundsSource } from 'interfaces/player/player';
import { fundsSourceValidationSchema } from 'schemas/validation/fundsSource';

export interface EditPlayerDeclarationsValidatedValuesShape {
  fundsSource: PlayerFundsSource;
}

export interface EditPlayerDeclarationsValidatedValuesSchemaShape
  extends yup.Schema<EditPlayerDeclarationsValidatedValuesShape> {}

export const editPlayerDeclarationsValidationSchema: EditPlayerDeclarationsValidatedValuesSchemaShape = yup
  .object()
  .shape({
    fundsSource: fundsSourceValidationSchema
  });
