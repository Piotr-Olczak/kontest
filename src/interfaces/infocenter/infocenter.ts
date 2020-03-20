import { RaceDayInfoShape } from 'contexts/singleBet.context';
import { RaceStatus } from 'interfaces/race/race';

export interface InfocenterRaceDay {
  multiRaceBetTypes: InfocenterMultiRaceBetType[];
  raceDay: RaceDayInfoShape;
  raceDayButtonLabel: string;
  raceDayNumber: number;
  races: InfocenterRace[];
  timestamp: number;
  uniqueId: string;
}

export interface InfocenterMultiRaceBetType
  extends InfocenterSingleRaceBetType {
  races: EkonikRace[];
  remainingCombinations: InfocenterMultiRaceBetTypeRemainingCombination[];
}

export interface EkonikRace {
  raceDay: RaceDayInfoShape;
  raceNumber: number;
}

interface InfocenterMultiRaceBetTypeRemainingCombination {
  ANY_COMBINATION: string;
  betsNumber: number;
  combination: string;
  combinationsNumber: number;
  poolFraction: number;
  poolShare: number;
  predictedWin: number;
}

export interface InfocenterRace {
  activeHorseNumbers: number[];
  horsesExtraInfo?: InfocenterHorseExtra[];
  horsesNumber: number;
  potList: number[];
  raceButtonLabel: string;
  raceExtraInfo?: InfocenterRaceExtra;
  raceNumber: number;
  raceResult: number[];
  raceStatus: RaceStatus;
  singleRaceBetTypes?: InfocenterSingleRaceBetType[];
  startDate: number;
  timestamp: number;
  uniqueId: string;
  withdrawedHorseNumbers: number[];
}

export interface InfocenterSingleRaceBetType {
  active: boolean;
  baseStake: number;
  betTypeApiCode: string;
  betTypeButtonLabel: string;
  guaranteedPool: number;
  paymentPredictionsList?: InfocenterBetTypeCombinationPayment[];
  pool: number;
  uniqueId: string;
  winningCombinationsPaymentList?: InfocenterBetTypeCombinationPayment[];
}

export interface InfocenterBetTypeCombinationPayment {
  combination: string;
  payment: number;
}

// where we store informations about race day from infocenter
export interface FullRaceDayInfosShape {
  [key: string]: FullRaceDayInfoShape;
}

export interface FullRaceDayInfoShape {
  loading: boolean;
  data?: InfocenterRaceDay;
}

export interface InfocenterHorseExtra {
  age: number;
  applicationState?: ApplicationStateShape;
  birthDate: number;
  boxNumber: number;
  breed?: HorseBreedShape;
  breeder: string;
  cancelApplication?: CancelApplicationShape;
  cancelApplicationReason: string;
  distance: string;
  fatherName: string;
  gender?: HorseGenderShape;
  horsePerformanceList?: InfocenterHorseExtraPerformance[];
  horseReducedVision: string;
  jockey: string;
  jockeyAmateur: boolean;
  jockeyCategory?: JockeyCategoryShape;
  loadInRace: number;
  mayGoGray: boolean;
  motherName: string;
  mothersFatherName: string;
  name: string;
  ointment?: HorseOintmentShape;
  ownershipGroup?: InfocenterHorseExtraOwnershipGroup;
  polishBreading: boolean;
  quartersTimes: string;
  raceGroup: HorseGroupType;
  raceProcessForHorse: string;
  reductionInWeight: number;
  resultPlace: number;
  startNumber: number;
  suffix?: HorseSuffixShape;
  time: string;
  trainer: string;
  withGlasses: boolean;
  withoutWhip: boolean;
  yearlyHorseCareerList?: InfocenterHorseExtraYearlyHorseCareer[];
}

interface InfocenterHorseExtraPerformance {
  additionalData: string;
  distance: string;
  distanceBetweenHorsesData: string;
  horseResult: string;
  raceDate: number;
  raceJackpotAmount: string;
  raceName: string;
  trackState: string;
  winningStyle: string;
}

interface InfocenterHorseExtraOwnershipGroup {
  colors: string;
  name: string;
  stable: string;
}

