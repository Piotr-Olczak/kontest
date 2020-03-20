import { BetConfirm } from 'components/SingleRaceBetSummary/BetConfirm/BetConfirm';
import { SingleBetContext, RaceDayInfoShape } from 'contexts/singleBet.context';
import { singleBetHelper, countAmount } from 'helpers/singleBet.helper';
import { formatPrice, generateArray } from 'helpers/utils';
import { HorseSelectionShape } from 'interfaces/HorseSelection/HorseSelectionShape';
import { GameStateRaceShape } from 'interfaces/racedays/racedays';
import React, { useContext, useEffect, useState } from 'react';
import { SlipCoupon } from 'components/SlipCoupon/SlipCoupon';
import { SlipDescriptionShape } from 'helpers/userBets.helper';
import { AppContextShape } from 'interfaces/interfaces';
import { AppContext } from 'components/AppState/AppState';
import { userHelper } from 'helpers/user.helper';
import { hasOnlyArrayElements } from 'helpers/utils';
import { disabledUnusedHorsesApiCodes } from 'helpers/apiBetTypeCodesHelper';

import { slipHelper } from 'helpers/slip.helper';
import { betHelper } from 'helpers/bet.helper';
import { InfocenterRace } from 'interfaces/infocenter/infocenter';
import PaymentPredictions from 'components/PaymentPredictions/PaymentPredictions';
interface SingleRaceBetSummaryShape {
  race: GameStateRaceShape;
  raceDayInfo: RaceDayInfoShape;
  infocenterFullRaceInfo?: InfocenterRace;
}

export const SingleRaceBetSummary: React.FC<
  SingleRaceBetSummaryShape
> = props => {
  const { race, raceDayInfo, infocenterFullRaceInfo } = props;

  const { state } = useContext<AppContextShape>(AppContext);
  const userFullAccess = userHelper.isUserFullAccess(state);

  const { singleBetState, setSingleBetState } = useContext(SingleBetContext);
  const [betTypeApiCode, setBetTypeApiCode] = useState();
  const {
    horsesSelected,
    activeBetType,
    multiplier,
    reserve,
    unusedHorses
  } = singleBetState;

  const betType = activeBetType.betTypeButtonLabel;

  if (
    activeBetType.betTypeApiCode &&
    activeBetType.betTypeApiCode !== betTypeApiCode
  )
    setBetTypeApiCode(activeBetType.betTypeApiCode);

  // Combinations and unused horses
  const [numOfCombinations, setNumOfCombinations] = useState(0);

  useEffect(() => {
    if (betTypeApiCode) {
      const validCombinations = singleBetHelper.countCombinationsFromSelection(
        horsesSelected,
        race.activeHorseNumbers,
        betTypeApiCode
      );

      setNumOfCombinations(validCombinations.length);

      // apply unused horses only for proper bet types
      if (!disabledUnusedHorsesApiCodes.includes(betTypeApiCode)) {
        const unusedHorses = betHelper.prepareHorsesUnused(
          validCombinations,
          horsesSelected
        );
        setSingleBetState({ ...singleBetState, unusedHorses });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [race.activeHorseNumbers, horsesSelected, betTypeApiCode]);

  // Notation
  const [notation, setNotation] = useState('');
  useEffect(() => {
    setNotation(singleBetHelper.printNotationFromSelection(horsesSelected));
  }, [horsesSelected]);

  const baseStakePrice = Number(activeBetType.baseStake);
  const singleBetPrice = countAmount(
    baseStakePrice,
    numOfCombinations,
    multiplier
  );

  const slipCouponData: SlipDescriptionShape = {
    raceDay: raceDayInfo,
    bets: [
      {
        betTypeShortName: betType,
        combinations: notation,
        substitute: reserve ? reserve.toString() : '',
        quantity: multiplier,
        combinationsNumber: numOfCombinations,
        baseStake: baseStakePrice
      }
    ],
    racesDescription: `${race.raceNumber}`,
    raceNumber: race.raceNumber,
    currencySymbol: 'PLN'
  };

  const clearSelection = () => {
    const emptyHorseSel = generateArray<HorseSelectionShape>(
      horsesSelected.length,
      new HorseSelectionShape()
    );

    setSingleBetState({
      ...singleBetState,
      multiplier: 1,
      reserve: 0,
      horsesSelected: emptyHorseSel
    });
  };

  const isMaxSlipAmountExceeded = slipHelper.isMaxSlipAmountExceeded(
    singleBetPrice,
    state.systemSettings.maxSlipAmount ? state.systemSettings.maxSlipAmount : 0
  );

  const disableBetConfirm =
    !numOfCombinations ||
    !userFullAccess ||
    (Array.isArray(unusedHorses) && !hasOnlyArrayElements(unusedHorses)) ||
    isMaxSlipAmountExceeded;

  const raceInfo =
    infocenterFullRaceInfo &&
    infocenterFullRaceInfo.singleRaceBetTypes &&
    infocenterFullRaceInfo.singleRaceBetTypes.find(
      singleRaceBet =>
        singleRaceBet.betTypeApiCode === activeBetType.betTypeApiCode
    );

  const pool: number = raceInfo ? raceInfo.pool : 0;

  const slip = singleBetHelper.prepareSlip(slipCouponData, singleBetState);

  return (
    <section className={'bet-summary'}>
      {raceInfo && raceInfo.paymentPredictionsList && (
        <PaymentPredictions
          type={'single'}
          initialData={raceInfo.paymentPredictionsList}
          raceDay={raceDayInfo}
          raceNumber={race.raceNumber}
          betTypeApiCode={activeBetType.betTypeApiCode}
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
            {formatPrice(singleBetPrice)}
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
            clearSelection={clearSelection}
          />
        </div>
      </footer>
    </section>
  );
};
