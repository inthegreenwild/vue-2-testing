import Vue from 'vue';
import App from '@/App';
import { apiData } from '../fixtures/api-data.fixture';

describe('App.vue', () => {
  let Constructor;
  let vm;

  afterEach(() => {
    vm.$destroy();
  });

  describe('Methods', () => {
    describe('updateStats', () => {
      beforeEach(() => {
        Constructor = Vue.extend(App);
        vm = new Constructor().$mount();
      });

      it('set the current city and categories', () => {
        const data = {
          city: 'chicago',
          data: ['foo'],
        };

        vm.updateStats(data);
        expect(vm.currentCity).toBe(data.city);
        expect(vm.categories).toEqual(data.categories);
      });
    });

    describe('handleNoResults', () => {
      beforeEach(() => {
        Constructor = Vue.extend(App);
        vm = new Constructor().$mount();
      });

      it('should handle state for when there are no results', () => {
        const city = 'chicago';
        vm.handleNoResults(city);
        expect(vm.noResults).toBe(true);
        expect(vm.currentCity).toBe(city);
        expect(vm.categories.length).toBe(0);
      });
    });
  });

  describe('Render', () => {
    beforeEach(() => {
      Constructor = Vue.extend(App);
      vm = new Constructor().$mount();
    });

    it('should only show ViewStats if there are results from the api', () => {
      vm.noResults = false;
      vm.categories = apiData;

      return vm.$nextTick(() => {
        expect(!!vm.$el.querySelector('.infograph')).toBe(true);
      });
    });

    it('should show an error message if there are no results', () => {
      vm.noResults = true;
      return vm.$nextTick(() => {
        expect(!!vm.$el.querySelector('.msg-error')).toBe(true);
      });
    });
  });
});