interface InfocenterHorseExtraYearlyHorseCareer {
  prize: string;
  result: string;
  runningInSeason: boolean;
  year: number;
}

interface InfocenterRaceExtra {
  additionalCategory?: RaceAdditionalCategoryShape;
  classificationRace: boolean;
  description: string;
  descriptionForBulletin: string;
  distance: number;
  distanceBetweenHorses: string;
  earlyApplication: boolean;
  handicap: boolean;
  horseAge: number;
  horseBreed?: HorseBreedShape;
  horseGender?: RaceHorseGenderShape;
  horseGroup: RaceHorseGroupType;
  monte: boolean;
  name: string;
  olderToo: boolean;
  onlyFromGroup: boolean;
  onlyNotRuned: boolean;
  onlyWithGender: boolean;
  orderNumber: number;
  orderNumberInSeason: number;
  pressTypes?: InfocenterRaceExtraPressPrediction[];
  quartersTimes: string;
  racePlannedType?: RacePlannedTypeShape;
  raceState?: RaceStateShape;
  raceTime: string;
  raceType?: RaceTypeShape;
  record: string;
  startTime: string;
  surface: string;
  temperature: string;
  totalWinAmount: number;
  totalWinAmountCurency: string;
  trackState?: TrackStateShape;
  trackStateDescription: string;
  trackStateNumber: string;
  trial: boolean;
  weather: string;
  winAmounts: number[];
  winningHorseStyle?: WinningHorseStyleShape;
}

interface InfocenterRaceExtraPressPrediction {
  journalist: string;
  pressName: string;
  proposal: string[];
  proposalWeight: number;
}

type ApplicationStateType =
  | 'APPLICATION'
  | 'REMOVE_BECAUSE_RACE_WAS_THROW_OFF'
  | 'REMOVED'
  | 'SAVE';

interface ApplicationStateShape {
  label: string;
  name: ApplicationStateType;
}

type HorseBreedType = 'KL' | 'OO' | 'POL' | 'XX';

interface HorseBreedShape {
  abbreviation: string;
  breedName: string;
  name: HorseBreedType;
}

type CancelApplicationType =
  | 'BY_OWNER'
  | 'BY_TECHNICAL_COMMISSION'
  | 'BY_VET'
  | 'BY_VET_ADDITIONA'
  | 'DISQUALIFICATION'
  | 'EPIDEMIOLOGICAL_REASONS'
  | 'FROM_EARLY_APPLICATIO'
  | 'NOT_FINISH_THE_RACE'
  | 'RELEASED_BY_STARTER'
  | 'RESERVE_HORS'
  | 'STAY_AT_START'
  | 'WITHOUT_FINANCIAL_PENALTY';

interface CancelApplicationShape {
  code: number;
  label: string;
  reasonForMany: string;
  reasonForMare: string;
  reasonForStallion: string;
  name: CancelApplicationType;
}

type HorseGenderType = 'GELDING' | 'MARE' | 'STALLION';

interface HorseGenderShape {
  abbreviation: string;
  genderName: string;
  name: HorseGenderType;
}

type JockeyCategoryType =
  | 'CANDIDATE'
  | 'DRIVER'
  | 'INTERN'
  | 'JOCKEY'
  | 'SENIOR_STUDENT'
  | 'STUDENT';

interface JockeyCategoryShape {
  code: string;
  label: string;
  name: JockeyCategoryType;
}

type HorseOintmentType =
  | 'CGN'
  | 'CKASZT'
  | 'GN'
  | 'GNSROK'
  | 'JGN'
  | 'JKASZT'
  | 'K'
  | 'KASZT'
  | 'S'
  | 'SKGN';

interface HorseOintmentShape {
  abbreviation: string;
  ointmentName: string;
  name: HorseOintmentType;
}

type HorseGroupType = 'A' | 'B' | 'I' | 'II' | 'III' | 'IV';

