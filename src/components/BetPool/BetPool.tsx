import React from 'react';

import { formatPrice } from 'helpers/utils';
import classNames from 'classnames';
import { Spinner } from 'components/Spinner/Spinner';

interface BetPoolShape {
  loading: boolean;
  pool: number;
  extraClasses?: string;
}

const BetPoolBase: React.FC<BetPoolShape> = props => {
  const { loading, pool } = props;

  const classes = classNames('bet-pool', props.extraClasses);

  return (
    <>
      <p className={classes}>
        {loading ? <Spinner /> : pool ? formatPrice(pool) : '-'}
      </p>
    </>
  );
};

export const BetPool = React.memo(BetPoolBase);
