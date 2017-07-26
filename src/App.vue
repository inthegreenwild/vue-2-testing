<template>
  <div id="app">
    <h2> Find Quality Of Life Statistics By City </h2>
    <search @update-stats="updateStats" @no-results="handleNoResults"></search>
    <stat-view :city="currentCity" :scores="categories" v-if="!noResults"></stat-view>
    <p class="msg-error" v-show="noResults"> no results found for "{{currentCity}}" </p>
  </div>
</template>

<script>
import Search from './components/Search';
import StatView from './components/StatView';

export default {
  components: {
    Search,
    StatView,
  },
  methods: {
    updateStats({ city, data } = {}) {
      this.currentCity = city;
      this.categories = data.categories;
      this.noResults = false;
    },
    handleNoResults(city) {
      this.noResults = true;
      this.currentCity = city;
      this.categories.length = 0;
    },
  },
  data() {
    return {
      categories: [],
      currentCity: '',
      noResults: true,
    };
  },
  computed: {
    showStatView() {
      return !!(this.categories && this.categories.length && this.currentCity.length);
    },
  },
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .msg-error {
    color: firebrick;
    font-weight: bold;
  }
</style>