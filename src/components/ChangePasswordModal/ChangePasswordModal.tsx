import React, { useState } from 'react';
import { Modal } from 'antd';
import {
  ChangePasswordForm,
  statuses
} from 'components/ChangePasswordForm/ChangePasswordForm';
import Button from 'components/Button/Button';

export const ChangePasswordModal: React.FC = () => {
  const [modalVisibility, setModalVisibility] = useState(true);
  const [success, setSuccess] = useState(false);

  return (
    <>
      <Modal
        title="Zmiana hasła tymczasowego"
        closable={false}
        visible={modalVisibility}
        footer={null}
      >
        Aktualnie korzystasz z hasła tymczasowego. Zmień hasło na nowe.
        <div style={{ marginTop: '20px' }}>
          <h2>Formularz zmiany hasła</h2>
          {success ? (
            <div>
              <p className="form-status form-status--success">
                {statuses.success}
              </p>

              <Button
                label="Zamknij"
                onClickFunction={() => setModalVisibility(false)}
              />
            </div>
          ) : (
            <ChangePasswordForm
              onSuccess={() => {
                setSuccess(true);
              }}
            />
          )}
        </div>
      </Modal>
    </>
  );
};
