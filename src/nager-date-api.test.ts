import axios from 'axios';

describe('Nager.Date API e2e Tests', () => {
  const BASE_URL = 'https://date.nager.at/Api/v2';

  describe('Get Public Holidays for the Current Year', () => {
    it('should fetch public holidays for a given country', async () => {
      const year = new Date().getFullYear();
      const countryCode = 'UA'; 
      const response = await axios.get(`${BASE_URL}/PublicHolidays/${year}/${countryCode}`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      response.data.forEach(holiday => {
        expect(holiday).toHaveProperty('date');
        expect(holiday).toHaveProperty('localName');
        expect(holiday).toHaveProperty('name');
      });
    });
  });

  describe('Get the Next Public Holidays Worldwide', () => {
    it('should fetch the next public holidays worldwide', async () => {
      const response = await axios.get(`${BASE_URL}/NextPublicHolidaysWorldwide`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      if (response.data.length > 0) {
        expect(response.data[0]).toHaveProperty('date');
        expect(response.data[0]).toHaveProperty('localName');
        expect(response.data[0]).toHaveProperty('name');
        expect(response.data[0]).toHaveProperty('countryCode');
      }
    });
  });
});
