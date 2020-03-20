/**
 *
 * Taken from 'get-system=settings' API endpoint
 *
 * apiCode - shortName
 * 1 - ZWC
 * 2 - PDK
 * 2a - DWJ
 * 2b - 2Z3
 * 3 - TRJ
 * 4 - CZW
 * 5 - PIA
 * m2 - DBL
 * m3 - TPL
 * m5 - KWN
 * m6 - SKT
 * m7 - SPT
 * m2-2a - DBL-DWJ
 * m3-2a - TPL-DWJ
 * m5-2a - KWN-DWJ
 * m6-2a - SKT-DWJ
 * m2-2a - SPT-DWJ
 * m2-3 - DBL-TRJ
 * m3-3 - TPL-TRJ
 * m5-3 - KWN-TRJ
 * m6-3 - SKT-TRJ
 * m7-3 - SPT-TRJ
 */

export const supportedBetTypesByApiCode = [
  '1',
  '2',
  '2a',
  '3',
  '4',
  'm2-2a',
  'm3',
  'm3-2a',
  'm5',
  'm7'
];
export const disabledUnusedHorsesApiCodes = ['1', '2'];
