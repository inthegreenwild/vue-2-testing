<template>
  <div class="stat-group">
    <span class="stat-label" v-html="data.name"></span>
    <span class="stat-bar" :style="starBarStyle"></span>
    <span class="stat-value" v-html="statValue"></span>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        required: true,
        default: () => {},
      },
    },
    computed: {
      starBarStyle() {
        return {
          width: `${this.scorePercentage}px`,
          background: this.statBarColor,
        };
      },
      statValue() {
        return parseInt(this.data.score_out_of_10, 10);
      },
      statBarColor() {
        if (this.scorePercentage < 40) {
          return 'tomato';
        }
        if (this.scorePercentage < 70) {
          return 'orange';
        }
        return 'MediumAquaMarine';
      },
      scorePercentage() {
        return (this.data.score_out_of_10 / 10) * 100;
      },
    },
  };
</script>

<style>
  .stat-group {
    margin: 0 auto;
    height: 25px;
    width: 320px;
  }
  .stat-bar {
    margin-top: 10px;
    height: 5px;
    float: left;
  }
  .stat-label {
    width: 180px;
    margin-right: 5px;
    text-align: left;
    float: left;
  }
  .stat-value {
    float: right;
  }
</style>