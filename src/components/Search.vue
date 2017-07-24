<template>
  <div class="search-group">
    <input type="text" placeholder="city" @keyup.enter="getDataForCity(searchTerm)" v-model.trim="searchTerm">
    <input type="button" value="search"  @click="getDataForCity(searchTerm)">
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        searchTerm: '',
      };
    },
    methods: {
      /* Make an API call to teleport to get our quality of life statistics and
      return the data up to our top-level component App.vue */
      getDataForCity(city) {
        const query = this.buildQuery(city);
        return axios.get(query)
          .then((response) => {
            this.$emit('update-stats', { city, data: response.data });
          })
          .catch(() => {
            this.$emit('no-results', this.searchTerm);
          });
      },

      /* Ensure a proper slug for our GET request */
      buildQuery(city) {
        const validSlug = city.split(' ').join('-').toLowerCase();
        return `https://api.teleport.org/api/urban_areas/slug:${validSlug}/scores/`;
      },
    },

    mounted(){
      console.log("MOUNTED")
    }
  };
</script>

<style>
  .search-group {
    display: block;
    margin: 10px;
  }
</style>
