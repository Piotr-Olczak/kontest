import { DateHelper } from 'helpers/date.helper';
import {
  EditBasicDataInitialValuesShape,
  PlayerChangeBasicDataByPlayer
} from 'interfaces/EditPlayerData/editPlayerData';
import { PlayerOptionalConsentsData } from 'interfaces/player/player';
import { apiPostData } from 'helpers/apiConnector';
import { FieldsHelper } from './fields.helper';
import { stringHelper } from 'helpers/string.helper';

class EditPlayerDataHelper {
  mapEditBasicDataFromState(state: any) {
    const birthDate = new Date(state.dateOfBirth);
    const birthDay = DateHelper.parseToTwoDigit(birthDate.getDate());
    const birthMonth = DateHelper.parseToTwoDigit(birthDate.getMonth() + 1);
    const birthYear = birthDate.getFullYear();
    const editBasicData = {
      ...state,
      birthDay,
      birthMonth,
      birthYear
    };
    return editBasicData;
  }

  mapBasicData(
    editBasicDataFormValues: EditBasicDataInitialValuesShape,
    password: string
  ): PlayerChangeBasicDataByPlayer {
    const newBasicData = {
      bankAccountNumber: stringHelper.stripWhitespace(
        editBasicDataFormValues.bankAccountNumber
      ),
      city: editBasicDataFormValues.city,
      country: editBasicDataFormValues.country,
      nationality:
        typeof editBasicDataFormValues.nationality !== 'undefined'
          ? FieldsHelper.mapNationality(editBasicDataFormValues.nationality)
          : undefined,
      dateOfBirth: `${editBasicDataFormValues.birthYear}-${
        editBasicDataFormValues.birthMonth
      }-${editBasicDataFormValues.birthDay}`,
      email: editBasicDataFormValues.email,
      firstName: editBasicDataFormValues.firstName,
      flatNr: editBasicDataFormValues.flatNr,
      houseNr: editBasicDataFormValues.houseNr,
      idDocumentNumber: editBasicDataFormValues.idDocumentNumber,
      lastName: editBasicDataFormValues.lastName,
      pesel: editBasicDataFormValues.pesel,
      phoneNumber: editBasicDataFormValues.phoneNumber,
      postalCode: editBasicDataFormValues.postalCode,
      street: editBasicDataFormValues.street
    };
    const playerChangeData = {
      newBasicData,
      password
    };

    return playerChangeData;
  }

  sendEditBasicDataForm(
    playerCreationData: PlayerChangeBasicDataByPlayer
  ): Promise<any> {
    return apiPostData('/player/account/change-basic-data', playerCreationData);
  }

  mapOptionalConsentsFromState(state: PlayerOptionalConsentsData) {
    const editOptionalConsent = {
      ...state
    };
    return editOptionalConsent;
  }

  sendOptionalConsentsDataForm(
    optionalConsentData: PlayerOptionalConsentsData
  ): Promise<any> {
    return apiPostData(
      '/player/account/change-optional-consents-data',
      optionalConsentData
    );
  }
}

export const editPlayerDataHelper = new EditPlayerDataHelper();
