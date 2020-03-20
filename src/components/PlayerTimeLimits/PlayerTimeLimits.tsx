import React, { useContext, useState } from 'react';
import { Form, Formik, FormikProps, FormikActions } from 'formik';
import { notification } from 'antd';
import { AppContext } from 'components/AppState/AppState';
import Button from 'components/Button/Button';
import FormGroup from 'components/FormGroup/FormGroup';
import FormElement from 'components/FormElements/FormElement';
import { AppContextShape } from 'interfaces/interfaces';
import { getPlayerTimeLimitValidationSchema } from 'schemas/validation/forms/changePlayerLimits';
import PlayerLimitField from 'components/FormElements/PlayerLimitField';
import {
  PlayerLimitsAllShape,
  PlayerTimeLimitsShape,
  PlayerTimeLimitsFormShape
} from 'interfaces/player/player';
import { userLimitsSettingsHelper } from 'helpers/userLimitsSettings.helper';
import { DateHelper } from 'helpers/date.helper';

export const PlayerTimeLimits: React.FC = () => {
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
    timeLimits: PlayerTimeLimitsShape,
    formikActions: FormikActions<PlayerTimeLimitsFormShape>
  ) => {
    setIsLoading(true);
    const balanceLimits = userLimitsSettingsHelper.getInitialBalanceLimitsFromState(
      state
    );

    userLimitsSettingsHelper
      .changePlayerLimits(timeLimits, balanceLimits)
      .then(response => {
        setIsLoading(false);
        notification.success({ message: 'Zmieniono limity czasowe' });
        const payload = {
          newLimits: response.limitsSet,
          newLimitsChangePendingRequests: response.limitsChangePendingRequests
        };
        const limitsSetForm = userLimitsSettingsHelper.mapTimeLimitsToForm(
          response.limitsSet
        );
        formikActions.setFieldValue(
          'timeLimit1dHours',
          limitsSetForm.timeLimit1dHours
        );
        formikActions.setFieldValue(
          'timeLimit1dMinutes',
          limitsSetForm.timeLimit1dMinutes
        );
        formikActions.setFieldValue(
          'timeLimit1mHours',
          limitsSetForm.timeLimit1mHours
        );
        formikActions.setFieldValue(
          'timeLimit1mMinutes',
          limitsSetForm.timeLimit1mMinutes
        );
        dispatch({
          type: 'changeUserLimits',
          payload: payload
        });
      })
      .catch(() => {
        notification.error({ message: 'Błąd zmiany limitów czasowych' });
        setIsLoading(false);
      });
  };

  const initialTimeLimits = userLimitsSettingsHelper.getInitialTimeLimitsFromState(
    state
  );

  return (
    <FormGroup
      extraClasses="player-limits"
      title="Ustaw limity czasu"
      header="Możesz ustawić maksymalny czas bycia zalogowanym w ciągu dnia i w ciągu
    miesiąca. Jeżeli przekroczysz miesięczny limit, nie będziesz miał
    możliwości, aby się zalogować, aż do kolejnego miesiąca."
    >
      <PlayerTimeLimitsForm
        isLoading={isLoading}
        onSubmit={handleSubmit}
        initialData={initialTimeLimits}
        playerLimits={playerLimits}
      />
    </FormGroup>
  );
};

