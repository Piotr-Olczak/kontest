import React, { useEffect, useState } from 'react';
import { DateHelper } from 'helpers/date.helper';
import { Icon } from 'components/Icon/Icon';

const ONE_SEC = 1000;
const ONE_MIN = ONE_SEC * 60;

type TimerType = 'timer' | 'clock';

interface Timer {
  type?: TimerType;
  from: Date;
  label: string;
  loading?: boolean;
}

export const Timer: React.FC<Timer> = props => {
  let { type, label, from, loading } = props;
  if (!type) type = 'timer';

  const getStartDate = (date: Date): number => {
    if (type === 'clock') return date.getTime();
    return new Date().getTime() - date.getTime();
  };
  const [timer, changeTimer] = useState(getStartDate(from));

  const startTimer = (increment: number) => {
    return setInterval(() => {
      changeTimer(t => t + increment);
    }, increment);
  };

  useEffect(() => {
    let timerInterval: any;
    if (type === 'timer') {
      timerInterval = startTimer(ONE_SEC);
    } else {
      timerInterval = startTimer(ONE_MIN);
    }
    return () => clearInterval(timerInterval);
  }, [type]);

  const mapDate = {
    timer: DateHelper.formatDateTime(new Date(timer)),
    clock: DateHelper.formatDateTimeHours(new Date(timer))
  };
  const showDate = mapDate[type];
  if (loading)
    return (
      <p className="timer">
        <Icon type={type} className="timer__icon" /> Wczytywanie...
      </p>
    );
  return (
    <div className="timer">
      <Icon type={type} className="timer__icon" /> {label}:{' '}
      <strong>{showDate}</strong>
    </div>
  );
};
