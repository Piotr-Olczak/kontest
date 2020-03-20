import { FieldsHelper } from 'helpers/fields.helper';
import { cleanup } from 'react-testing-library';

afterEach(cleanup);

const samplePesels = {
  valid1: '74120800910',
  valid2: '42050909953',
  dumb: '44444444444',
  bad: '42050909952',
  empty: '',
  text1: 'sadaasdwe'
};

const sampleIdDocumentNumbers = {
  valid1: 'ARI775307',
  valid2: 'ASV577952',
  invalid: 'ASV123456',
  empty: '',
  allText: 'ASBASDCXZ',
  allNumbers: '123456789',
  tooLong: 'ARI7753079',
  tooShort: 'ARI7753',
  dumb: '444444444'
};

describe('Fields helper', () => {
  describe('Valid PESEL', () => {
    it('Is valid PESEL 1', () => {
      expect(FieldsHelper.isValidPesel(samplePesels.valid1)).toEqual(true);
    });
    it('Is valid PESEL 2', () => {
      expect(FieldsHelper.isValidPesel(samplePesels.valid2)).toEqual(true);
    });
    it('Is valid PESEL dumb 44444444444', () => {
      // looks bad but control sum is ok
      expect(FieldsHelper.isValidPesel(samplePesels.dumb)).toEqual(true);
    });
    it('Is not valid PESEL bad', () => {
      expect(FieldsHelper.isValidPesel(samplePesels.bad)).toEqual(false);
    });
    it('Is not valid PESEL empty', () => {
      expect(FieldsHelper.isValidPesel(samplePesels.empty)).toEqual(false);
    });
    it('Is not valid PESEL random text1', () => {
      expect(FieldsHelper.isValidPesel(samplePesels.text1)).toEqual(false);
    });
  });
  describe('Valid ID document number', () => {
    it('Is valid ID document number 1', () => {
      expect(
        FieldsHelper.isIdDocumentNumberValid(sampleIdDocumentNumbers.valid1)
      ).toEqual(true);
    });
    it('Is valid ID document number 2', () => {
      expect(
        FieldsHelper.isIdDocumentNumberValid(sampleIdDocumentNumbers.valid2)
      ).toEqual(true);
    });
    it('Is invalid ID document number', () => {
      expect(
        FieldsHelper.isIdDocumentNumberValid(sampleIdDocumentNumbers.invalid)
      ).toEqual(false);
    });
    it('Is invalid empty ID document number', () => {
      expect(
        FieldsHelper.isIdDocumentNumberValid(sampleIdDocumentNumbers.empty)
      ).toEqual(false);
    });
    it('Is invalid all text ID document number', () => {
      expect(
        FieldsHelper.isIdDocumentNumberValid(sampleIdDocumentNumbers.allText)
      ).toEqual(false);
    });
    it('Is invalid all numbers ID document number', () => {
      expect(
        FieldsHelper.isIdDocumentNumberValid(sampleIdDocumentNumbers.allNumbers)
      ).toEqual(false);
    });
    it('Is invalid too long ID document number', () => {
      expect(
        FieldsHelper.isIdDocumentNumberValid(sampleIdDocumentNumbers.tooLong)
      ).toEqual(false);
    });
    it('Is invalid too short ID document number', () => {
      expect(
        FieldsHelper.isIdDocumentNumberValid(sampleIdDocumentNumbers.tooShort)
      ).toEqual(false);
    });
    it('Is invalid dumb ID document number', () => {
      expect(
        FieldsHelper.isIdDocumentNumberValid(sampleIdDocumentNumbers.dumb)
      ).toEqual(false);
    });
  });
});
