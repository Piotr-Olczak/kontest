import React, { useState, useEffect, useContext } from 'react';
import { SlipCoupon } from 'components/SlipCoupon/SlipCoupon';
import { BetConfirm } from 'components/SingleRaceBetSummary/BetConfirm/BetConfirm';
import { formatPrice, hasOnlyArrayElements } from 'helpers/utils';
import { SlipDescriptionShape } from 'helpers/userBets.helper';
import {
  GameStateRaceDayShape,
  GameStateMultiRaceBetTypeShape
} from 'interfaces/racedays/racedays';
import { multiBetHelper } from 'helpers/multiBet.helper';
import { betHelper } from 'helpers/bet.helper';
import { AppContextShape } from 'interfaces/interfaces';
import { AppContext } from 'components/AppState/AppState';
import { BetRaceDataShape } from 'interfaces/MultiRaceBet/MultiRaceBet';
import { countAmount } from 'helpers/singleBet.helper';
import { slipHelper } from 'helpers/slip.helper';
import { userHelper } from 'helpers/user.helper';
import { InfocenterMultiRaceBetType } from 'interfaces/infocenter/infocenter';
import PaymentPredictions from 'components/PaymentPredictions/PaymentPredictions';

interface MultiRaceBetSummaryPropsShape {
  raceDay: GameStateRaceDayShape;
  multiBetType: GameStateMultiRaceBetTypeShape;
  betRacesData: BetRaceDataShape[];
  multiplier: number;
  raceDayInfo?: InfocenterMultiRaceBetType;
}

export const MultiRaceBetSummary: React.FC<
  MultiRaceBetSummaryPropsShape
> = props => {
  const {
    raceDay,
    multiBetType,
    betRacesData,
    multiplier,
    raceDayInfo
  } = props;

  const { state } = useContext<AppContextShape>(AppContext);

  const userFullAccess = userHelper.isUserFullAccess(state);

  const [betTypeLabel, setBetTypeLabel] = useState();

  useEffect(() => {
    const betTypeDictionary = betHelper.buildBetTypesDictionary(state);
    setBetTypeLabel(betTypeDictionary[multiBetType.betTypeApiCode]);
    /* eslint react-hooks/exhaustive-deps: 0 */
  }, []);

  if (!betTypeLabel) return null;

  const combinationsNotation = multiBetHelper.getMultiBetCombinationsNotation(
    betRacesData
  );
  const reserve = multiBetHelper.getMultiBetReserve(betRacesData);
  const numOfCombinations = multiBetHelper.countTotalNumberOfCombinations(
    betRacesData
  );
  const baseStakePrice = multiBetType.baseStake;

  const raceDescription = multiBetHelper.getMultiBetRaceDescription(
    multiBetType.betRaces,
    multiBetType.isMultiRaceMultiDayBetType
  );

  const slipCouponData: SlipDescriptionShape = {
    raceDay: raceDay.raceDay,
    bets: [
      {
        betTypeShortName: betTypeLabel,
        combinations: combinationsNotation,
        substitute: reserve ? reserve.toString() : '',
        quantity: multiplier,
        combinationsNumber: numOfCombinations,
        baseStake: baseStakePrice
      }
    ],
    racesDescription: raceDescription,
    raceNumber: raceDay.raceDayNumber,
    currencySymbol: 'PLN'
  };

  const multiBetPrice = countAmount(
    baseStakePrice,
    numOfCombinations,
    multiplier
  );

  const isMaxSlipAmountExceeded = slipHelper.isMaxSlipAmountExceeded(
    multiBetPrice,
    state.systemSettings.maxSlipAmount ? state.systemSettings.maxSlipAmount : 0
  );

  const allCombinationsValid = betRacesData.every(
    raceBet =>
      raceBet.combinations.length > 0 &&
      (Array.isArray(raceBet.unusedHorses) &&
        hasOnlyArrayElements(raceBet.unusedHorses))
  );

  const disableBetConfirm =
    !allCombinationsValid || isMaxSlipAmountExceeded || !userFullAccess;

  const slip = multiBetHelper.prepareSlip(
    betRacesData,
    multiBetPrice,
    numOfCombinations,
    multiplier,
    multiBetType
  );

  const pool: number = raceDayInfo ? raceDayInfo.pool : 0;

  return (
    <section className={'bet-summary'}>
      {raceDayInfo && raceDayInfo.paymentPredictionsList && (
        <PaymentPredictions
          type={'multi'}
          initialData={raceDayInfo.paymentPredictionsList}
          raceDay={raceDay.raceDay}
          uniqueId={multiBetType.uniqueId}
        />
      )}

      <SlipCoupon coupon={slipCouponData} />

      <footer className={'bet-summary-footer'}>
        <div className={'bet-summary-footer__block'}>
          {!!pool && (
            <>
              <p>Pula na zakład</p>
              <p className={'bet-summary-footer__price'}>{formatPrice(pool)}</p>
            </>
          )}

          <p>Wartość zakładu</p>
          <p className={'bet-summary-footer__price'}>
            {formatPrice(multiBetPrice)}
          </p>
          {isMaxSlipAmountExceeded && (
            <p className={'bet-summary-footer__limit'}>
              Przekroczono maksymalną wartość kuponu
            </p>
          )}
        </div>
        <div className={'bet-summary-footer__block'}>
          <BetConfirm
            slip={slip}
            isDisabled={disableBetConfirm}
            slipCoupon={slipCouponData}
          />
        </div>
      </footer>
    </section>
  );
};
