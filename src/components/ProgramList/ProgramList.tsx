import React, { useEffect, useState } from 'react';
import { Spinner } from 'components/Spinner/Spinner';
import { Table } from 'antd';
import { mockCmsDataRaces } from 'mocks/cms-data';
import { DateHelper } from 'helpers/date.helper';
import CommonError from 'components/CommonError/CommonError';
import { cmsDataHelper } from 'helpers/cmsData.helper';
import { Icon, IconType } from 'components/Icon/Icon';

export interface raceProgramShape {
  date: string;
  place: string;
  schedule: string;
  races: string;
  bets: string;
  types: string;
  results: string;
  payments: string;
  cedula: string;
}

interface ProgramLinkPropsShape {
  linkTarget: string;
  linkText: string;
  iconType?: IconType;
}

const ProgramLink: React.FC<ProgramLinkPropsShape> = props => {
  const { linkTarget, linkText, iconType } = props;
  const displayedIcon = iconType ? iconType : 'document-gradient';
  return linkTarget ? (
    <a
      className="program-list__item-link"
      href={linkTarget}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon type={displayedIcon} /> <span>{linkText}</span>
    </a>
  ) : (
    <span>-</span>
  );
};

const ProgramList: React.FC = () => {
  const [racesListJSON, setRacesListJSON] = useState<
    raceProgramShape[] | undefined
  >();
  const [tableData, setTableData] = useState();
  const [errorLoadingData, setErrorLoadingData] = useState();

  const tableColumns = [
    {
      title: 'Data',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => (
        <span className="program-list__item-date">
          {DateHelper.formatDateDetailed(new Date(date))}
        </span>
      ),
      sorter: (a: raceProgramShape, b: raceProgramShape) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    },
    {
      title: 'Miejsce',
      dataIndex: 'place',
      key: 'place',
      render: (place: string) => (
        <strong className="program-list__item-place">{place}</strong>
      ),
      sorter: (a: raceProgramShape, b: raceProgramShape) =>
        a.place.localeCompare(b.place)
    },
    {
      title: 'Program gonitw',
      dataIndex: 'schedule',
      key: 'schedule',
      render: (schedule: string) => (
        <ProgramLink linkTarget={schedule} linkText="Pobierz program" />
      )
    },
    {
      title: 'Plan gonitw',
      dataIndex: 'races',
      key: 'races',
      render: (races: string) => (
        <ProgramLink linkTarget={races} linkText="Pobierz plan" />
      )
    },
    {
      title: 'Zakłady',
      dataIndex: 'bets',
      key: 'bets',
      render: (bets: string) => (
        <ProgramLink linkTarget={bets} linkText="Zobacz zakłady" />
      )
    },
    {
      title: 'Typy',
      dataIndex: 'types',
      key: 'types',
      render: (types: string) => (
        <ProgramLink linkTarget={types} linkText="Zobacz typy" />
      )
    },
    {
      title: 'Wyniki',
      dataIndex: 'results',
      key: 'results',
      render: (results: string) => (
        <ProgramLink
          iconType="flag-gradient"
          linkTarget={results}
          linkText="Sprawdź wyniki"
        />
      )
    },
    {
      title: 'Informacje o wypłatach',
      dataIndex: 'payments',
      key: 'payments',
      render: (payments: string) => (
        <ProgramLink
          linkTarget={payments}
          linkText="Pobierz informacje o wypłatach"
          iconType="money-100-gradient"
        />
      )
    },
    {
      title: 'Ceduła wypłat',
      dataIndex: 'cedula',
      key: 'cedula',
      render: (cedula: string) => (
        <ProgramLink
          linkTarget={cedula}
          linkText="Pobierz cedułę wypłat"
          iconType="money-100-gradient"
        />
      )
    }
  ];

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      mockCmsDataRaces()
        .then(data => setRacesListJSON(data))
        .catch(() => setErrorLoadingData(true));
    } else {
      cmsDataHelper
        .getContentRaces()
        .then(data => {
          setRacesListJSON(data && data.data);
        })
        .catch(() => setErrorLoadingData(true));
    }
  }, []);

  useEffect(() => {
    racesListJSON &&
      setTableData(
        racesListJSON.map(race => {
          return {
            date: race.date,
            place: race.place,
            schedule: race.schedule,
            races: race.races,
            bets: race.bets,
            types: race.types,
            results: race.results,
            payments: race.payments,
            cedula: race.cedula
          };
        })
      );
  }, [racesListJSON]);

  return tableData || errorLoadingData ? (
    errorLoadingData ? (
      <CommonError />
    ) : (
      <Table
        className="program-list"
        columns={tableColumns}
        dataSource={tableData}
        // tslint:disable-next-line:jsx-no-lambda
          rowKey={(record: any, index: any) => record.date + index}
        locale={{ emptyText: 'Brak danych' }}
      />
    )
  ) : (
    <Spinner />
  );
};

export default ProgramList;
