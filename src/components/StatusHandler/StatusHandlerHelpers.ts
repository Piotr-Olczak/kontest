export const getRandomProperty = function(obj: object) {
  let result: string = '';
  let count = 0;
  for (let prop in obj) if (Math.random() < 1 / ++count) result = prop;
  return result;
};
