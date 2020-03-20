import { permutator } from 'helpers/permutator';
import { cleanup } from 'react-testing-library';

afterEach(cleanup);

describe('The permutator function', () => {
  it('should return empty array', () => {
    const sampleObject: number[][] = [];
    expect(permutator(sampleObject)).toEqual([]);
  });
  it('should return empty array', () => {
    const sampleObject = [[]];
    expect(permutator(sampleObject)).toEqual([]);
  });
  it('should return 1 combination', () => {
    const sampleObject = [[1]];
    expect(permutator(sampleObject)).toEqual([1]);
  });
  it('should return 2 combinations, omitting repetitions', () => {
    const sampleObject = [[1, 2]];
    expect(permutator(sampleObject)).toEqual([1, 2]);
  });
  it('should return 2 combinations, omitting repetitions', () => {
    const sampleObject = [[1, 2], [1, 2]];
    expect(permutator(sampleObject)).toEqual([[1, 2], [2, 1]]);
  });

  it('should return 1 combination', () => {
    const sampleObject = [[1, 2], [1]];
    expect(permutator(sampleObject)).toEqual([[2, 1]]);
  });

  it('should return empty array', () => {
    const sampleObject = [[], [1]];
    expect(permutator(sampleObject)).toEqual([]);
  });

  it('should return empty array', () => {
    const sampleObject = [[3], [1, 3], [1, 3]];
    expect(permutator(sampleObject)).toEqual([]);
  });
  it('should return 6 combinations', () => {
    const sampleObject = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
    expect(permutator(sampleObject)).toEqual([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1]
    ]);
  });
});
