<template>
  <div id="app">
    <h2> Find Quality Of Life Statistics By City </h2>
    <search @update-stats="updateStats" @no-results="handleNoResults"></search>
  </div>
</template>

<script>
import Search from '@/components/Search';

export default {
  components: {
    Search,
  },
  methods: {
    updateStats({ city, data } = {}) {
      this.currentCity = city;
      this.categories = data.categories;
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
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
