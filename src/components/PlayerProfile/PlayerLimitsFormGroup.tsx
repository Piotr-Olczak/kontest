import React from 'react';
import FormGroup from 'components/FormGroup/FormGroup';
import FormElement from 'components/FormElements/FormElement';
import PlayerLimitField from 'components/FormElements/PlayerLimitField';
import { CONTENT_URLS } from 'helpers/url.helper';
import { formGroupShape } from 'interfaces/forms/formGroupShape';

const footerContent = ``;

export const fallbackPlayerLimitsInitialValues = {
  balanceLimit1d: 50,
  balanceLimit1m: 500,
  timeLimit1dHours: 1,
  timeLimit1dMinutes: 0,
  timeLimit1mHours: 5,
  timeLimit1mMinutes: 0
};

const PlayerLimitsFormGroup: React.FC<formGroupShape> = props => {
  const { errors } = props;

  let time1dError = '';
  if (errors.timeLimit1dHours || errors.timeLimit1dMinutes) {
    time1dError = errors.timeLimit1dHours || errors.timeLimit1dMinutes;
  }
  let time1mError = '';
  if (errors.timeLimit1mHours || errors.timeLimit1mMinutes) {
    time1mError = errors.timeLimit1mHours || errors.timeLimit1mMinutes;
  }
  return (
    <FormGroup title="Limity gry — odpowiedzialna gra" footer={footerContent}>
      <div className="player-limits player-limits--amount">
        <h2 className="player-limits__heading">USTAW LIMIT ZAKŁADÓW</h2>
        <FormElement extraClasses="player-limit">
          <label className="form-element__label" htmlFor="balanceLimit1d">
            <strong>Dzienny</strong> limit zakładów
          </label>
          <PlayerLimitField name="balanceLimit1d" type="amount" />
          {errors.balanceLimit1d && (
            <span className="form-element__error-message">
              {errors.balanceLimit1d}
            </span>
          )}
        </FormElement>
        <FormElement extraClasses="player-limit">
          <label className="form-element__label" htmlFor="balanceLimit1m">
            <strong>Miesięczny</strong> limit zakładów
          </label>
          <PlayerLimitField name="balanceLimit1m" type="amount" />
          {errors.balanceLimit1m && (
            <span className="form-element__error-message">
              {errors.balanceLimit1m}
            </span>
          )}
        </FormElement>
      </div>
      <div className="player-limits">
        <h2 className="player-limits__heading">USTAW LIMIT CZASU</h2>
        <FormElement extraClasses="player-limit player-limit--time">
          <p className="form-element__label">
            <strong>Dzienny</strong> limit czasu
          </p>
          <div className="player-limit__fields">
            <PlayerLimitField name="timeLimit1dHours" type="hours" />
            <PlayerLimitField name="timeLimit1dMinutes" type="minutes" />
            {time1dError && (
              <span className="form-element__error-message">{time1dError}</span>
            )}
          </div>
        </FormElement>
        <FormElement extraClasses="player-limit player-limit--time">
          <p className="form-element__label">
            <strong>Miesięczny</strong> limit czasu
          </p>
          <div className="player-limit__fields">
            <PlayerLimitField name="timeLimit1mHours" type="hours" />
            <PlayerLimitField name="timeLimit1mMinutes" type="minutes" />
            {time1mError && (
              <span className="form-element__error-message">{time1mError}</span>
            )}
          </div>
        </FormElement>
      </div>
      <p>
        Ustawienia limitów, będziesz mógł zmienić w Koncie Gracza zgodnie z{' '}
        <a
          href={CONTENT_URLS.terms}
          className="link-external"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>regulaminem serwisu trafonline.pl</strong>
        </a>
        . Ustaw taki limit, jaki uważasz za stosowny. Tutaj dowiesz się więcej o{' '}
        <a
          href={CONTENT_URLS.playerLimits}
          className="link-external"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>odpowiedzialnej grze</strong>.
        </a>
      </p>
    </FormGroup>
  );
};

export default PlayerLimitsFormGroup;
