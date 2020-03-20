import { replaceByParams } from 'helpers/utils';
import { AxiosError } from 'axios';

type Indexed<T> = {
  [key: string]: T;
};

const systemMessages: Indexed<Indexed<string>> = {
  playerFundsSource: {},
  financialOperationsFilterSortingFields: {
    OPERATION_NUMBER: 'Numer',
    AMOUNT: 'Kwota',
    TYPE: 'Rodzaj',
    STATUS: 'Status',
    CREATION_TIMESTAMP: 'Data utworzenia',
    PENDING_TIMESTAMP: 'Data rozpoczęcia realizacji',
    ACCEPT_REJECT_CANCEL_TIMESTAMP: 'Data zakończenia'
  },
  slipsFilterSortingFields: {
    EKONIK_SLIP_NUMBER: 'Numer',
    SLIP_STATUS: 'Status',
    TRACK_CODE: 'Tor',
    RACE_DAY_DATE: 'Dzień',
    SLIP_AMOUNT: 'Kwota kuponu',
    WIN_AMOUNT: 'Kwota wygranej',
    TAX_AMOUNT: 'Kwota podatku',
    RETURN_AMOUNT: 'Kwota zwrotu',
    CREATION_TIMESTAMP: 'Data utworzenia'
  },
  financialOperationTypes: {
    PAYMENT: 'Przyjęcie kuponu',
    CANCELLATION: 'Anulowanie kuponu',
    WIN_AND_OR_RETURN: 'Wygrana / Zwrot',
    TOP_UP: 'Wpłata środków',
    WITHDRAWAL: 'Wypłata środków',
    UNSUCCESSFULL_WITHDRAWAL_RETURN: 'Błąd wypłaty środków',
    BALANCE_CORRECTION: 'Korekta salda'
  },
  sortingOrders: {
    ASC: 'Rosnąco',
    DESC: 'Malejąco'
  },
  playerAccountStatuses: {
    CREATED: 'Utworzone',
    CONFIRMED: 'Potwierdzone',
    ACTIVE: 'Aktywne',
    ACTIVE_INVALID_LOGIN_LOCK: 'Konto zablokowane, błędne logowania',
    ACTIVE_NO_POLITICAL_VIP_FORM: 'Konto aktywne, brak deklaracji PEP',
    LOCKED: 'Zablokowane',
    SELF_EXCLUDED: 'Wykluczone',
    CLOSING: 'W trakcie zamykania',
    CLOSED: 'Zamknięte'
  },
  playerAccountLockCauses: {
    OTHER: 'Inna %s',
    FRAUD_SUSPICION: 'Podejrzenie oszustwa'
  },
  financialOperationStatuses: {
    CREATED: 'Utworzona',
    PENDING: 'Rozpoczęta',
    ACCEPTED: 'Zaakceptowana',
    REJECTED: 'Odrzucona',
    CANCELLED: 'Anulowana',
    CLOSED_MANUALLY: 'Zakończona przez operatora'
  },
  raceStatuses: {
    UNDER_CONSTRUCTION: 'W trakcie tworzenia',
    ACTIVE: 'Akrywny',
    CANCELLED: 'Skasowany',
    STARTED: 'Rozpoczęty',
    RESULT_CONFIRMED: 'Potwierdzony wynik'
  },
  slipStatuses: {
    CREATED: 'Utworzony',
    PAYED: 'Rozliczony',
    CANCELLED: 'Anulowany'
  },

  errors: {
    INTERNAL_SERVER_ERROR: 'Błąd techniczny (%s), skontaktuj się z infolinią',
    SERVLET_RESOURCE_NOT_FOUND:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    SERVLET_REQUEST_METHOD_NOT_ALLOWED:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    SERVLET_REQUEST_MEDIA_TYPE_NOT_SUPPORTED:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    SERVLET_MESSAGE_NOT_READABLE:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    SERVLET_MISSING_MULTIPART_REQUEST_PART:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    SERVLET_RESPONSE_MEDIA_TYPE_NOT_ACCEPTABLE:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    SERVLET_MESSAGE_NOT_WRITABLE:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    SERVLET_MISSING_PATH_PARAMETER:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    SERVLET_MISSING_URL_PARAMETER:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    SERVLET_PARAMETER_CONVERTER_NOT_FOUND:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    SERVLET_PARAMETER_TYPE_MISMATCH:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    SERVLET_PARAMETER_NOT_VALID:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    SERVLET_REQUEST_BINDING_ERROR:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    SERVLET_PARAMETERS_BINDING_ERROR:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    SERVLET_ASYNC_REQUEST_TIMED_OUT:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    SECURITY_UNAUTHORIZED: 'Nie jesteś zalogowany',
    SECURITY_INVALID_LOGIN_OR_PASSWORD: 'Błędny email lub hasło',
    SECURITY_INVALID_ACCOUNT_STATUS:
      'Błędny status konta, skontaktuj się z infolinią',
    SECURITY_INSUFFICIENT_RIGHTS: 'Brak uprawnień do wykonania akcji',
    SECURITY_SESSION_EXPIRED: 'Sesja wygasła',
    SECURITY_INTERNAL_ERROR: 'Błąd techniczny (%s), skontaktuj się z infolinią',
    FORM_VALIDATION: 'Błąd walidacji formularza',
    INVALID_PARAMETERS: 'Błąd techniczny (%s), skontaktuj się z infolinią',
    PLAYER_EMAIL_NOT_CONFIRMED:
      'Nie potwierdzono adresu email przypisanego do konta',
    PLAYER_TEMPORARILY_LOCKED:
      'Konto tymczasowo zablokowane ze względu na zbyt dużą ilość błędnych logowań',
    PLAYER_LOCKED: 'Konto zostało zablokowane przez administratora systemu',
    PLAYER_SELF_EXCLUDED: 'Konto zablokowane ze względu na samowykluczenie',
    PLAYER_ACCOUNT_WRONG_STATE:
      'Błędny status konta, skontaktuj się z infolinią',
    PLAYER_NO_PEP_FORM:
      'Konto zablokowane - brak deklaracji osoby zajmującej eksponowane stanowisko polityczne',
    IDENTT_GET_ACCESS_TOKEN_FAILED:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    MAIL_ALREADY_TAKEN: 'Podany adres email jest już wykorzystywany w systemie',
    PESEL_ALREADY_TAKEN:
      'Podany numer PESEL jest już wykorzystywany w systemie',
    ID_DOCUMENT_NUMBER_ALREADY_TAKEN:
      'Podany numer dokumentu tożsamości jest już wykorzystywany w systemie',
    BANK_ACCOUNT_NUMBER_ALREADY_TAKEN:
      'Podany numer konta bankowego jest już wykorzystywany w systemie',
    WRONG_PLAYER_AGE: 'Serwis jest dostępny tylko dla osób pełnoletnich',
    INVALID_CURRENT_PASSWORD: 'Podano błędne bieżące hasło',
    INVALID_PASSWORD: 'Podano błędne hasło',
    CONFIRMATION_TOKEN_EXPIRED:
      'Upłynął termin ważności tokenu. Wygeneruj nowy',
    INVALID_CONFIRMATION_TOKEN: 'Błędny token',
    CONFIRMATION_TOKEN_ALREADY_USED:
      'Token był już wykorzystany. Wygeneruj nowy  ',
    INSUFFICIENT_FUNDS: 'Brak środków do zawarcia zakładu',
    INVALID_FINANCIAL_OPERATION_STATE_CHANGE:
      'Operacja finansowa została już rozpoczęta i nie może zostać odwołana',
    CHANGE_BALANCE_LIMIT_1D_FROZEN:
      'Nie można przyjąć zlecania zmiany limitu - poprzednie zlecenie w trakcie realizacji',
    CHANGE_BALANCE_LIMIT_1M_FROZEN:
      'Nie można przyjąć zlecania zmiany limitu - poprzednie zlecenie w trakcie realizacji',
    CHANGE_TIME_LIMIT_1D_FROZEN:
      'Nie można przyjąć zlecania zmiany limitu - poprzednie zlecenie w trakcie realizacji',
    CHANGE_TIME_LIMIT_1M_FROZEN:
      'Nie można przyjąć zlecania zmiany limitu - poprzednie zlecenie w trakcie realizacji',
    BALANCE_LIMIT_1D_EXCEEDED:
      'Nie można przyjąć zakładu - przekroczono dzienny limit kwoty na zakłady',
    BALANCE_LIMIT_1M_EXCEEDED:
      'Nie można przyjąć zakładu - przekroczono miesięczny limit kwoty na zakłady',
    TIME_LIMIT_1D_EXCEEDED:
      'Nie można przyjąć zakładu - przekroczono dzienny limit czasu użytkowania serwisu',
    TIME_LIMIT_1M_EXCEEDED:
      'Nie można przyjąć zakładu - przekroczono miesięczny limit czasu użytkowania serwisu',
    INVALID_SLIP_EMPTY: 'Błąd techniczny (%s), skontaktuj się z infolinią',
    INVALID_SLIP_NO_BETS: 'Błąd techniczny (%s), skontaktuj się z infolinią',
    INVALID_SLIP_AMOUNT: 'Błąd techniczny (%s), skontaktuj się z infolinią',
    INVALID_SLIP_NUMBER: 'Błąd techniczny (%s), skontaktuj się z infolinią',
    BET_TYPE_NOT_SUPPORTED: 'Błąd techniczny (%s), skontaktuj się z infolinią',
    BETTING_ON_WITHDRAWN_HORSE: 'Koń numer %d w gonitwie %d został wycofany',
    INVALID_BET_INVALID_COMBINATIONS_COUNT:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    INVALID_BET_INVALID_QUANTITY:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    INVALID_BET_EMPTY_RACE: 'Błąd techniczny (%s), skontaktuj się z infolinią',
    INVALID_BET_INVALID_RACE_DAY:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    INVALID_BET_INVALID_RACE_NUMBER:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    INVALID_BET_INVALID_HORSE_NUMBER:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    INVALID_COMBINATIONS_COUNT:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    MALFORMED_BET_EMPTY_SELECTION:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    MALFORMED_BET_ILLEGAL_SELECTIONS_NUMBER:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    MALFORMED_BET_BOX_SYSTEM_NOT_ALLOWED:
      'System box nie jest dozwolony dla bieżącego typu zakładu',
    MALFORMED_BET_SUBSTITUTE_HORSE_NOT_ALLOWED:
      'Koń rezerwowy nie jest dozwolony dla bieżącego typu zakładu',
    MALFORMED_BET_INSUFFICIENT_HORSES_NUMBER_IN_BOX_SYSTEM:
      'Wybrano zbyt mało koni w systemie box',
    MALFORMED_SLIP_INVALID_BETS_NUMBER:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    MALFORMED_BET_EMPTY_SINGLE_RACE_BET:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    MALFORMED_BET_EMPTY_SINGLE_RACE_BET_CONTENT:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    MALFORMED_BET_DIFFERENT_RACE_DAYS:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    MALFORMED_BET_DIFFERENT_BET_TYPES:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    MALFORMED_SLIP_SINGLE_AND_MULTI_RACE_BETS_MIXED:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    MALFORMED_SLIP_BETS_ON_DIFFERENT_RACES:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    MALFORMED_SLIP_NESTED_MULTI_RACE_BET_TYPE:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    MALFORMED_SLIP_DIFFERENT_BET_TYPES:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    MAX_SLIP_AMOUNT_EXCEEDED_EXCEPTION:
      'Przekroczono dopuszczalną wartość kuponu, maksymalna wartość kuponu: %d',
    NO_SUCH_POOL_NO_SUCH_ACTIVE_RACE_DAY: 'Wybrano błędny dzień wyścigowy',
    NO_SUCH_POOL_NO_SUCH_RACE: 'Wybrano błędną gonitwę',
    NO_SUCH_POOL_BET_TYPE_NOT_ALLOWED:
      'Wybrany typ zakładu nie jest dostępny dla danej gonitwy',
    POOL_CLOSED_RACE_STARTED: 'Gonitwa %d została już wystartowana',
    POOL_CLOSED_RACE_CANCELLED: 'Gonitwa %d została odwołana',
    POOL_CLOSED_RACE_NOT_ACTIVE: 'Gonitwa %d nie jest aktywna',
    SELECTED_HORSES_NOT_USED_IN_ANY_COMBINATION:
      'Zaznaczono konie nie wchodzące w skład żadnej kombinacji',
    SLIP_CANCELLATION_SLIP_ALREADY_CANCELLED: 'Kupon został już anulowany',
    SLIP_CANCELLATION_NO_SLIP_CREATION_EVENT:
      'Błąd techniczny (%s), skontaktuj się z infolinią',
    SLIP_CANCELLATION_RACE_ALREADY_STARTED:
      'Niestety gonitwa się rozpoczęła. Nie strać kolejnej szansy obstaw następną gonitwę już teraz.',
    SLIP_CANCELLATION_RACE_RESULT_ALREADY_SET:
      'Nie można anulować kuponu - gonitwa została już rozliczona',
    SLIP_CANCELLATION_CANCELLATION_AFTER_ALLOWED_PERIOD:
      'Upłunął czas, w którym można anulować kupon',
    NO_SUCH_SLIP: 'Brak kuponu o podanym identyfikatorze',
    RACE_DAY_PREDICTION_INVALID_RACE_DAY:
      'Błąd techniczny (%s), skontaktuj się z infolinią'
  }
};

