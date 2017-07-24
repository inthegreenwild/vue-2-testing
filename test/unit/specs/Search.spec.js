import Vue from 'vue';
import Search from '@/components/Search';

describe('Search.vue', () => {
  let Constructor;
  let vm;

  afterEach(() => {
    /* destroy our Vue instance after each test */
    vm.$destroy();
  });

  describe('Methods', () => {
    describe('GetDataForCity', () => {
    /* we'll use this REVEX pattern for our jasmine ajax stubs */
      const REGEX = /https:\/\/api\.teleport\.org.+/;

      /* create a new Vue instance and install jasmine ajax before each test */
      beforeEach(() => {
        Constructor = Vue.extend(Search);
        vm = new Constructor().$mount();
        jasmine.Ajax.install();
      });

      /* uninstall jasmine ajax after each test */
      afterEach(() => {
        jasmine.Ajax.uninstall();
      });

      it('Should build a query', () => {
        const city = 'chicago';
        /* stub any xhr request matching our regex and
          return immediately with the given resonse text */
        jasmine.Ajax.stubRequest(REGEX).andReturn({
          responseText: {},
        });

        /* spy on our buildQuery method */
        spyOn(vm, 'buildQuery').and.callThrough();

        /* see note below this snippet on jasmine promises */
        return vm.getDataForCity(city).then(() => {
          expect(vm.buildQuery).toHaveBeenCalledWith(city);
        });
      });

      it('should call the teleport api', () => {
        const city = 'chicago';
        const URL = 'https://api.teleport.org/api/urban_areas/slug:chicago/scores/';
        jasmine.Ajax.stubRequest(REGEX).andReturn({
          responseText: {},
        });

        return vm.getDataForCity(city).then(() => {
          /* jasmine ajax lets us grab the most recent call and see its
            properties such as url, headers, etc */
          expect(jasmine.Ajax.requests.mostRecent().url).toBe(URL);
        });
      });

      it('should emit the update-stats method if the api call is successful', () => {
        const city = 'chicago';

        /* add test data to our stubbed xhr request */
        const data = { foo: 'bar' };
        jasmine.Ajax.stubRequest(REGEX).andReturn({
          responseText: data,
        });

        /* spy on Vue's native $emit method */
        spyOn(vm, '$emit');

        return vm.getDataForCity(city).then(() => {
          /* check that $emit was called with the proper event and params */
          expect(vm.$emit).toHaveBeenCalledWith('update-stats', { city, data });
        });
      });

      it('should log an error on a failed api call', () => {
        const city = 'chicago';

        /* In order to make our stub send a rejected promise we can use andCallFunction */
        jasmine.Ajax.stubRequest(REGEX).andCallFunction(Promise.reject);

        /* set our searchTerm for our no-results method */
        vm.searchTerm = city;

        spyOn(vm, '$emit');

        return vm.getDataForCity(city).then(() => {
          /* check that $emit was called with the proper event.
            NOTE: even when sending a rejected promise back we still use
            then for jasmine-promises */
          expect(vm.$emit).toHaveBeenCalledWith('no-results', city);
        });
      });
    });
  });
});
