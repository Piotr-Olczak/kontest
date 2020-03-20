import { Modal } from 'antd';
import { Icon } from 'components/Icon/Icon';
import { Spinner } from 'components/Spinner/Spinner';
import { DateHelper } from 'helpers/date.helper';
import { userBetsHelper } from 'helpers/userBets.helper';
import { formatPrice } from 'helpers/utils';
import { SingleBetCouponShape } from 'interfaces/SingleBetCoupon/SingleBetCoupon';
import React, { useState } from 'react';

export const SingleBetCoupon: React.FC<{
  coupon: SingleBetCouponShape;
  onCancellation?: Function;
}> = props => {
  const { coupon, onCancellation } = props;
  const {
    combinations,
    notation,
    raceNumber,
    betTypeLabel,
    raceDayLabel,
    baseStakePrice,
    couponDate,
    couponNumber,
    reserve,
    multiplier,
    isCancellationEnabled
  } = coupon;

  const [isLoading, setIsLoading] = useState(false);
  const handleCouponCancellation = () => {
    if (!couponNumber) return;
    setIsLoading(true);
    userBetsHelper.cancelUserBet(couponNumber).then(() => {
      setIsLoading(false);

      if (onCancellation) {
        onCancellation(couponNumber);
      }
    });
  };

  const isAlreadyBought = couponNumber && couponDate;

  return (
    <article className={'single-coupon'}>
      {!isAlreadyBought && (
        <p className={'single-coupon__title'}>Twój zakład</p>
      )}

      {isLoading && (
        <div className={'single-coupon__loader'}>
          <Spinner />
        </div>
      )}

      {isAlreadyBought && (
        <header className={'single-coupon__top-bar'}>
          {isCancellationEnabled && (
            <CancelBetBtn onConfirm={handleCouponCancellation} />
          )}
          <Icon type={'horse'} />
        </header>
      )}

      {couponNumber && couponDate && (
        <CouponHeader couponDate={couponDate} couponNumber={couponNumber} />
      )}

      <p className={'single-coupon__races'}>
        {raceDayLabel} / Gonitwa {raceNumber}
      </p>

      <CouponFooter
        betTypeLabel={betTypeLabel}
        reserve={reserve}
        notation={notation}
        numOfCombinations={combinations}
        baseStakePrice={baseStakePrice}
        multiplier={multiplier}
      />
    </article>
  );
};

const CouponHeader: React.FC<{
  couponNumber: number;
  couponDate: Date;
}> = props => {
  const { couponNumber, couponDate } = props;

  const printDate = DateHelper.formatDateFull(couponDate);
  return (
    <header className={'single-coupon-header'}>
      <p className={'single-coupon-header__number'}>Nr. {couponNumber}</p>
      <p className={'single-coupon-header__date'}>
        Data transakcji: {printDate}
      </p>
    </header>
  );
};

interface CouponFooterShape {
  numOfCombinations: number;
  baseStakePrice: number;
  betTypeLabel: string;
  notation: string;
  multiplier: number;
  reserve?: number;
}

const CouponFooter: React.FC<CouponFooterShape> = props => {
  const {
    reserve,
    baseStakePrice,
    betTypeLabel,
    notation,
    numOfCombinations,
    multiplier
  } = props;

  const printReserve = reserve ? reserve : 'X';
  return (
    <footer className={'single-coupon-footer'}>
      <p className={'underline-text'}>Zakład:</p>
      <div className={'single-coupon-footer__combinations'}>
        <p>
          {numOfCombinations}x{formatPrice(baseStakePrice)}
          <br /> x{multiplier}
        </p>

        <div className={'single-coupon-footer__configurations'}>
          <p>
            {betTypeLabel} {notation}
          </p>
          <p>R: {printReserve}</p>
        </div>
      </div>
    </footer>
  );
};

const CancelBetBtn: React.FC<{ onConfirm: Function }> = props => {
  const { onConfirm } = props;

  const handleCancel = () => {
    Modal.confirm({
      title: 'Czy chcesz anulować zakład?',
      content:
        'Czy na pewno chcesz usunąć zakład? Tej operacji nie można cofnąć',
      okText: 'Tak',
      okType: 'danger',
      cancelText: 'Anuluj',
      onOk() {
        onConfirm();
      }
    });
  };

  return (
    <button className={'cancel-bet-btn'} onClick={handleCancel}>
      X
    </button>
  );
};
