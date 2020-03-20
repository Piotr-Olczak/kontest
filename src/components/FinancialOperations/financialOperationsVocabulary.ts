export const financialOperationDirections = {
  IN: 'in',
  OUT: 'out',
  NEUTRAL: 'neutral'
};

export const financialOperationsVocabulary = {
  status: {
    CREATED: 'Utworzona',
    PENDING: 'Rozpoczęta',
    ACCEPTED: 'Zaakceptowana',
    REJECTED: 'Odrzucona',
    CANCELLED: 'Anulowana',
    CLOSED_MANUALLY: 'Zakończona przez operatora'
  },
  type: {
    PAYMENT: {
      text: 'Przyjęcie kuponu',
      direction: financialOperationDirections.OUT
    },
    CANCELLATION: {
      text: 'Anulowanie kuponu',
      direction: financialOperationDirections.IN
    },
    WIN_AND_OR_RETURN: {
      text: 'Wygrana / Zwrot',
      direction: financialOperationDirections.IN
    },
    TOP_UP: {
      text: 'Wpłata środków',
      direction: financialOperationDirections.IN
    },
    WITHDRAWAL: {
      text: 'Wypłata środków',
      direction: financialOperationDirections.OUT
    },
    UNSUCCESSFULL_WITHDRAWAL_RETURN: {
      text: 'Błąd wypłaty środków',
      direction: financialOperationDirections.IN
    },
    BALANCE_CORRECTION: {
      text: 'Korekta salda',
      direction: financialOperationDirections.IN
    }
  }
};
