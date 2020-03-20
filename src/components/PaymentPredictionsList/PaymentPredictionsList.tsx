import React from 'react';
import { InfocenterBetTypeCombinationPayment } from 'interfaces/infocenter/infocenter';
import { formatPrice } from 'helpers/utils';
import { Spinner } from 'components/Spinner/Spinner';
import classNames from 'classnames';

interface PaymentPredictionsListPropsShape {
  list: InfocenterBetTypeCombinationPayment[];
  isLoading?: boolean;
}

export const PaymentPredictionsList: React.FC<
  PaymentPredictionsListPropsShape
> = props => {
  const { list, isLoading } = props;

  const paymentPredictionsListClasses = classNames({
    'payment-predictions-list': true,
    'payment-predictions-list--loading': !!isLoading
  });

  return list.length ? (
    <>
      <div className="payment-predictions-header">
        <div className="border-header" />
        PROGNOZY WYPŁAT
        <div className="border-footer" />
      </div>
      <div className={paymentPredictionsListClasses}>
        {!!isLoading && <Spinner />}

        <div className="border-header" />
        <table className="payment-predictions-table">
          <thead>
            <tr>
              <th className="payment-predictions-table__head payment-predictions-table__head--combinations">
                KOMBINACJA
              </th>
              <th className="payment-predictions-table__head payment-predictions-table__head--combinations">
                KURS
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map(prediction => {
              const { combination, payment } = prediction;

              return (
                <tr key={combination}>
                  <td>{combination}</td>
                  <td>{formatPrice(payment)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="border-footer" />
      </div>
    </>
  ) : null;
};
