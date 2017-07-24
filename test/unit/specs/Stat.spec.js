import Vue from 'vue';
import Search from '@/components/Stat';

describe('Stat.vue', () => {
  let Constructor;
  let vm;

  afterEach(() => {
    vm.$destroy();
  });

  describe('Computed properties', () => {
    describe('scorePercentage', () => {
      beforeEach(() => {
        Constructor = Vue.extend(Search);
        vm = new Constructor({
          propsData: {
            data: {
              score_out_of_10: 5,
            },
          },
        }).$mount();
      });

      it('should return a percentage based on the score', () => {
        expect(vm.scorePercentage).toBe(50);
      });
    });

    describe('starBarColor', () => {
      beforeEach(() => {
        Constructor = Vue.extend(Search);
      });

      it('should return a percentage based on the score', () => {
        /* possible colors */
        const colors = ['tomato', 'orange', 'MediumAquaMarine'];
        /* values per color criteria */
        const numbers = [3, 6, 9];

        colors.forEach((color, idx) => {
          /* for each color in the array, instantiate the vm with the associated
            highest matching value */
          vm = new Constructor({
            propsData: {
              data: {
                score_out_of_10: numbers[idx],
              },
            },
          }).$mount();
          /* jasmine will run three expectations, one for each possible outcome */
          expect(vm.statBarColor).toBe(color);
        });
      });
    });

    describe('starBarStyle', () => {
      beforeEach(() => {
        Constructor = Vue.extend(Search);
        vm = new Constructor({
          propsData: {
            data: {
              score_out_of_10: 5,
            },
          },
        }).$mount();
      });

      it('should return a width in px based on scorePercentage', () => {
        const expectation = {
          width: '50px',
          background: 'orange',
        };

        expect(vm.starBarStyle).toEqual(expectation);
      });
    });

    describe('statValue', () => {
      beforeEach(() => {
        Constructor = Vue.extend(Search);
        vm = new Constructor({
          propsData: {
            data: {
              score_out_of_10: 5,
            },
          },
        }).$mount();
      });

      it('should return an integer for the current score', () => {
        expect(vm.statValue).toBe(5);
      });
    });
  });
});
