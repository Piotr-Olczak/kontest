export const APP_URLS = {
  settings: '/ustawienia',
  deposit: '/ustawienia/depozyt',
  withdraw: '/ustawienia/wyplata',
  transactions: '/ustawienia/transakcje',
  userSettings: '/ustawienia/ustawienia-konta',
  responsibleGame: '/ustawienia/odpowiedzialna-gra',
  contact: '/ustawienia/kanaly-kontaktu',
  userVerification: '/ustawienia/weryfikacja-konta',
  register: '/rejestracja',
  registerConfirmation: '/potwierdzenie-rejestracji',
  login: '/zaloguj',
  passwordReminder: '/przypomnij-haslo',
  confirmEmail: '/potwierdz-email',
  unlockAccount: '/odblokuj-konto',
  changePassword: '/zmien-haslo',
  playIntructions: '/jak-grac',
  racesList: '/gonitwy',
  singleRacesList: '/gonitwy/jednogonitwowe/',
  singleRaceDay: '/gonitwy/jednogonitwowe/:dayId',
  singleRaceBet: '/gonitwy/jednogonitwowe/:raceDayId/:raceId',
  multiRacesList: '/gonitwy/wielogonitwowe/',
  multiRaceBet: '/gonitwy/wielogonitwowe/:raceDayId/:multiRaceBetId',
  userBets: '/twoje-zaklady',
  payoutForecasts: '/prognozy-wyplat',
  videoFeed: '/ogladaj-na-zywo',
  program: '/program-gonitw',
  get homepage() {
    return this.racesList;
  }
};

export const CONTENT_URLS = {
  terms: 'https://www.trafonline.pl/regulaminy',
  playerLimits: 'https://www.trafonline.pl/odpowiedzialna-gra',
  privacyRegulations: 'https://www.trafonline.pl/polityka-prywatnosci',
  playIntructions: 'https://www.trafonline.pl/jak-grac',
  responsibleGame: 'https://www.fundacjalotto.pl/odpowiedzialna-gra/',
  parentalControl: 'https://www.trafonline.pl/kontrola-rodzicielska',
  contact: 'https://www.trafonline.pl/kontakt',
  raceProgram: 'https://www.trafonline.pl/dla-gracza',
  termsTotalizator:
    'https://www.trafonline.pl/__data/assets/pdf_file/0026/8477/Regulamin_2018_TWK.pdf',
  home: 'https://trafonline.pl/'
};
