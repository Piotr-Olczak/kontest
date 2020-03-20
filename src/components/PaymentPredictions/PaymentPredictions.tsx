import React, { useEffect, useState } from 'react';
import { RaceDayShape } from 'interfaces/racedays/racedays';
import { InfocenterBetTypeCombinationPayment } from 'interfaces/infocenter/infocenter';
import { infocenterHelper } from 'helpers/infocenter.helper';
import { PaymentPredictionsList } from 'components/PaymentPredictionsList/PaymentPredictionsList';

interface PaymentPredictionsPropsShape {
  initialData?: InfocenterBetTypeCombinationPayment[];
  raceDay: RaceDayShape;
  raceNumber?: number;
  betTypeApiCode?: string;
  type: 'single' | 'multi';
  uniqueId?: string;
}

const PaymentPredictions: React.FC<PaymentPredictionsPropsShape> = props => {
  const { initialData, raceDay, raceNumber, type, uniqueId } = props;
  const { raceDate, trackCode, eventsPlace } = raceDay;

  const [data, setData] = useState<InfocenterBetTypeCombinationPayment[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsLoading(true);

      if (type === 'single' && raceNumber) {
        infocenterHelper
          .fetchFullRaceInfo({
            raceDay: {
              raceDate: raceDate,
              trackCode: trackCode,
              eventsPlace: eventsPlace
            },
            raceNumber: raceNumber
          })
          .then(infocenterRaceData => {
            if (infocenterRaceData && infocenterRaceData.singleRaceBetTypes) {
              const out = infocenterRaceData.singleRaceBetTypes.find(
                singleRaceBet =>
                  singleRaceBet.betTypeApiCode === props.betTypeApiCode
              );

              if (out && out.paymentPredictionsList) {
                setData(out.paymentPredictionsList);
              }
            }
          })
          .finally(() => setIsLoading(false));
      } else if (type === 'multi' && uniqueId) {
        infocenterHelper
          .fetchFullRaceDayInfo(raceDay)
          .then(infocenterFullRaceDayInfo => {
            const multiRaceBetInfocenterData = infocenterFullRaceDayInfo.multiRaceBetTypes.find(
              multiRaceBet => multiRaceBet.uniqueId === uniqueId
            );
            if (multiRaceBetInfocenterData) {
              setData(multiRaceBetInfocenterData.paymentPredictionsList);
            }
          })
          .finally(() => setIsLoading(false));
      }
    }, 15000);

    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      {initialData && !data && (
        <PaymentPredictionsList list={initialData} isLoading={isLoading} />
      )}
      {data && data.length && (
        <PaymentPredictionsList list={data} isLoading={isLoading} />
      )}
    </section>
  );
};

export default PaymentPredictions;
