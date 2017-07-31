<template>
  <div class="search-group">
    <input type="text" placeholder="city" @keyup.enter="getDataForCity(searchTerm)" v-model.trim="searchTerm">
    <input type="button" value="search"  @click="getDataForCity(searchTerm)">
  </div>
</template>

<script>
  import axios from 'axios';
  import endpoints from '@/mixins/endpoints';

  export default {
    mixins: [
      endpoints,
    ],
    data() {
      return {
        searchTerm: '',
      };
    },
    methods: {
      getDataForCity(city) {
        const query = this.buildTeleportURL(city);

        return axios.get(query)
          .then((response) => {
            this.$emit('update-stats', { city, data: response.data });
          })
          .catch(() => {
            this.$emit('no-results', this.searchTerm);
          });
      },
    },
  };
</script>

<style>
  .search-group {
    display: block;
    margin: 10px;
  }
</style>
