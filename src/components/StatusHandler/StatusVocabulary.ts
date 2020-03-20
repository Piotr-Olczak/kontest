import { StatusVocabularyShape } from '../../interfaces/interfaces';

const StatusVocabulary: StatusVocabularyShape = {
  slipStatuses: {
    CREATED: {
      text: 'Twój zakład został przyjęty!',
      type: 'SUCCESS'
    },
    PAYED: {
      text: 'Twój zakład został opłacony!',
      type: 'SUCCESS'
    },
    CANCELLED: {
      text: 'Twój zakład nie został przyjęty!',
      type: 'ERROR'
    }
  },
  raceStatuses: {
    UNDER_CONSTRUCTION: {
      text: 'Gonitwa jest w trakcie tworzenia(?)!',
      type: 'WARNING'
    },
    ACTIVE: {
      text: 'Gonitwa jest aktywna',
      type: 'SUCCESS'
    },
    CANCELLED: {
      text: 'Gonitwa została anulowana!',
      type: 'ERROR'
    },
    STARTED: {
      text: 'Twój zakład nie został przyjęty!',
      type: 'ERROR'
    },
    RESULT_CONFIRMED: {
      text: 'Wynik został potwierdzony!',
      type: 'SUCCESS'
    }
  },
  playerAccountStatuses: {
    CREATED: {
      text: 'Twoje konto zostało utworzone!',
      type: 'SUCCESS'
    },
    CONFIRMED: {
      text: 'Twoje konto zostało zatwierdzone!',
      type: 'SUCCESS'
    },
    ACTIVE: {
      text: 'Twoje konto jest juz aktywne!',
      type: 'SUCCESS'
    },
    ACTIVE_INVALID_LOGIN_LOCK: {
      text: 'Twoje konto zostało zawieszone!',
      type: 'WARNING'
    },
    LOCKED: {
      text: 'Twoje konto zostało zablokowane!',
      type: 'WARNING'
    },
    SELF_EXCLUDED: {
      text: 'Twoje konto zostało SELF_EXCLUDED!',
      type: 'WARNING'
    },
    CLOSING: {
      text: 'Twoje konto jest w trakciezamykania!',
      type: 'ERROR'
    },
    CLOSED: {
      text: 'Twoje konto zostało zamknięte!',
      type: 'WARNING'
    }
  },
  financialOperationStatuses: {
    CREATED: {
      text: 'SUKCES operacji finansowej!',
      type: 'SUCCESS'
    },
    PENDING: {
      text: 'Operacja finansowa zawieszona!',
      type: 'WARNING'
    },
    ACCEPTED: {
      text: 'Operacja finansowa zaakceptowana!',
      type: 'SUCCESS'
    },
    REJECTED: {
      text: 'Operacja finansowa odrzucona!',
      type: 'ERROR'
    },
    CANCELLED: {
      text: 'Operacja finansowa anulowana!',
      type: 'WARNING'
    }
  },
  apiStatuses: {
    CONNECTION_FAIL: {
      text: 'Błąd połączenia z API',
      type: 'ERROR'
    },
    SOMETHING_WENT_WRONG: {
      text: 'Coś poszło nie tak (błąd API)',
      type: 'ERROR'
    }
  }
};

export default StatusVocabulary;
