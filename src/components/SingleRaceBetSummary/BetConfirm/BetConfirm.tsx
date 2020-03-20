import { Modal, notification } from 'antd';
import Button from 'components/Button/Button';
import { singleBetHelper, SlipShape } from 'helpers/singleBet.helper';
import React, { useState, useContext } from 'react';

import { SlipDescriptionShape } from 'helpers/userBets.helper';
import { SlipCoupon } from 'components/SlipCoupon/SlipCoupon';
import { DynamicData } from 'helpers/dynamic.data.helper';
import { AppContextShape } from 'interfaces/interfaces';
import { AppContext } from 'components/AppState/AppState';
import { systemMessagesHelper } from 'helpers/systemMessages.helper';

interface BetConfirmShape {
  slip: SlipShape | null;
  isDisabled?: boolean;
  slipCoupon: SlipDescriptionShape;
  clearSelection?: Function;
}

export const BetConfirm: React.FC<BetConfirmShape> = props => {
  const { slip, isDisabled, clearSelection, slipCoupon } = props;

  const { dispatch } = useContext<AppContextShape>(AppContext);
  const [modalVisibility, setModalVisibility] = useState(false);

  const hideModal = () => setModalVisibility(false);
  const showModal = () => setModalVisibility(true);

  const [isLoading, setIsLoading] = useState(false);

  const closeModalCallback = () => {
    setIsLoading(false);
    hideModal();
    if (clearSelection) {
      clearSelection();
    }
  };

  const handleBetBuy = () => {
    setIsLoading(true);

    const customFailMessage =
      'Zakład nie został postawiony, coś poszło nie tak';

    if (slip) {
      singleBetHelper
        .placeSlip(slip)
        .then(() => {
          DynamicData.updateUserDynamicData(dispatch);
          notification.success({ message: 'Zakład postawiony' });
        })
        .catch(e => {
          notification.error({
            message: systemMessagesHelper.getSystemMessageByAxiosError(
              e,
              undefined,
              customFailMessage
            )
          });
        })
        .finally(() => {
          closeModalCallback();
        });
    } else {
      closeModalCallback();
      notification.error({
        message: customFailMessage
      });
    }
  };

  return (
    <>
      <Button
        disabled={isDisabled}
        onClickFunction={showModal}
        label={'Zatwierdź zakład'}
      />
      <Modal
        visible={modalVisibility}
        onCancel={hideModal}
        width={'1000px'}
        footer={
          <footer className={'bet-confirm__footer'}>
            <Button onClickFunction={hideModal} label={'Anuluj'} />
            <Button
              loading={isLoading}
              onClickFunction={handleBetBuy}
              label={'Potwierdzam'}
            />
          </footer>
        }
      >
        <section className={'bet-confirm'}>
          <aside className={'bet-confirm__coupon'}>
            <SlipCoupon coupon={slipCoupon} />
          </aside>
          <article className={'bet-confirm__content'}>
            <h4 className={'bet-confirm__title'}>Dokończ transakcję:</h4>
            <p>
              Pamiętaj: Dokonujesz zakupu z obowiązkiem zapłaty. Klikając
              przycisk “Potwierdzam”, dokonujesz zakupu, co oznacza pobranie
              środków z Twojego portfela.
            </p>
          </article>
        </section>
      </Modal>
    </>
  );
};
