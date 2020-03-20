import { notification, Alert } from 'antd';
import BasicLayout from 'components/BasicLayout/BasicLayout';
import { Spinner } from 'components/Spinner/Spinner';
import { userBetsHelper, SlipDescriptionShape } from 'helpers/userBets.helper';
import React, { useEffect, useState, useContext } from 'react';
import { SlipCoupon } from 'components/SlipCoupon/SlipCoupon';
import { DynamicData } from 'helpers/dynamic.data.helper';
import { AppContextShape } from 'interfaces/interfaces';
import { AppContext } from 'components/AppState/AppState';
import { LinkBackToRaces } from 'components/LinkBackToRaces/LinkBackToRaces';

export const UserBetsPage: React.FC = () => {
  const { dispatch } = useContext<AppContextShape>(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [loadUserBets, setLoadUserBets] = useState(true);
  const [error, setError] = useState(false);

  const [userBets, setUserBets] = useState<Array<SlipDescriptionShape>>([]);

  useEffect(() => {
    if (loadUserBets) {
      setIsLoading(true);
      userBetsHelper
        .fetchUserBets()
        .then(data => {
          setUserBets(data.slipsList);
        })
        .catch(err => {
          setError(true);
        })
        .finally(() => {
          setIsLoading(false);
          setLoadUserBets(false);
        });
    }
  }, [loadUserBets]);

  const handleUserBetRemove = (removedBetNum: number, errCb: () => void) => {
    return userBetsHelper
      .cancelUserBet(removedBetNum)
      .then(data => {
        notification.success({
          message: `Anulowano kupon.`
        });

        setLoadUserBets(true);

        DynamicData.updateUserDynamicData(dispatch);
      })
      .catch(err => {
        notification.error({
          message: `Nie udało się anulować kuponu.`
        });

        if (errCb) errCb();
      });
  };

  return (
    <BasicLayout>
      <LinkBackToRaces />
      <h1>Twoje ostatnie kupony</h1>
      {isLoading && <Spinner />}
      {error && (
        <Alert
          message="Przykro nam, wystąpił błąd. Proszę spróbować później."
          type="error"
        />
      )}
      {!isLoading && (
        <section className={'user-bets'}>
          {userBets.map((userBet: SlipDescriptionShape) => {
            return (
              <div className="user-bet" key={userBet.ekonikSlipNumber}>
                <div className="user-bet-wrapper">
                  <SlipCoupon
                    key={userBet.ekonikSlipNumber}
                    coupon={userBet}
                    onCancellation={handleUserBetRemove}
                  />
                </div>
              </div>
            );
          })}
        </section>
      )}
    </BasicLayout>
  );
};
