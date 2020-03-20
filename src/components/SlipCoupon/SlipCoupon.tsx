import { Icon } from 'components/Icon/Icon';
import { DateHelper } from 'helpers/date.helper';
import {
  SlipDescriptionShape,
  SlipDescriptionBetShape
} from 'helpers/userBets.helper';
import { formatBetNumber, formatPrice, formatStake } from 'helpers/utils';
import React, { useState } from 'react';
import { SlipStatus, SlipRaceBetShape } from 'interfaces/slip/slip';
import { RaceDayInfoShape } from 'contexts/singleBet.context';
import { slipHelper } from 'helpers/slip.helper';
import classNames from 'classnames';
import { convertToCentums } from 'helpers/currency.helper';
import { Spinner } from 'components/Spinner/Spinner';

export const SlipCoupon: React.FC<{
  coupon: SlipDescriptionShape;
  onCancellation?: Function;
}> = props => {
  const [isLoading, setIsLoading] = useState(false);

  const { coupon, onCancellation } = props;
  const {
    cancellationTimestamp,
    creationTimestamp,
    bets,
    winAmount,
    currencySymbol,
    tax,
    taxRate,
    racesDescription,
    returnAmount,
    raceDay,
    raceNumber,
    slipAmount
  } = coupon;

  const couponNumber = coupon.ekonikSlipNumber;
  const status = coupon.slipStatus;

  var cancellationTimeLimit = 5 * 60 * 1000; // 5 minutes in miliseconds

  const couponDate = creationTimestamp
    ? new Date(creationTimestamp)
    : undefined;
  const printDate = couponDate
    ? DateHelper.formatDateFull(couponDate)
    : undefined;

  const races = racesDescription
    ? slipHelper.mapRacesDescription(racesDescription, raceDay)
    : [];

  const totalAmount =
    (convertToCentums(winAmount ? winAmount : 0) -
      convertToCentums(tax ? tax : 0) +
      convertToCentums(returnAmount ? returnAmount : 0)) /
    100;

  const isCancellable = couponDate
    ? new Date().getTime() - couponDate.getTime() < cancellationTimeLimit
    : false;

  const handleCancellation = (couponNumber: string | undefined) => {
    setIsLoading(true);
    if (onCancellation) {
      onCancellation(couponNumber, () => setIsLoading(false));
    }
  };

  const classes = classNames({
    'slip-coupon': true,
    'slip-coupon--progress': isLoading
  });

  return (
    <article className={classes}>
      {isCancellable && onCancellation && !cancellationTimestamp && (
        <div
          className="slip-coupon__cancel"
          onClick={handleCancellation.bind(null, couponNumber)}
        >
          <Icon type="forbidden-mark--purple" />
        </div>
      )}

      {isLoading && (
        <div className="slip-coupon-loader">
          <Spinner />
        </div>
      )}

      <div className="slip-coupon-header">
        {couponNumber && (
          <p className="slip-coupon-number">{formatBetNumber(couponNumber)}</p>
        )}

        <Icon type={'horse'} />
      </div>

      {printDate && <p className="slip-coupon-date">{printDate}</p>}

      {status && <CouponStatus status={status} />}

      {races.length > 0 && (
        <CouponRacesList
          races={races}
          raceDay={raceDay}
          raceNumber={raceNumber}
          id={couponNumber ? couponNumber : raceDay.raceDate}
        />
      )}

      {bets.length > 0 && (
        <CouponBetsList
          bets={bets}
          id={couponNumber ? couponNumber : raceDay.raceDate}
        />
      )}

      {slipAmount && (
        <div className="slip-coupon__amounts">
          <SlipAmount amount={slipAmount} currency={currencySymbol} />

          {status === 'PAYED' && (
            <>
              <WinAmount
                amount={winAmount ? winAmount : 0}
                currencySymbol={currencySymbol}
              />

              <div className="slip-coupon__amount slip-coupon__amount--light slip-coupon-tax">
                {tax
                  ? `potrącono ${taxRate}% podatku w wysokości: ${formatPrice(
                      tax,
                      currencySymbol,
                      'code'
                    )}`
                  : ''}
              </div>

              <div className="slip-coupon__amount slip-coupon__amount--light">
                {returnAmount ? (
                  <>
                    Zwrot:{' '}
                    <span className="slip-coupon-return-amount__value">
                      {formatPrice(returnAmount, currencySymbol, 'code')}
                    </span>
                  </>
                ) : (
                  'Brak zwrotu'
                )}
              </div>

              {totalAmount > 0 && (
                <div className="slip-coupon__amount slip-coupon__amount--extra">
                  WYPŁATA: {formatPrice(totalAmount, currencySymbol, 'code')}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </article>
  );
};

const CouponStatus: React.FC<{
  status: SlipStatus;
}> = ({ status }) => {
  // 'CANCELLED' | 'CREATED' | 'PAYED'
  const statusLabels = {
    CANCELLED: 'Unieważniony',
    CREATED: 'Przyjęty',
    PAYED: 'Rozliczony'
  };

  return (
    <div className={`coupon-status coupon-status--${status}`}>
      {status === 'CREATED' && <Icon type="thumbup" />}
      {/* {status === 'CANCELLED' && <Icon type="forbidden-mark" />} */}
      {status === 'PAYED' && <Icon type="tick" />} {statusLabels[status]}
    </div>
  );
};

const CouponRacesList: React.FC<{
  id: string | number;
  races: Array<SlipRaceBetShape>;
  raceDay: RaceDayInfoShape;
  raceNumber?: number;
}> = props => {
  return (
    <ul className="races-list">
      {props.races.map((race, index) => {
        return <CouponRace key={`${props.id}-${index}`} {...race} />;
      })}
    </ul>
  );
};

const CouponRace: React.FC<{
  trackCode: string;
  raceDate: string;
  raceNumber: string;
}> = props => {
  return (
    <li className="races-list__item">
      <span>
        {props.trackCode} {props.raceDate}
      </span>
      <span>| </span>
      <span>Gonitwa {props.raceNumber}</span>
    </li>
  );
};

const SlipAmount: React.FC<{
  amount: number;
  currency: string;
}> = props => {
  const { amount, currency } = props;
  return (
    <div className="slip-coupon__amount">
      WARTOŚĆ KUPONU: {formatPrice(amount, currency, 'code')}
    </div>
  );
};

const WinAmount: React.FC<{
  amount: number;
  currencySymbol: string;
}> = props => {
  const classes = classNames({
    'slip-coupon__amount': true,
    'slip-coupon__amount--extra': !!props.amount
  });

  return (
    <div className={classes}>
      {props.amount
        ? `WYGRANA: ${formatPrice(
            props.amount,
            props.currencySymbol,
            'symbol'
          )}`
        : `Brak wygranej`}
    </div>
  );
};

const CouponBetsList: React.FC<{
  bets: Array<SlipDescriptionBetShape>;
  id: string | number;
}> = props => {
  return (
    <div className="slip-coupon-bets-list">
      <p className="slip-coupon-bet__title">
        {props.bets.length > 1 ? 'ZAKŁADY' : 'ZAKŁAD'}
      </p>
      {props.bets.map((bet, index) => (
        <CouponBet key={`${props.id}-${index}`} {...bet} />
      ))}
    </div>
  );
};

const CouponBet: React.FC<SlipDescriptionBetShape> = props => {
  const {
    betTypeShortName,
    combinations,
    substitute,
    quantity,
    combinationsNumber,
    baseStake
  } = props;

  return (
    <div className="slip-coupon-bet">
      <div className="slip-coupon-bet__details">
        <div className="slip-coupon-bet__detail slip-coupon-bet__stake">
          {quantity}x{formatStake(baseStake)}
        </div>
        <div className="slip-coupon-bet__detail slip-coupon-bet__combinations">
          {betTypeShortName} {combinations}
        </div>
        <div className="slip-coupon-bet__detail slip-coupon-bet__combinations-number">
          x{combinationsNumber}
        </div>
        <div className="slip-coupon-bet__detail slip-coupon-bet__substitute">
          R: {substitute ? substitute : 'X'}
        </div>
      </div>
    </div>
  );
};

// const CancelBetBtn: React.FC<{ onConfirm: Function }> = props => {
//   const { onConfirm } = props;

//   const handleCancel = () => {
//     Modal.confirm({
//       title: 'Czy chcesz anulować zakład?',
//       content:
//         'Czy na pewno chcesz usunąć zakład? Tej operacji nie można cofnąć',
//       okText: 'Tak',
//       okType: 'danger',
//       cancelText: 'Anuluj',
//       onOk() {
//         onConfirm();
//       }
//     });
//   };

//   return (
//     <button className={'cancel-bet-btn'} onClick={handleCancel}>
//       X
//     </button>
//   );
// };