type HorseSuffixType =
  | 'KL_CZE'
  | 'KL_FR'
  | 'KL_LT'
  | 'KL_UA'
  | 'OO_AT'
  | 'OO_BE'
  | 'OO_BG'
  | 'OO_CH'
  | 'OO_DE'
  | 'OO_DK'
  | 'OO_ES'
  | 'OO_FI'
  | 'OO_FR'
  | 'OO_GB'
  | 'OO_HU'
  | 'OO_IL'
  | 'OO_IT'
  | 'OO_MA'
  | 'OO_NL'
  | 'OO_RU'
  | 'OO_SA'
  | 'OO_SE'
  | 'OO_SY'
  | 'OO_TN'
  | 'OO_US'
  | 'POL_FR'
  | 'XX_AUT'
  | 'XX_BEL'
  | 'XX_BUL'
  | 'XX_CAN'
  | 'XX_CZE'
  | 'XX_DEN'
  | 'XX_FR'
  | 'XX_GB'
  | 'XX_GER'
  | 'XX_GR'
  | 'XX_HUN'
  | 'XX_IRE'
  | 'XX_ISR'
  | 'XX_ITY'
  | 'XX_LTU'
  | 'XX_RUS'
  | 'XX_SPA'
  | 'XX_SRB'
  | 'XX_SVK'
  | 'XX_SWE'
  | 'XX_SWI'
  | 'XX_TUR'
  | 'XX_UKR'
  | 'XX_USA';

interface HorseSuffixShape {
  name: HorseSuffixType;
  horseBreed: HorseBreedShape;
  country: string;
  suffix: string;
}

type RaceAdditionalCategoryType = 'M' | 'P' | 'PASB' | 'PSB';

interface RaceAdditionalCategoryShape {
  categoryName: string;
  name: RaceAdditionalCategoryType;
}

type RaceHorseGenderType =
  | 'MARE'
  | 'STALLION'
  | 'STALLION_GELDING'
  | 'STALLION_MARE'
  | 'STALLION_MARE_GILDING';

interface RaceHorseGenderShape {
  name: RaceHorseGenderType;
  label: string;
}

type RaceHorseGroupType = 'A' | 'A_B' | 'B' | 'I' | 'II' | 'III' | 'IV';

type RacePlannedTypeType =
  | 'ADDITIONAL'
  | 'FROM_DIVISION'
  | 'PLANNED'
  | 'UNPLANNED';

interface RacePlannedTypeShape {
  name: RacePlannedTypeType;
  label: string;
}

type RaceStateType =
  | 'CLOSE'
  | 'CLOSE_FOR_APPLICATION'
  | 'COMPLETED'
  | 'COMPLETED_BY_JUDGE'
  | 'DOPING_TRIAL'
  | 'END_FIRST_PART_OF_EARLY_APPLICATION'
  | 'END_SECOND_PART_OF_EARLY_APPLICATION'
  | 'NEW'
  | 'OPEN_FOR_APPLICATION'
  | 'PLAYED'
  | 'READY_TO_START'
  | 'REOPEN_FOR_APPLICATION'
  | 'SETTLED'
  | 'SETTLED_BUT_DOPING_TRIAL'
  | 'START_NUMBER_ASSIGNED'
  | 'THROW_OFF'
  | 'TO_RE_SETTLED'
  | 'VERIFIED_BY_CLERK';

interface RaceStateShape {
  name: RaceStateType;
  label: string;
}

type RaceTypeType = 'KLU' | 'PLA' | 'PLO' | 'PRZ';
interface RaceTypeShape {
  abbreviation: string;
  minHorseNumberInGroupRace: number;
  minHorseNumberInNotGroupRace: number;
  typeName: string;
  name: RaceTypeType;
}

type TrackStateType =
  | 'FLEXIBLE'
  | 'HARD'
  | 'HEAVY'
  | 'HIGHLY_FLEXIBLE'
  | 'SOFT'
  | 'SOFT_FLEXIBLE';

interface TrackStateShape {
  name: TrackStateType;
  label: string;
}

type WinningHorseStyleType =
  | 'AFTER_FIGHT'
  | 'EASY'
  | 'FREELY'
  | 'IN_FIGHT'
  | 'SENT'
  | 'STRONGLY_SENT'
  | 'SURELY'
  | 'VERY_EASY';

interface WinningHorseStyleShape {
  name: WinningHorseStyleType;
  label: string;
}
export interface BetRaceInfocenterDataShape {
  isLoading: boolean;
  data?: InfocenterRace;
}
