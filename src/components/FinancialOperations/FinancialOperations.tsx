import React from 'react';
import classNames from 'classnames';
import { Table } from 'antd';

import { Icon, IconType } from 'components/Icon/Icon';
import {
  FinancialOperationType,
  FinancialOperationStatus
} from 'interfaces/financialOperations/financialOperations';
import { DateHelper } from 'helpers/date.helper';
import {
  financialOperationsVocabulary,
  financialOperationDirections
} from 'components/FinancialOperations/financialOperationsVocabulary';

export interface FinancialOperationsShape {
  amount: number;
  creationTimestamp: number;
  currencySymbol: string;
  status: FinancialOperationStatus;
  type: FinancialOperationType;
}

interface financialOperationsTableCellDataShape {
  date: number;
  displayDate: string;
  type: string;
  displayType: string;
  amount: number;
  displayAmount: string;
  sortAmount: number;
  displayStatus: string;
  icon: IconType;
  key: number;
}

const prepareFinancialOperationsTableData = (
  props: FinancialOperationsShape[]
) => {
  return props.map(transaction => {
    const {
      amount,
      creationTimestamp,
      currencySymbol,
      status,
      type
    } = transaction;

    const isFinancialOperationInVocabulary =
      typeof financialOperationsVocabulary.type[type] !== 'undefined';

    const financialOperationDirection = isFinancialOperationInVocabulary
      ? financialOperationsVocabulary.type[type].direction
      : financialOperationDirections.NEUTRAL;
    let pricePrefix = '';
    let icon: IconType = 'neutral';
    if (financialOperationDirection === 'in') {
      pricePrefix = '+';
      icon = 'cash-in';
    } else if (financialOperationDirection === 'out') {
      pricePrefix = '-';
      icon = 'cash-out';
    } else {
      pricePrefix = '';
    }
    const displayDate = DateHelper.formatDateFull(new Date(creationTimestamp));
    const displayPrice = `${pricePrefix} ${amount} ${currencySymbol}`;
    const sortAmount = Number(pricePrefix + amount);
    const displayType = isFinancialOperationInVocabulary
      ? financialOperationsVocabulary.type[type].text
      : type;
    const displayStatus = financialOperationsVocabulary.status[status];

    const operationClassName = classNames(
      {
        'financial-operation--done': status === 'ACCEPTED'
      },
      'financial-operation',
      'financial-operation--' + financialOperationDirection
    );
    return {
      date: creationTimestamp,
      displayDate: displayDate,
      type: type,
      displayType: displayType,
      amount: amount,
      displayAmount: displayPrice,
      sortAmount: sortAmount,
      displayStatus: displayStatus,
      icon: icon,
      operationClassName: operationClassName,
      key: creationTimestamp
    };
  });
};

export const FinancialOperations: React.FC<{
  transactions: FinancialOperationsShape[];
}> = props => {
  const { transactions } = props;

  const columns = [
    {
      title: 'Rodzaj operacji',
      dataIndex: 'displayType',
      render: (
        displayType: string,
        record: financialOperationsTableCellDataShape
      ) => {
        return (
          <p className="financial-operation__title">
            <Icon type={record.icon} />
            <span>{displayType}</span>
          </p>
        );
      },
      sorter: (
        a: financialOperationsTableCellDataShape,
        b: financialOperationsTableCellDataShape
      ) => a.type.localeCompare(b.type)
    },
    {
      title: 'Data',
      dataIndex: 'displayDate',
      sorter: (
        a: financialOperationsTableCellDataShape,
        b: financialOperationsTableCellDataShape
      ) => a.date - b.date
    },
    {
      title: 'Status',
      dataIndex: 'displayStatus',
      sorter: (
        a: financialOperationsTableCellDataShape,
        b: financialOperationsTableCellDataShape
      ) => a.displayStatus.localeCompare(b.displayStatus)
    },
    {
      title: 'Kwota',
      dataIndex: 'displayAmount',
      sorter: (
        a: financialOperationsTableCellDataShape,
        b: financialOperationsTableCellDataShape
      ) => a.sortAmount - b.sortAmount
    }
  ];

  const financialOperationsTableData = prepareFinancialOperationsTableData(
    transactions
  );

  return (
    <Table
      columns={columns}
      dataSource={financialOperationsTableData}
      pagination={{ pageSize: 20 }}
      rowClassName={ (record: any) => record.operationClassName }
    />
  );
};
