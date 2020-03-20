import React from 'react';
import { Modal, Table } from 'antd';
import { ModalFuncProps } from 'antd/lib/modal';
import { infocenterHelper } from 'helpers/infocenter.helper';
import { InfocenterHorseExtra } from 'interfaces/infocenter/infocenter';
import { DateHelper } from 'helpers/date.helper';

interface InfocenterHorsePopupPropsShape extends ModalFuncProps {
  horse: InfocenterHorseExtra;
}

export const InfocenterHorsePopup: React.FC<
  InfocenterHorsePopupPropsShape
> = props => {
  const { horse, ...restProps } = props;

  const lastResultTableColumns = [
    {
      title: 'Data',
      dataIndex: 'raceDate',
      key: 'raceDate'
    },
    {
      title: 'Gonitwa',
      dataIndex: 'raceName',
      key: 'raceName'
    },
    {
      title: 'Miejsce',
      dataIndex: 'horseResult',
      key: 'horseResult'
    }
  ];

  const lastResultsTableData = !!horse.horsePerformanceList
    ? horse.horsePerformanceList.map(raceData => {
        return {
          key: raceData.raceDate,
          raceDate: DateHelper.formatDateFriendly(new Date(raceData.raceDate)),
          raceName: raceData.raceName,
          horseResult: raceData.horseResult
        };
      })
    : [];

  const modalTitleSuffix =
    horse.suffix && horse.suffix.suffix ? horse.suffix.suffix : '';
  return (
    <Modal
      title={modalTitleSuffix + ' ' + (horse.name ? horse.name : '')}
      footer={null}
      className="horse-popup"
      {...restProps}
    >
      <div className="horse-popup__data-wrapper">
        <div className="horse-popup__data-group">
          <p>
            <strong>Grupa:</strong>{' '}
            {infocenterHelper.displayInfocenterData(horse.raceGroup)}
          </p>
        </div>
        <div className="horse-popup__data-group">
          {!!horse.yearlyHorseCareerList &&
            horse.yearlyHorseCareerList.map(yearData => {
              return (
                <p key={yearData.year}>
                  <strong>{yearData.year}</strong> / {yearData.result} /{' '}
                  {yearData.prize}
                </p>
              );
            })}
        </div>

        <div className="horse-popup__data-group">
          <h2>Tożsamość</h2>
          <p>
            <strong>Płeć:</strong>{' '}
            {infocenterHelper.displayInfocenterData(
              horse.gender && horse.gender.genderName
            )}
          </p>
          <p>
            <strong>Wiek:</strong>{' '}
            {infocenterHelper.displayInfocenterData(horse.age)}
          </p>
          <p>
            <strong>Rasa:</strong>{' '}
            {infocenterHelper.displayInfocenterData(
              horse.breed && horse.breed.breedName
            )}
          </p>
          <p>
            <strong>Maść:</strong>{' '}
            {horse.ointment &&
              infocenterHelper.displayInfocenterData(
                horse.ointment.ointmentName
              )}
          </p>
          <p>
            <strong>Kraj pochodzenia:</strong> (
            {horse.suffix && horse.suffix.suffix ? horse.suffix.suffix : '-'})
          </p>
        </div>
        <div className="horse-popup__data-group">
          <h2>Pochodzenie</h2>
          <p>
            <strong>Ojciec:</strong>{' '}
            {infocenterHelper.displayInfocenterData(horse.fatherName)}
          </p>
          <p>
            <strong>Matka: </strong>
            {infocenterHelper.displayInfocenterData(horse.motherName)}
          </p>
          <p>
            <strong>Ojciec matki:</strong>{' '}
            {infocenterHelper.displayInfocenterData(horse.mothersFatherName)}
          </p>
        </div>
        <div className="horse-popup__data-group">
          <h2>Dodatkowe</h2>
          <p>
            <strong>Jeździec / Powożący:</strong>{' '}
            {infocenterHelper.displayInfocenterData(horse.jockey)}
          </p>
          <p>
            <strong>Trener:</strong>{' '}
            {infocenterHelper.displayInfocenterData(horse.trainer)}
          </p>
          <p>
            <strong>Właściciel:</strong>{' '}
            {infocenterHelper.displayInfocenterData(
              horse.ownershipGroup && horse.ownershipGroup.stable
            )}
          </p>
          <p>
            <strong>Hodowca:</strong>{' '}
            {infocenterHelper.displayInfocenterData(horse.breeder)}
          </p>
        </div>
      </div>
      <div className="horse-popup__last-races">
        <h2>Ostatnie występy</h2>
        <Table
          dataSource={lastResultsTableData}
          columns={lastResultTableColumns}
          pagination={false}
          locale={{
            emptyText: 'Koń debiutujący'
          }}
        />
      </div>
    </Modal>
  );
};
