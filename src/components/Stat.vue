<template>
  <div class="category-group">
    <span class="category-label" v-html="category.name"></span>
    <span class="category-bar" :style="categoryBarStyle"></span>
    <span class="category-value" v-html="categoryValue"></span>
  </div>
</template>

<script>
  export default {
    props: {
      category: {
        type: Object,
        required: true,
      },
    },
    computed: {
      categoryBarStyle() {
        return {
          width: `${this.scorePercentage}px`,
          background: this.categoryBarColor,
        };
      },
      categoryValue() {
        return parseInt(this.category.score_out_of_10, 10);
      },
      categoryBarColor() {
        if (this.scorePercentage < 40) {
          return 'tomato';
        }
        if (this.scorePercentage < 70) {
          return 'orange';
        }
        return 'MediumAquaMarine';
      },
      scorePercentage() {
        return (this.category.score_out_of_10 / 10) * 100;
      },
    },
  };
</script>

<style>
  .category-group {
    margin: 0 auto;
    height: 25px;
    width: 320px;
  }
  .category-bar {
    margin-top: 10px;
    height: 5px;
    float: left;
  }
  .category-label {
    width: 180px;
    margin-right: 5px;
    text-align: left;
    float: left;
  }
  .category-value {
    float: right;
  }
</style>