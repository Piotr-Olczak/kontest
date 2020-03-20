import React, { useState, useRef } from 'react';
import FormElement from 'components/FormElements/FormElement';
import { depositHelper } from 'helpers/deposit.helper';
import Button from 'components/Button/Button';
import { AntStatusShape } from 'interfaces/antStatuses/antStatuses';
import { systemMessagesHelper } from 'helpers/systemMessages.helper';

interface DepositFormPropsShape {
  setPaymentStatus: (status: AntStatusShape | undefined) => void;
}

export const DepositForm: React.FC<DepositFormPropsShape> = props => {
  const [amount, setAmount] = useState(100);
  const [form, setForm] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const submitRef = useRef<HTMLButtonElement>(null);

  const handleAmountChange = (e: any) => {
    setAmount(e.target.value);
  };

  const handleDeposit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const node = submitRef.current;

    setIsLoading(true);
    props.setPaymentStatus(undefined);

    try {
      const data = await depositHelper.generateForm(amount);

      if (data && data.value) {
        setForm(data.value);
      }

      if (node) {
        // submit form to be redirected
        node.click();
      }
    } catch (err) {
      props.setPaymentStatus({
        type: 'error',
        message: systemMessagesHelper.getSystemMessageByAxiosError(err)
      });

      setIsLoading(false);
    }
  };

  function createMarkup() {
    return { __html: form };
  }

  const minDeposit = 10;

  return (
    <>
      <FormElement>
        <label className="form-element__label" htmlFor="amount">
          Kwota doładowania:
        </label>
        <input
          name="amount"
          type="number"
          min={minDeposit}
          value={amount}
          onChange={handleAmountChange}
        />
      </FormElement>

      {form && (
        <div>
          <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
      )}

      <Button
        label={isLoading ? 'Ładowanie...' : 'Doładuj'}
        loading={isLoading}
        disabled={amount < minDeposit}
        fullWidth={true}
        onClickFunction={handleDeposit}
      />

      <button
        style={{ display: 'none' }}
        id="dotpay_redirection_button"
        type="submit"
        form="dotpay_redirection_form"
        value="Submit"
        ref={submitRef}
      >
        Doładuj
      </button>
    </>
  );
};
