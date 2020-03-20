import React, { useContext, useState } from 'react';
import { Form, Formik, FormikProps, FormikActions } from 'formik';
import { notification } from 'antd';
import { AppContext } from 'components/AppState/AppState';
import Button from 'components/Button/Button';
import FormGroup from 'components/FormGroup/FormGroup';
import FormElement from 'components/FormElements/FormElement';
import { AppContextShape } from 'interfaces/interfaces';
import { getPlayerBalanceLimitValidationSchema } from 'schemas/validation/forms/changePlayerLimits';
import PlayerLimitField from 'components/FormElements/PlayerLimitField';
import {
  PlayerBalanceLimitsShape,
  PlayerLimitsAllShape
} from 'interfaces/player/player';
import { userLimitsSettingsHelper } from 'helpers/userLimitsSettings.helper';
import { DateHelper } from 'helpers/date.helper';
import { formatPrice } from 'helpers/utils';

export const PlayerBalanceLimits: React.FC = () => {
  const { state, dispatch } = useContext<AppContextShape>(AppContext);

  const playerLimits = {
    minPlayerLimits: state.systemSettings.minPlayerLimits,
    maxPlayerLimits: state.systemSettings.maxPlayerLimits,
    currentLimits: state.user.details
      ? state.user.details.limitsSet
      : undefined,
    limitsChangePendingRequests:
      state.user.details && state.user.details.limitsChangePendingRequests
        ? state.user.details.limitsChangePendingRequests
        : undefined
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (
    balanceLimits: PlayerBalanceLimitsShape,
    formikActions: FormikActions<PlayerBalanceLimitsShape>
  ) => {
    setIsLoading(true);
    const timeLimits = userLimitsSettingsHelper.getInitialTimeLimitsFromState(
      state
    );

    userLimitsSettingsHelper
      .changePlayerLimits(timeLimits, balanceLimits)
      .then(response => {
        setIsLoading(false);
        notification.success({ message: 'Zmieniono limity zakładów' });
        const payload = {
          newLimits: response.limitsSet,
          newLimitsChangePendingRequests: response.limitsChangePendingRequests
        };
        formikActions.setFieldValue(
          'balanceLimit1d',
          response.limitsSet.balanceLimit1d
        );
        formikActions.setFieldValue(
          'balanceLimit1m',
          response.limitsSet.balanceLimit1m
        );
        dispatch({
          type: 'changeUserLimits',
          payload: payload
        });
      })
      .catch(() => {
        notification.error({ message: 'Błąd zmiany limitów zakładowych' });
        setIsLoading(false);
      });
  };

  const initialValues = userLimitsSettingsHelper.getInitialBalanceLimitsFromState(
    state
  );

  return (
    <FormGroup extraClasses="player-limits" title="Ustaw limity zakładów">
      <UserBalanceLimitsForm
        isLoading={isLoading}
        onSubmit={handleSubmit}
        initialData={initialValues}
        playerLimits={playerLimits}
      />
    </FormGroup>
  );
};

const UserBalanceLimitsForm: React.FC<{
  onSubmit: {
    (
      limits: PlayerBalanceLimitsShape,
      actions: FormikActions<PlayerBalanceLimitsShape>
    ): void;
  };
  initialData: PlayerBalanceLimitsShape;
  isLoading?: boolean;
  playerLimits: PlayerLimitsAllShape;
}> = props => {
  const { onSubmit, initialData, isLoading, playerLimits } = props;

  const handleSubmit = (
    values: PlayerBalanceLimitsShape,
    actions: FormikActions<PlayerBalanceLimitsShape>
  ) => {
    onSubmit(values, actions);
  };

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={initialData}
      onSubmit={handleSubmit}
      validationSchema={getPlayerBalanceLimitValidationSchema(playerLimits)}
    >
      {(formikProps: FormikProps<PlayerBalanceLimitsShape>) => {
        const { errors } = formikProps;

        const newBalanceLimit1dValue = userLimitsSettingsHelper.getLimitChangePendingRequest(
          'newBalanceLimit1dValue',
          playerLimits
        );
        const newBalanceLimit1dDate = userLimitsSettingsHelper.getLimitChangePendingRequest(
          'newBalanceLimit1dDate',
          playerLimits
        );

        const newBalanceLimit1mValue = userLimitsSettingsHelper.getLimitChangePendingRequest(
          'newBalanceLimit1mValue',
          playerLimits
        );
        const newBalanceLimit1mDate = userLimitsSettingsHelper.getLimitChangePendingRequest(
          'newBalanceLimit1mDate',
          playerLimits
        );

        const newBalanceLimit1dDateFormatted = newBalanceLimit1dDate
          ? DateHelper.formatDateFull(new Date(newBalanceLimit1dDate))
          : undefined;

        const newBalanceLimit1mDateFormatted = newBalanceLimit1mDate
          ? DateHelper.formatDateFull(new Date(newBalanceLimit1mDate))
          : undefined;

        const newBalanceLimit1dValueDisabled = newBalanceLimit1dValue
          ? true
          : false;

        const newBalanceLimit1mValueDisabled = newBalanceLimit1mValue
          ? true
          : false;

        return (
          <Form>
            <div className="player-limit__limit-wrapper player-limit__balance-daily">
              <div className="player-limit__current-limits">
                <p className="form-element__label">
                  <strong>Dzienny</strong> limit zakładów
                </p>
                {playerLimits.currentLimits && (
                  <p className="player-limit__limit player-limit__limit--current">
                    Bieżący limit:{' '}
                    {formatPrice(playerLimits.currentLimits.balanceLimit1d)}
                  </p>
                )}
                {newBalanceLimit1dValue && (
                  <p className="player-limit__limit player-limit__limit--new">
                    Nowy limit: {formatPrice(newBalanceLimit1dValue)}{' '}
                    <span>(od {newBalanceLimit1dDateFormatted})</span>
                  </p>
                )}
              </div>
              <div className="player-limit__fields-wrapper">
                <FormElement extraClasses="player-limit">
                  <label
                    className="form-element__label"
                    htmlFor="balanceLimit1d"
                  >
                    Wprowadź nowy limit zakładów
                  </label>
                  <PlayerLimitField
                    name="balanceLimit1d"
                    type="amount"
                    disabled={newBalanceLimit1dValueDisabled}
                  />
                  {errors.balanceLimit1d && (
                    <span className="form-element__error-message">
                      {errors.balanceLimit1d}
                    </span>
                  )}
                </FormElement>
              </div>
            </div>
            <div className="player-limit__limit-wrapper player-limit__balance-daily">
              <div className="player-limit__current-limits">
                <p className="form-element__label">
                  <strong>Miesięczny</strong> limit zakładów
                </p>
                {playerLimits.currentLimits && (
                  <p className="player-limit__limit player-limit__limit--current">
                    Bieżący limit:{' '}
                    {formatPrice(playerLimits.currentLimits.balanceLimit1m)}
                  </p>
                )}
                {newBalanceLimit1mValue && (
                  <p className="player-limit__limit player-limit__limit--new">
                    Nowy limit: {formatPrice(newBalanceLimit1mValue)}{' '}
                    <span>(od {newBalanceLimit1mDateFormatted})</span>
                  </p>
                )}
              </div>
              <div className="player-limit__fields-wrapper">
                <FormElement extraClasses="player-limit">
                  <label
                    className="form-element__label"
                    htmlFor="balanceLimit1m"
                  >
                    Wprowadź nowy limit zakładów
                  </label>
                  <PlayerLimitField
                    name="balanceLimit1m"
                    type="amount"
                    disabled={newBalanceLimit1mValueDisabled}
                  />
                  {errors.balanceLimit1m && (
                    <span className="form-element__error-message">
                      {errors.balanceLimit1m}
                    </span>
                  )}
                </FormElement>
              </div>
            </div>
            <footer className={'actions'}>
              <Button
                type={'submit'}
                label={'Zmień limity'}
                loading={isLoading}
                disabled={
                  newBalanceLimit1dValueDisabled &&
                  newBalanceLimit1mValueDisabled
                }
              />
            </footer>
          </Form>
        );
      }}
    </Formik>
  );
};
