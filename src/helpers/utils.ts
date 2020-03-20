export function generateArray<T = number>(
  numOfElements: number,
  elementToFill: any = 1
): T[] {
  return new Array(numOfElements).fill(elementToFill);
}

export const hasOnlyArrayElements = (arr: Array<any>): boolean =>
  Array.isArray(arr) && arr.every(hasOnlyArrayElements);

export function formatPrice(
  priceValue: number,
  currency: string = 'PLN',
  currencyDisplay: string = 'symbol'
): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency,
    currencyDisplay
  }).format(priceValue);
}

export function formatStake(stakeValue: number): string {
  return stakeValue.toFixed(2);
}

export function formatBetNumber(stakeValue: string): string {
  return stakeValue.replace(/(.{4})/g, '$1 ');
}

export function toSeconds(date: number, from: 'hours' | 'minutes'): number {
  if (from === 'hours') return date * 60 * 60;
  return date * 60;
}

/**
 * Replaces %s by provided params
 * @param inputString string where repleace %s with corresponding param
 * @param params array of params to put in place of %s in source string
 */
export const replaceByParams = (
  inputString: string,
  params: Array<any> = []
): string =>
  params.reduce(
    (previousValue, currentValue) => previousValue.replace(/%s/, currentValue),
    inputString
  );

export const findElementWithMaximumValue = (
  arr: Array<any>,
  elementPropertyName: string
): any => {
  return arr.reduce(function(prev, current) {
    return prev[elementPropertyName] > current[elementPropertyName]
      ? prev
      : current;
  });
};
