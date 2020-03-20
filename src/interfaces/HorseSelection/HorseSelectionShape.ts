export class HorseSelectionShape {
  selectedHorses: number[] = []; // array of horse numbers selected manually
  isWallOn: boolean = false; // wall - selected all horses in a row
  isBoxOn: boolean = false; // box - selected horses in this row are duplicated to the rows below
}
