import { DateHelper } from 'helpers/date.helper';
import { cleanup } from 'react-testing-library';

afterEach(cleanup);

const samplePesel = {
  pesel18thCentury: '75910105374',
  pesel19thCentury: '42050909953',
  pesel2000: '00323005324',
  pesel20thCentury: '17312035734',
  pesel21stCentury: '00440413529'
};

describe('Date helper', () => {
  describe('getDateFromPesel', () => {
    it('Date from 18th century PESEL', () => {
      expect(DateHelper.getDateFromPesel(samplePesel.pesel18thCentury)).toEqual(
        {
          peselDay: 1,
          peselMonth: 11,
          peselYear: 1875
        }
      );
    });
    it('Date from 19th century PESEL', () => {
      expect(DateHelper.getDateFromPesel(samplePesel.pesel19thCentury)).toEqual(
        {
          peselDay: 9,
          peselMonth: 5,
          peselYear: 1942
        }
      );
    });
    it('Date from 2000 PESEL', () => {
      expect(DateHelper.getDateFromPesel(samplePesel.pesel2000)).toEqual({
        peselDay: 30,
        peselMonth: 12,
        peselYear: 2000
      });
    });
    it('Date from 20th century PESEL', () => {
      expect(DateHelper.getDateFromPesel(samplePesel.pesel20thCentury)).toEqual(
        {
          peselDay: 20,
          peselMonth: 11,
          peselYear: 2017
        }
      );
    });
    it('Date from 21th century PESEL', () => {
      expect(DateHelper.getDateFromPesel(samplePesel.pesel21stCentury)).toEqual(
        {
          peselDay: 4,
          peselMonth: 4,
          peselYear: 2100
        }
      );
    });
  });
});
