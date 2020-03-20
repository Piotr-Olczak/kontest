import { Popover } from 'antd';
import { BtnColor } from 'components/BtnColor/BtnColor';
import FormElement from 'components/FormElements/FormElement';
import { Field, Form, Formik } from 'formik';
import { generateArray } from 'helpers/utils';
import React, { useState } from 'react';

interface MultipliersRowShape {
  onMultiplierChange: { (newMultiplier: number): void };
  activeMultiplier: number;
}

const NUM_OF_MULTIPLIERS = 5;

export const MultipliersRow: React.FC<MultipliersRowShape> = props => {
  const { onMultiplierChange, activeMultiplier } = props;

  const multipliersList = generateArray<number>(NUM_OF_MULTIPLIERS).map(
    (item, index) => index + 1
  );

  const handleMultiplierChange = (multiplier: number) => {
    onMultiplierChange(multiplier);
  };

  return (
    <article className={'multipliers'}>
      <p>Mnożnik:</p>
      <div className={'multipliers__list'}>
        {multipliersList.map((multiplier: number) => (
          <BtnColor
            key={multiplier}
            btnType={'alternative'}
            isActive={multiplier === activeMultiplier}
            onClick={handleMultiplierChange.bind(null, multiplier)}
          >
            x{multiplier}
          </BtnColor>
        ))}

        <CustomMultiplier
          onMultiplierChange={handleMultiplierChange}
          activeMultiplier={activeMultiplier}
        />
      </div>
    </article>
  );
};

const CustomMultiplier: React.FC<{
  onMultiplierChange: Function;
  activeMultiplier: number;
}> = props => {
  const { activeMultiplier, onMultiplierChange } = props;

  const isCustomValueOn = activeMultiplier > NUM_OF_MULTIPLIERS;

  const [popupVisible, setPopupVisible] = useState(false);

  const handleCustomValueChange = (newValue: number) => {
    onMultiplierChange(newValue);
    setPopupVisible(false);
  };

  const handleVisibilityChange = (isVisible: boolean) =>
    setPopupVisible(isVisible);

  const printCustomValue = isCustomValueOn ? activeMultiplier : '?';

  return (
    <Popover
      onVisibleChange={handleVisibilityChange}
      content={<CustomMultiplierForm onSubmitValue={handleCustomValueChange} />}
      visible={popupVisible}
      trigger="click"
    >
      <BtnColor
        btnType={'alternative'}
        className={'custom-btn'}
        isActive={isCustomValueOn}
      >
        x{printCustomValue}
      </BtnColor>
    </Popover>
  );
};

const CustomMultiplierForm: React.FC<{
  onSubmitValue: Function;
}> = props => {
  const { onSubmitValue } = props;

  const handleFormSubmit = (values: { multiplier: number }) => {
    onSubmitValue(values.multiplier);
  };

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={{ multiplier: 1 }}>
      <Form className="form-elements multiplier-form">
        <FormElement>
          <label className="form-element__label" htmlFor="multiplier">
            Mnożnik
          </label>
          <Field
            id="multiplier"
            min={1}
            max={999999}
            type="number"
            name="multiplier"
          />
        </FormElement>
        <BtnColor btnType={'alternative'} type={'submit'}>
          Zapisz
        </BtnColor>
      </Form>
    </Formik>
  );
};
