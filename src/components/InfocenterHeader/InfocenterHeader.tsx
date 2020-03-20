import React from 'react';
import { infocenterHelper } from 'helpers/infocenter.helper';
import { DateHelper } from 'helpers/date.helper';
import { InfocenterRace } from 'interfaces/infocenter/infocenter';
import { Spinner } from 'components/Spinner/Spinner';

interface InfocenterHeaderPropsShape {
  dayName: string;
  raceNumber: number | undefined;
  infocenter: InfocenterRace | undefined;
  isLoading?: boolean;
}

interface InfocenterHeaderLoaderPropsShape {
  loading?: boolean;
}

const InfocenterHeaderLoader: React.FC<
  InfocenterHeaderLoaderPropsShape
> = props => {
  const { loading } = props;
  return loading ? <Spinner /> : <span>-</span>;
};

export const InfocenterHeader: React.FC<InfocenterHeaderPropsShape> = props => {
  const { dayName, raceNumber, infocenter, isLoading } = props;
  return (
    <div className="infocenter-header__wrapper">
      <h1 className="infocenter-header__race-name">
        Dzień:{' '}
        {infocenter ? dayName : <InfocenterHeaderLoader loading={isLoading} />}{' '}
        {raceNumber ? `/ Gonitwa nr ${raceNumber}` : ''}
      </h1>
      <div className="infocenter-header">
        <div className="infocenter-header__main-block">
          <div className="infocenter-header__main-info">
            <h2>
              {infocenter ? (
                infocenterHelper.displayInfocenterData(
                  infocenter.raceExtraInfo && infocenter.raceExtraInfo.name
                )
              ) : (
                <InfocenterHeaderLoader loading={isLoading} />
              )}
            </h2>
            <div className="infocenter-header__race-metadata">
              <p>
                <strong>Data:</strong>{' '}
                {infocenter &&
                  infocenter.startDate &&
                  infocenterHelper.displayInfocenterData(
                    DateHelper.formatDateFriendly(
                      new Date(infocenter.startDate)
                    )
                  )}
              </p>
              <p>
                <strong>Godzina:</strong>{' '}
                {infocenter &&
                  infocenter.startDate &&
                  infocenterHelper.displayInfocenterData(
                    DateHelper.formatDateTimeHours(
                      new Date(infocenter.startDate)
                    )
                  )}
              </p>
              <p>
                <strong>Dystans:</strong>{' '}
                {infocenter &&
                  infocenterHelper.displayInfocenterData(
                    infocenter.raceExtraInfo &&
                      infocenter.raceExtraInfo.distance,
                    ' m'
                  )}
              </p>
              <p>
                <strong>Liczba koni:</strong>{' '}
                {infocenter &&
                  infocenterHelper.displayInfocenterData(
                    infocenter.horsesNumber
                  )}
              </p>
            </div>
          </div>
          <div className="infocenter-header__track-info">
            <p>
              <strong>Stan toru:</strong>{' '}
              {infocenter &&
                infocenterHelper.displayInfocenterData(
                  infocenter.raceExtraInfo &&
                    infocenter.raceExtraInfo.trackStateDescription
                )}
            </p>
            <p>
              <strong>Pogoda:</strong>{' '}
              {infocenter &&
                infocenterHelper.displayInfocenterData(
                  infocenter.raceExtraInfo && infocenter.raceExtraInfo.weather
                )}
            </p>
          </div>
        </div>
        <div className="infocenter-header__description-block">
          <h2>Warunki gonitwy</h2>
          <p>
            {infocenter ? (
              infocenterHelper.displayInfocenterData(
                infocenter.raceExtraInfo && infocenter.raceExtraInfo.description
              )
            ) : (
              <InfocenterHeaderLoader loading={isLoading} />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