const PlayerTimeLimitsForm: React.FC<{
  onSubmit: {
    (
      limits: PlayerTimeLimitsShape,
      actions: FormikActions<PlayerTimeLimitsFormShape>
    ): void;
  };
  initialData: PlayerTimeLimitsShape;
  isLoading?: boolean;
  playerLimits: PlayerLimitsAllShape;
}> = props => {
  const { onSubmit, initialData, isLoading, playerLimits } = props;

  const handleSubmit = (
    values: PlayerTimeLimitsFormShape,
    actions: FormikActions<PlayerTimeLimitsFormShape>
  ) => {
    onSubmit(userLimitsSettingsHelper.mapFormTimeLimitsToApi(values), actions);
  };

  const splitedInitialData = userLimitsSettingsHelper.mapTimeLimitsToForm(
    initialData
  );

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={splitedInitialData}
      onSubmit={handleSubmit}
      validationSchema={getPlayerTimeLimitValidationSchema(playerLimits)}
    >
      {(formikProps: FormikProps<PlayerTimeLimitsFormShape>) => {
        const { errors } = formikProps;

        let time1dError: string | undefined = '';
        if (errors.timeLimit1dHours || errors.timeLimit1dMinutes) {
          time1dError = errors.timeLimit1dHours || errors.timeLimit1dMinutes;
        }
        let time1mError: string | undefined = '';
        if (errors.timeLimit1mHours || errors.timeLimit1mMinutes) {
          time1mError = errors.timeLimit1mHours || errors.timeLimit1mMinutes;
        }

        const newTimeLimit1dDate = userLimitsSettingsHelper.getLimitChangePendingRequest(
          'newTimeLimit1dDate',
          playerLimits
        );
        const newTimeLimit1dValue = userLimitsSettingsHelper.getLimitChangePendingRequest(
          'newTimeLimit1dValue',
          playerLimits
        );

        const newTimeLimit1mDate = userLimitsSettingsHelper.getLimitChangePendingRequest(
          'newTimeLimit1mDate',
          playerLimits
        );
        const newTimeLimit1mValue = userLimitsSettingsHelper.getLimitChangePendingRequest(
          'newTimeLimit1mValue',
          playerLimits
        );

        const newBalanceLimit1dDateFormatted = newTimeLimit1dDate
          ? DateHelper.formatDateFull(new Date(newTimeLimit1dDate))
          : undefined;

        const newBalanceLimit1mDateFormatted = newTimeLimit1mDate
          ? DateHelper.formatDateFull(new Date(newTimeLimit1mDate))
          : undefined;

        const newTimeLimit1dValueDisabled = newTimeLimit1dValue ? true : false;

        const newTimeLimit1mValueDisabled = newTimeLimit1mValue ? true : false;

        return (
          <Form>
            <div className="player-limit__limit-wrapper player-limit__balance-daily">
              <div className="player-limit__current-limits">
                <p className="form-element__label">
                  <strong>Dzienny</strong> limit czasu
                </p>
                {playerLimits.currentLimits && (
                  <p className="player-limit__limit player-limit__limit--current">
                    Bieżący limit:{' '}
                    {DateHelper.secondsToHoursMinutes(
                      playerLimits.currentLimits.timeLimit1d
                    )}
                  </p>
                )}
                {newTimeLimit1dValue && (
                  <p className="player-limit__limit player-limit__limit--new">
                    Nowy limit:{' '}
                    {DateHelper.secondsToHoursMinutes(newTimeLimit1dValue)}{' '}
                    <span>(od {newBalanceLimit1dDateFormatted})</span>
                  </p>
                )}
              </div>
              <div className="player-limit__fields-wrapper">
                <FormElement extraClasses="player-limit player-limit--time">
                  <p className="form-element__label">
                    Wprowadź nowy limit czasu
                  </p>
                  <div className="player-limit__fields">
                    <PlayerLimitField
                      name="timeLimit1dHours"
                      type="hours"
                      disabled={newTimeLimit1dValueDisabled}
                    />
                    <PlayerLimitField
                      name="timeLimit1dMinutes"
                      type="minutes"
                      disabled={newTimeLimit1dValueDisabled}
                    />
                    {time1dError && (
                      <span className="form-element__error-message">
                        {time1dError}
                      </span>
                    )}
                  </div>
                </FormElement>
              </div>
            </div>
            <div className="player-limit__limit-wrapper player-limit__balance-daily">
              <div className="player-limit__current-limits">
                <p className="form-element__label">
                  <strong>Miesięczny</strong> limit czasu
                </p>
                {playerLimits.currentLimits && (
                  <p className="player-limit__limit player-limit__limit--current">
                    Bieżący limit:{' '}
                    {DateHelper.secondsToHoursMinutes(
                      playerLimits.currentLimits.timeLimit1m
                    )}
                  </p>
                )}
                {newTimeLimit1mValue && (
                  <p className="player-limit__limit player-limit__limit--new">
                    Nowy limit:{' '}
                    {DateHelper.secondsToHoursMinutes(newTimeLimit1mValue)}{' '}
                    <span>(od {newBalanceLimit1mDateFormatted})</span>
                  </p>
                )}
              </div>
              <div className="player-limit__fields-wrapper">
                <FormElement extraClasses="player-limit player-limit--time">
                  <p className="form-element__label">
                    Wprowadź nowy limit czasu
                  </p>
                  <div className="player-limit__fields">
                    <PlayerLimitField
                      name="timeLimit1mHours"
                      type="hours"
                      disabled={newTimeLimit1mValueDisabled}
                    />
                    <PlayerLimitField
                      name="timeLimit1mMinutes"
                      type="minutes"
                      disabled={newTimeLimit1mValueDisabled}
                    />
                    {time1mError && (
                      <span className="form-element__error-message">
                        {time1mError}
                      </span>
                    )}
                  </div>
                </FormElement>
              </div>
            </div>
            <footer className={'actions'}>
              <Button
                type={'submit'}
                label={'Zmień limity czasu'}
                loading={isLoading}
                disabled={
                  newTimeLimit1dValueDisabled && newTimeLimit1mValueDisabled
                }
              />
            </footer>
          </Form>
        );
      }}
    </Formik>
  );
};
