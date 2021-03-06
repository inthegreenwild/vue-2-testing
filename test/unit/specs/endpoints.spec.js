import endpoints from '@/mixins/endpoints';

describe('endpoints.js', () => {
  describe('methods', () => {
    const methods = endpoints.methods;

    describe('The buildTeleportURL method', () => {
      it('should build a proper URL using a city', () => {
        const city = 'chicago';
        const URL = 'https://api.teleport.org/api/urban_areas/slug:chicago/scores/';
        const expectation = methods.buildTeleportURL(city);

        expect(expectation).toBe(URL);
      });
    });
  });
});
