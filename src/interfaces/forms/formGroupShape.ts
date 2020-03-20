import { PlayerOptionalConsentsData } from 'interfaces/player/player';

export interface formGroupShape {
  errors?: any;
  submitCount?: number;
}

export interface editPlayerDeclarationsFormGroupShape
  extends formGroupShape,
    PlayerOptionalConsentsData {}
