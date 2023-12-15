import axios from 'axios';
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from './public-holidays.service';
import { PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES } from './../config'

describe('getListOfPublicHolidays', () => {
  it('should return a list of public holidays', async () => {
    const mockData = [
      { name: 'New Year', date: '2023-01-01', localName: 'Neujahr' },
    ];

    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });

    const year = 2023;
    const country = 'DE';
    const holidays = await getListOfPublicHolidays(year, country);
    expect(axios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`);
    expect(holidays).toEqual(mockData.map(holiday => ({
      name: holiday.name,
      localName: holiday.localName,
      date: holiday.date,
    })));
    
  });

  describe('checkIfTodayIsPublicHoliday', () => {

    const country = SUPPORTED_COUNTRIES[2];

    it('should return true if today is a public holiday', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ status: 200 });
      const isHoliday = await checkIfTodayIsPublicHoliday(country);
      expect(axios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`);
      expect(isHoliday).toBe(true);
    });
  
    it('should return false if today is not a public holiday', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ status: 204 });
  
      const isHoliday = await checkIfTodayIsPublicHoliday(country);
      expect(isHoliday).toBe(false);
    });
  
    it('should return false on API error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('API Error'));
  
      const isHoliday = await checkIfTodayIsPublicHoliday(country);
      expect(isHoliday).toBe(false);
    });
    
  });

  describe('getNextPublicHolidays', () => {
    const mockData = [
      { name: 'Labor Day', date: '2023-05-01', localName: 'Tag der Arbeit' },
    ];
  
    it('should return next public holidays', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });
  
      const country = 'DE';
      const holidays = await getNextPublicHolidays(country);
      expect(axios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`);
      expect(holidays).toEqual(mockData.map(holiday => ({
        name: holiday.name,
        localName: holiday.localName,
        date: holiday.date,
      })));
    });
  
    it('should return empty array on API error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('API Error'));
  
      const country = 'DE';
      const holidays = await getNextPublicHolidays(country);
      expect(holidays).toEqual([]);
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Public Holidays Service Integration Tests', () => {
    it('should fetch list of public holidays for a valid country', async () => {
      const year = new Date().getFullYear();
      const country = 'FR';
      const holidays = await getListOfPublicHolidays(year, country);
  
      expect(holidays.length).toBeGreaterThan(0);
      holidays.forEach(holiday => {
        expect(holiday).toHaveProperty('name');
        expect(holiday).toHaveProperty('date');
        expect(holiday).toHaveProperty('localName');
      });
    });

    it('should accurately determine if today is a public holiday', async () => {
      const country = 'DE';
      const isHoliday = await checkIfTodayIsPublicHoliday(country);
      expect(typeof isHoliday).toBe('boolean');
    });
  
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
});
