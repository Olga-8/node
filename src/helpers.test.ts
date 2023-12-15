import { SUPPORTED_COUNTRIES } from './config';
import { shortenPublicHoliday, validateInput } from './helpers';

describe('Country and Year Validation', () => {
  const currentYear = new Date().getFullYear();

  it('should return true for a supported country', () => {
    expect(SUPPORTED_COUNTRIES.includes('GB')).toBe(true);
  });

  it('should return false for an unsupported country', () => {
    expect(SUPPORTED_COUNTRIES.includes('US')).toBe(false);
  });

  it('should return true for the current year', () => {
    expect(currentYear === new Date().getFullYear()).toBe(true);
  });

  it('should return false for a non-current year', () => {
    expect(2022 === new Date().getFullYear()).toBe(false);
  });
});

describe('shortenPublicHoliday', () => {
    it('should return a shortened public holiday object', () => {
      const mockHoliday = {
        name: 'Christmas',
        localName: 'Weihnachten',
        date: '2023-12-25',
        additionalField: 'extra_info',
        "countryCode": "string",
        "fixed": true,
        "global": true,
        "counties": [
        "DE"
        ],
        "launchYear": 0,
        "types": [
        "Public"
        ]
      };
  
      const expectedShortHoliday = {
        name: 'Christmas',
        localName: 'Weihnachten',
        date: '2023-12-25'
      };
  
      const result = shortenPublicHoliday(mockHoliday);
      expect(result).toEqual(expectedShortHoliday);
    });


describe('validateInput', () => {
  const currentYear = new Date().getFullYear();

  it('should throw an error for unsupported country', () => {
    expect(() => validateInput({ country: 'unsupported_country' })).toThrow('Country provided is not supported');
  });

  it('should throw an error for non-current year', () => {
    expect(() => validateInput({ year: 1999 })).toThrow('Year provided not the current');
  });

  it('should not throw for valid input', () => {
    expect(() => validateInput({ year: currentYear, country: SUPPORTED_COUNTRIES[0] })).not.toThrow();
  });
});
});
