import React from 'react';

import TrafHorse from 'components/Icon/assets/logo-traf.icon.svg';
import Clock from 'components/Icon/assets/clock.icon.svg';
import Contact from 'components/Icon/assets/contact.icon.svg';
import Eye from 'components/Icon/assets/eye.icon.svg';
import Horse from 'components/Icon/assets/horse.icon.svg';
import Deposit from 'components/Icon/assets/money-deposit.icon.svg';
import Question from 'components/Icon/assets/question.icon.svg';
import RightArrow from 'components/Icon/assets/right-arrow.icon.svg';
import SafePlay from 'components/Icon/assets/safe-play.icon.svg';
import Settings from 'components/Icon/assets/settings.icon.svg';
import Spinner from 'components/Icon/assets/spinner-circle.icon.svg';
import Sync from 'components/Icon/assets/sync.icon.svg';
import Thumbup from 'components/Icon/assets/thumbup.icon.svg';
import Timer from 'components/Icon/assets/timer.icon.svg';
import Tick from 'components/Icon/assets/tick.icon.svg';
import Secure from 'components/Icon/assets/user-verification.icon.svg';
import Withdraw from 'components/Icon/assets/withdraw-money.icon.svg';
import Neutral from 'components/Icon/assets/neutral-money.icon.svg';
import ForbiddenMark from 'components/Icon/assets/forbidden-mark.icon.svg';
import ForbiddenMarkPurple from 'components/Icon/assets/forbidden-mark--purple.icon.svg';
import CashIn from 'components/Icon/assets/cash-in.icon.svg';
import CashOut from 'components/Icon/assets/cash-out.icon.svg';
import DocumentGradient from 'components/Icon/assets/document-gradient.svg';
import FlagGradient from 'components/Icon/assets/flag-gradient.svg';
import Money100Gradient from 'components/Icon/assets/money-100-gradient.svg';

export type IconType =
  | 'withdraw'
  | 'deposit'
  | 'neutral'
  | 'refresh'
  | 'settings'
  | 'blocked-screen'
  | 'contact'
  | 'timer'
  | 'clock'
  | 'question'
  | 'secure'
  | 'spinner'
  | 'right-arrow'
  | 'horse'
  | 'traf-logo'
  | 'thumbup'
  | 'forbidden-mark'
  | 'forbidden-mark--purple'
  | 'tick'
  | 'eye'
  | 'cash-in'
  | 'cash-out'
  | 'document-gradient'
  | 'flag-gradient'
  | 'money-100-gradient';

interface Icon {
  type: IconType;
  className?: string;
}

export const Icon: React.FC<Icon> = props => {
  let { type, className } = props;
  const iconMap: { [key: string]: any } = {
    contact: Contact,
    deposit: Deposit,
    'blocked-screen': SafePlay,
    settings: Settings,
    refresh: Sync,
    withdraw: Withdraw,
    neutral: Neutral,
    secure: Secure,
    thumbup: Thumbup,
    timer: Timer,
    tick: Tick,
    clock: Clock,
    question: Question,
    'right-arrow': RightArrow,
    'forbidden-mark': ForbiddenMark,
    'forbidden-mark--purple': ForbiddenMarkPurple,
    spinner: Spinner,
    eye: Eye,
    horse: Horse,
    'traf-logo': TrafHorse,
    'cash-in': CashIn,
    'cash-out': CashOut,
    'document-gradient': DocumentGradient,
    'flag-gradient': FlagGradient,
    'money-100-gradient': Money100Gradient
  };

  const selectedIconUrl = iconMap[type];
  if (!selectedIconUrl) return null;

  if (!className) className = '';
  return <img className={className} src={selectedIconUrl} alt="" />;
};
