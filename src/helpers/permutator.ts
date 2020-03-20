// Sorts elements in the arrays that are children of the the given array
const sortElements = (arr: Array<Array<number>>) => {
  return arr.map((item: Array<number>) =>
    item.sort((a: number, b: number) => a - b)
  );
};

// This reduces the given Array of Arrays by the duplicated arrays
const removeDuplicates = (arr: Array<Array<number>>) => {
  return Array.from(
    // @ts-ignore
    new Set(arr.map(JSON.stringify)),
    JSON.parse
  );
};

export const permutator = (
  selectedArr: number[][],
  combine: boolean
): number[][] => {
  // Pairs items from the rows
  // @ts-ignore
  const pair = (firstRow, nextRow) =>
    // @ts-ignore
    [].concat(
      // @ts-ignore
      ...firstRow.map(item =>
        // @ts-ignore
        nextRow.map(nextRowItem => [].concat(item, nextRowItem))
      )
    );

  // Makes the Cartesian Product with repetitions (// @ts-ignore needs to be in every line)
  // @ts-ignore
  const cartesian = (firstRow, nextRow, ...restRows) =>
    // @ts-ignore
    nextRow ? cartesian(pair(firstRow, nextRow), ...restRows) : firstRow;

  // @ts-ignore
  const combinations = cartesian(...selectedArr); // count all combinations

  const filteredCombinations =
    combinations &&
    combinations.filter((row: Array<number> | number) => {
      //remove imposible ones (repetitions)
      if (typeof row === 'number') {
        //for single plain array (ZWC type of bet)
        return row;
      } else {
        return new Set(row).size === row.length;
      }
    });

  if (combine) {
    // sort elements in combinations
    const combinationsItemsSorted = sortElements(filteredCombinations);

    // remove duplicated combinations
    const combinationsItemsReduced = removeDuplicates(combinationsItemsSorted);

    return combinationsItemsReduced || [];
  }

  return filteredCombinations || [];
};