class SystemMessagesHelper {
  static messages = systemMessages;

  static systemMessageKeyUsingParameters = ['FORM_VALIDATION'];

  getSystemMessage = (
    context: keyof typeof systemMessages,
    systemMessageKey: string,
    params?: Array<string>
  ) => {
    if (
      systemMessages[context] &&
      systemMessageKey in systemMessages[context]
    ) {
      return replaceByParams(systemMessages[context][systemMessageKey], params);
    } else {
      return systemMessageKey;
    }
  };

  /**
   * Takes AxiosError and checks if there is system message for specific errorCode
   * @param error       AxiosError
   * @param param       Name of property to be used as dynamic parameter
   * @param fallbackMsg Optional custom message when system message not found
   */
  getSystemMessageByAxiosError = (
    error: AxiosError,
    param: string = 'errorUniqueId',
    fallbackMsg: string = 'Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się z nami'
  ) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.errorCode
    ) {
      const systemMessageKey = error.response.data.errorCode;

      const messagesFromParameters = SystemMessagesHelper.systemMessageKeyUsingParameters.includes(
        systemMessageKey
      );

      if (
        messagesFromParameters &&
        error.response.data.parameters &&
        Object.keys(error.response.data.parameters).length
      ) {
        const parameters = error.response.data.parameters;

        return Object.keys(parameters)
          .map(key => parameters[key])
          .join('\n');
      }

      const systemMessageParams: Array<any> =
        param && error.response.data[param] ? [error.response.data[param]] : [];

      const systemMessage: string = this.getSystemMessage(
        'errors',
        systemMessageKey,
        systemMessageParams
      );

      return systemMessage !== systemMessageKey ? systemMessage : fallbackMsg;
    } else {
      return fallbackMsg;
    }
  };
}

export const systemMessagesHelper = new SystemMessagesHelper();
