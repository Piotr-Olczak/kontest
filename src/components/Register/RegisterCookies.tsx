import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { Field } from 'formik';
import RegisterCookiesText from 'components/Register/RegisterCookiesText';

export const registerCookiesInitialValues = {
  cookiesConsent: false
};

interface RegisterCookiesShape {
  handleCookiesField: any;
  cookieConsentValue: boolean;
}

const RegisterCookies: React.FC<RegisterCookiesShape> = props => {
  const { handleCookiesField, cookieConsentValue } = props;

  const showCookiesAgreement = () => {
    Modal.info({
      content: <RegisterCookiesText />,
      okText: 'Potwierdzam',
      keyboard: false,
      width: 855,
      className: 'register-cookies__modal',
      onOk() {
        handleCookiesField();
      }
    });
  };
  useEffect(() => {
    if (cookieConsentValue === false) {
      showCookiesAgreement();
    }
    /* eslint react-hooks/exhaustive-deps: 0 */
  }, []);

  return (
    <>
      <div className="hidden-cookies-field">
        <Field type="checkbox" name="cookiesConsent" />
      </div>
    </>
  );
};

export default RegisterCookies;
