import Vue from 'vue';
import StatView from '@/components/StatView';
import { apiData, apiLowest, apiHighest, apiCity } from '../fixtures/api-data.fixture';

describe('Stat.vue', () => {
  let Constructor;
  let vm;

  afterEach(() => {
    vm.$destroy();
  });

  describe('Computed properties', () => {
    describe('orderedCategories', () => {
      beforeEach(() => {
        Constructor = Vue.extend(StatView);
        vm = new Constructor({
          propsData: {
            categories: apiData.categories,
            city: apiCity,
          },
        }).$mount();
      });

      it('should return the data in ascending order', () => {
        vm.order = 'asc';
        const asc = vm.orderedCategories;
        expect(asc[0].name).toEqual(apiLowest);
      });

      it('should return the data in descending order', () => {
        vm.order = 'desc';
        const desc = vm.orderedCategories;
        expect(desc[0].name).toEqual(apiHighest);
      });
    });
  });
});
