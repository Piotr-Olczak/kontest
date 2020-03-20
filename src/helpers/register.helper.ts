import { RegisterFormInitialValuesShape } from 'interfaces/register/register';
import {
  PlayerBasicData,
  PlayerLimits,
  PlayerOptionalConsentsData,
  PlayerRequiredConsentsData
} from 'interfaces/player/player';
import { PlayerCreationData } from 'interfaces/register/register';
import { apiPostData } from 'helpers/apiConnector';
import { FieldsHelper } from './fields.helper';
import { stringHelper } from 'helpers/string.helper';

class RegisterHelper {
  mapRegisterData(
    registerFormProps: RegisterFormInitialValuesShape
  ): PlayerCreationData {
    const basicData: PlayerBasicData = {
      bankAccountNumber: stringHelper.stripWhitespace(
        registerFormProps.bankAccountNumber
      ),
      city: registerFormProps.city,
      country: registerFormProps.country,
      nationality: FieldsHelper.mapNationality(registerFormProps.nationality),
      dateOfBirth: `${registerFormProps.birthYear}-${
        registerFormProps.birthMonth
      }-${registerFormProps.birthDay}`,
      email: registerFormProps.email,
      firstName: registerFormProps.firstName,
      flatNr: registerFormProps.flatNr ? registerFormProps.flatNr : '',
      houseNr: registerFormProps.houseNr,
      idDocumentNumber: registerFormProps.idDocumentNumber,
      lastName: registerFormProps.lastName,
      pesel: registerFormProps.pesel,
      phoneNumber: registerFormProps.phoneNumber,
      postalCode: registerFormProps.postalCode,
      street: registerFormProps.street
    };

    const balanceLimit1d = registerFormProps.balanceLimit1d;
    const balanceLimit1m = registerFormProps.balanceLimit1m;
    const timeLimit1d =
      (60 * registerFormProps['timeLimit1dHours'] +
        registerFormProps['timeLimit1dMinutes']) *
      60;
    const timeLimit1m =
      (60 * registerFormProps['timeLimit1mHours'] +
        registerFormProps['timeLimit1mMinutes']) *
      60;

    const limitsToSet: PlayerLimits = {
      balanceLimit1d: balanceLimit1d,
      balanceLimit1m: balanceLimit1m,
      timeLimit1d: timeLimit1d,
      timeLimit1m: timeLimit1m
    };
    const optionalConsentsData: PlayerOptionalConsentsData = {
      fundsSource: registerFormProps.fundsSource,
      mailMarketingConsent: registerFormProps.mailMarketingConsent,
      ownerFundsDeclaration: registerFormProps.ownerFundsDeclaration,
      phoneMarketingConsent: registerFormProps.phoneMarketingConsent,
      politicalVipDeclaration: registerFormProps.politicalVipDeclaration,
      privateBankingDeclaration: registerFormProps.privateBankingDeclaration,
      smsMarketingConsent: registerFormProps.smsMarketingConsent
    };
    const password: string = registerFormProps.password;
    const requiredConsentsData: PlayerRequiredConsentsData = {
      cookiesConsent: registerFormProps.cookiesConsent,
      hracingRegulationsConsent: registerFormProps.hracingRegulationsConsent,
      maturityConsent: registerFormProps.maturityConsent,
      rodoConsent: registerFormProps.rodoConsent
    };
    const playerCreationData = {
      basicData: basicData,
      limitsToSet: limitsToSet,
      optionalConsentsData: optionalConsentsData,
      password: password,
      requiredConsentsData: requiredConsentsData
    };

    return playerCreationData;
  }

  sendRegisterForm(playerCreationData: PlayerCreationData): Promise<any> {
    return apiPostData('/player-public/create-account', playerCreationData);
  }
}

export const registerHelper = new RegisterHelper();
