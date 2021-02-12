import { RaceBetTypeSettingsShape } from 'interfaces/raceday/raceday';
import { BetTypeMetaData } from 'interfaces/bet/bet';
import { SystemSettingsShape } from 'interfaces/interfaces';
import { apiGetData } from 'helpers/apiConnector';

class SystemSettingsHelper {
    fetchSystemSettings(): Promise<SystemSettingsShape> {
        return apiGetData('/player-public/get-system-settings');
  }
  /**
   * This method creates the settings for the selected race type ( according to systemSettings ) and returns it;
   *
   * @method
   * @name getRaceBetTypeSettings
   * @param systemSettings
   * @param apiCode
   * @returns {object} Info about number of rows to render, minimal ammount of horses to bet, if substitutions are allowed.
   */
  getRaceBetTypeSettings(
    systemSettings: SystemSettingsShape,
    apiCode: string
  ): RaceBetTypeSettingsShape | undefined {
    if (!Array.isArray(systemSettings.betTypeMetaDataList)) return;
    // data from the system settings
    const settings = systemSettings.betTypeMetaDataList.find(
      (item: BetTypeMetaData) => item.apiCode === apiCode
    );
    if (!settings) return;

    return {
      rowsToBet: settings.selectionsNumber, // number of rows
      minHorsesToBet: settings.minHorsesStartedNumber, // min horses tostart a race
      substituteAllowed: settings.substituteAllowed, // are reservoir horses enabled
      boxAllowed: settings.boxAllowed // is box enabled
    };
  }

  /** Returns settings for provided betTypeApiCode  */
  getSettingsForBetType = (
    systemSettings: SystemSettingsShape,
    betTypeApiCode: string
  ): RaceBetTypeSettingsShape | undefined => {
    return systemSettingsHelper.getRaceBetTypeSettings(
      systemSettings,
      betTypeApiCode
    );
  };
}

export const systemSettingsHelper = new SystemSettingsHelper();
