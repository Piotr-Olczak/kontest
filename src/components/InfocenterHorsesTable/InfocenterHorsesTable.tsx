import React, { useState } from 'react';
import { InfocenterHorseExtra } from 'interfaces/infocenter/infocenter';
import { Tooltip } from 'antd';
import { HorseSelectionShape } from 'interfaces/HorseSelection/HorseSelectionShape';
import { InfocenterHorsePopup } from 'components/InfocenterHorsePopup/InfocenterHorsePopup';
import classNames from 'classnames';

interface InfocenterHorsesTablePropsShape {
  horsesExtraInfo: InfocenterHorseExtra[];
  horsesSelected: HorseSelectionShape[];
}

export const InfocenterHorsesTable: React.FC<
  InfocenterHorsesTablePropsShape
> = props => {
  const { horsesExtraInfo, horsesSelected } = props;

  const [popupHorseData, setPopupHorseData] = useState();
  const [popupVisibile, setPopupVisible] = useState(false);

  const showPopup = (horseData: any) => {
    setPopupHorseData(horseData);
    setPopupVisible(true);
  };

  const sortedHorsesExtraInfo = horsesExtraInfo.sort(
    (a, b) => a.startNumber - b.startNumber
  );

  return (
    <>
      <section className="horses-extra-info">
        <h2 className="horses-extra-info__header">GONITWA</h2>

        <table className="race-horses-table">
          <thead>
            <tr>
              <th>
                Numer
                <br />
                konia
              </th>
              <th>Nazwa</th>
              <th>
                Płeć /<br />
                wiek
              </th>
              <th>
                Jeździec /<br />
                powożący
              </th>
              <th>
                Ranga
                <br />
                jeźdźca
              </th>
              <th>
                Waga
                <br />
                jeźdźca
              </th>
              <th>Trener</th>
              <th>
                Performance
                <br />
                (kariera)
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedHorsesExtraInfo.map(horseExtraInfo => {
              const {
                startNumber,
                name,
                gender,
                age,
                jockey,
                jockeyCategory,
                loadInRace,
                trainer,
                yearlyHorseCareerList
              } = horseExtraInfo;

              const isSelected = horsesSelected.some(selection =>
                selection.selectedHorses.includes(startNumber)
              );

              const trClasses = classNames({
                'race-horses-table__row': true,
                'race-horses-table__row--selected': isSelected
              });

              return (
                <tr
                  key={startNumber}
                  className={trClasses}
                  onClick={showPopup.bind(null, horseExtraInfo)}
                >
                  <td>{startNumber}</td>
                  <td>{name}</td>
                  <td>
                    {gender && gender.genderName}{' '}
                    {!!age && (
                      <>
                        <br />
                        {age}
                      </>
                    )}
                  </td>
                  {/* to do */}
                  <td>{jockey}</td>
                  <td>
                    {jockeyCategory && (
                      <Tooltip title={jockeyCategory.label}>
                        <span>{jockeyCategory.code}</span>
                      </Tooltip>
                    )}
                  </td>
                  <td>{loadInRace}</td>
                  <td>{trainer}</td>
                  <td>
                    {!!yearlyHorseCareerList && (
                      <>
                        {yearlyHorseCareerList
                          .slice()
                          .reverse()
                          .map(yearData => {
                            return (
                              <span key={yearData.year}>
                                {yearData.result}({yearData.year}){' '}
                              </span>
                            );
                          })}
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      {popupHorseData && (
        <InfocenterHorsePopup
          horse={popupHorseData}
          visible={popupVisibile}
          onCancel={() => setPopupVisible(false)}
        />
      )}
    </>
  );
};
