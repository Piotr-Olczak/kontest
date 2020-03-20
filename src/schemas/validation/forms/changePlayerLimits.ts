import * as yup from 'yup';
import { getBalanceLimitValidationSchema } from 'schemas/validation/balanceLimit';
import { getTimeLimit1dValidationSchema } from 'schemas/validation/timeLimit1d';
import { getTimeLimit1mValidationSchema } from 'schemas/validation/timeLimit1m';
import {
  PlayerBalanceLimitsShape,
  PlayerTimeLimitsFormShape
} from 'interfaces/player/player';

export interface ChangePlayerBalanceLimitsValidationSchemaShape
  extends yup.Schema<PlayerBalanceLimitsShape> {}

export const getPlayerBalanceLimitValidationSchema = (playerLimits: any) => {
  const changePlayerBalanceLimitsValidationSchema: ChangePlayerBalanceLimitsValidationSchemaShape = yup
    .object()
    .shape({
      balanceLimit1d: getBalanceLimitValidationSchema(
        playerLimits.minPlayerLimits.balanceLimit1d,
        playerLimits.maxPlayerLimits.balanceLimit1d
      ),
      balanceLimit1m: getBalanceLimitValidationSchema(
        playerLimits.minPlayerLimits.balanceLimit1m,
        playerLimits.maxPlayerLimits.balanceLimit1m
      )
    });
  return changePlayerBalanceLimitsValidationSchema;
};

export interface ChangePlayerTimeLimitsValidationSchemaShape
  extends yup.Schema<PlayerTimeLimitsFormShape> {}

export const getPlayerTimeLimitValidationSchema = (playerLimits: any) => {
  const changePlayerTimeLimitsValidationSchema: ChangePlayerTimeLimitsValidationSchemaShape = yup
    .object()
    .shape({
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
      )
    });
  return changePlayerTimeLimitsValidationSchema;
};
