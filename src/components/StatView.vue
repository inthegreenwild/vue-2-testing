<template>
  <div class="infograph">
    <h2 v-html="city"> </h2>
    <div class="order-group">
      <input type="radio" id="asc" value="asc" v-model="order">
      <label for="asc">Ascending</label>
      <input type="radio" id="desc" value="desc" v-model="order">
      <label for="desc">Descending</label>
    </div>
      <stat v-for="category in orderedCategories" :key="category.name" :category="category"></stat>
  </div>
</template>

<script>
  import Stat from './Stat';

  export default {
    components: {
      Stat,
    },
    props: {
      categories: {
        type: Array,
        required: true,
      },
      city: {
        type: String,
        required: false,
        default: '',
      },
    },
    data() {
      return {
        order: 'asc',
      };
    },
    computed: {
      orderedCategories() {
        if (this.order === 'asc') {
          return this.categories.sort((a, b) => a.score_out_of_10 - b.score_out_of_10);
        }
        return this.categories.sort((a, b) => b.score_out_of_10 - a.score_out_of_10);
      },
    },
  };
</script>

<style>
  h2 {
    margin: 0;
  }
  .order-group {
    margin: 15px auto;
  }
  .infograph {
    width: 500px;
    margin: 0 auto;
  }
</style>