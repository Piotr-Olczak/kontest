/**
 * Takes amount in currency and converts it to 1/100 of the basic monetary unit.
 * @see: Why centums: https://en.wikipedia.org/wiki/Cent_(currency)
 * @param amount
 */
export const convertToCentums = (amount: number) => {
  return Math.round(amount * 100);
};

/**
 * Takes amount in centums (aimed to be output of convertToCentum) and converts it back to its one unit of currency representation.
 * We assume one centum is 1/100 of one unit of currency.
 */
export const converToBasicCurrencyUnit = (centums: number) => {
  return centums / 100;
};
